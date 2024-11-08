import config from '@/config/pebblely';
import axios from 'axios';

function extractKeywords(description) {
  const keywords = description.toLowerCase().split(" ");
  return keywords;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function fetchModelImages(base64ProductImage, base64SelectedImage, xVal, yVal, xScale, yScale, jewelleryType, description) {

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

  return new Promise(async (resolve, reject) => {
    try {

      const apiKey = await config.apiKey();

      const response = await axios.post(`${config.apiUrl}/create-background/v2/`, {
        images: [base64ProductImage],
        style_image: base64SelectedImage,
        description: basePrompt,
        transforms: [
          {
            x: xVal,
            y: yVal,
            scale_x: xScale,
            scale_Y: yScale
          }
        ]
      },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Pebblely-Access-Token": apiKey
          }
        });

      if (response.status === 200) {
        const imageB64 = response.data.data; // Access the Base64 image from response.data.data
        const dataURL = `data:image/png;base64,${imageB64}`;

        resolve([dataURL]);
      } else {
        console.error('Pebblely API Error:', response.status, response.data);
        reject(new Error('Pebblely API Error'));
      }
    } catch (error) {
      console.error('Error fetching model images:', error);
      reject(error);
    }
  });
}
