const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();

function extractKeywords(description) {
    const keywords = description.toLowerCase().split(" ");
    return keywords;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.fetchModelImage
    = functions.https.onRequest(async (req, res) => {

        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.set('Access-Control-Allow-Headers',
            'Content-Type, Authorization');
        res.set('Access-Control-Max-Age', '3600');

        if (req.method === 'OPTIONS') {
            res.status(204).send('');
            return;
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            console.error('Request body is missing or empty');
            return res.status(400).json({ error: 'Missing request body' });
        }

        try {
            const {
                base64ProductImage,
                base64SelectedImage,
                xVal,
                yVal,
                xScale,
                yScale,
                jewelleryType,
                description
            } = req.body;


            let basePrompt = "";

            switch (jewelleryType) {
                case "necklace":
                    basePrompt = "A female model with [skin tone] skin wearing a beautiful [metal type] necklace with [gemstone type], zoomed in on the neck and collarbone area.";
                    break;
                case "earrings":
                    basePrompt = "Close-up photo of a female model with [skin tone] skin wearing elegant [metal type] earrings with [gemstone type], focused on the ears and face.";
                    break;
                case "bracelets":
                    basePrompt = "A female model with [skin tone] skin showcasing a stylish [metal type] bracelet with [gemstone type], zoomed in on the wrist and hand.";
                    break;
                case "rings":
                    basePrompt = "Close-up of a female model's hand with [skin tone] skin wearing a stunning [metal type] ring with [gemstone type], focused on the fingers.";
                    break;
            }

            if (description) {
                const keywords = extractKeywords(description);

                // Metal type
                if (keywords.some(keyword => ["gold", "silver", "platinum", "rose gold"].includes(keyword))) {
                    const metal = keywords.find(keyword => ["gold", "silver", "platinum", "rose gold"].includes(keyword));
                    basePrompt = basePrompt.replace("[metal type]", metal);
                }

                // Gemstone type
                if (keywords.some(keyword => ["diamond", "emerald", "ruby", "sapphire", "pearl"].includes(keyword))) {
                    const gemstone = keywords.find(keyword => ["diamond", "emerald", "ruby", "sapphire", "pearl"].includes(keyword));
                    basePrompt = basePrompt.replace("[gemstone type]", gemstone);
                }

                // Skin tone
                if (keywords.some(keyword => ["light", "fair", "medium", "tan", "dark", "deep"].includes(keyword))) {
                    const skinTone = keywords.find(keyword => ["light", "fair", "medium", "tan", "dark", "deep"].includes(keyword));
                    basePrompt = basePrompt.replace("[skin tone]", skinTone);
                }

                // Additional details (e.g., style, size, occasion)
                const additionalDetails = description.toLowerCase().replace(/(gold|silver|platinum|rose gold|diamond|emerald|ruby|sapphire|pearl|light|fair|medium|tan|dark|deep)/g, "").trim();
                if (additionalDetails) {
                    basePrompt += ". " + capitalizeFirstLetter(additionalDetails);
                }
            }
            // Get API key from Firestore (replace with your actual logic)
            const apiKeysDoc = await db.doc('config/apiKeys').get();
            if (!apiKeysDoc.exists) {
                throw new Error('API keys not found in Firestore.');
            }
            const apiKeys = apiKeysDoc.data().keys || []; // Array of API keys
            if (apiKeys.length === 0) {
                throw new Error('API keys list is empty.');
            }
            
            const indexDoc = await db.doc('config/apiKeyIndex').get();
            let currentIndex = indexDoc.exists ? indexDoc.data().currentIndex || 0 : 0;

            const apiKey = apiKeys[currentIndex]; // Get current API key

            // Update index for next request (round-robin)
            await db.doc('config/apiKeyIndex').set({
                currentIndex: (currentIndex + 1) % apiKeys.length
            });

            const response = await axios.post('https://api.pebblely.com/create-background/v2/', {
                images: [base64ProductImage],
                style_image: base64SelectedImage,
                description: basePrompt, // Use the generated prompt here
                transforms: [{
                    x: xVal,
                    y: yVal,
                    scale_x: xScale,
                    scale_Y: yScale
                }]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Pebblely-Access-Token": apiKey
                }
            });

            res.status(200).json({
                imageB64: response.data.data
            });

        } catch (error) {
            console.error('Error fetching model image:', error);
            res.status(500).json({
                error: 'Error fetching model image'
            });
        }
    });
