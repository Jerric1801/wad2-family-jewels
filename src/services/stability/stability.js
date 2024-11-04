import axios from 'axios';

const apiHost = 'https://api.stability.ai';
const engineId = 'stable-diffusion-v1-6';
const apiKey = import.meta.env.VITE_STABILITY_API_KEY; // Get API key from environment variables
console.log(apiKey)
export async function generateModelImage(jewelryType) {
    try {
        // Construct the prompt based on jewelry type
        let prompt = `A close-up photo of a model`;

        switch (jewelryType) {
            case 'necklace':
                prompt += ` with a focus on their neck and chest area, with smooth skin and good lighting.`;
                break;
            case 'earrings':
                prompt += ` with a focus on their ear, with smooth skin and good lighting.`;
                break;
            case 'rings':
                prompt += ` with a focus on their hand, with smooth skin and good lighting.`;
                break;
            case 'bracelets':
                prompt += ` with a focus on their wrist, with smooth skin and good lighting.`;
                break;
            default:
                prompt += '.';
        }

        const response = await axios.post(
            `${apiHost}/v1/generation/${engineId}/text-to-image`, // Changed to text-to-image
            {
                "text_prompts": [
                    {
                        "text": prompt // Use the constructed prompt
                    }
                ],
                "cfg_scale": 7, // Adjust as needed
                "height": 512, // Adjust as needed
                "width": 512, // Adjust as needed
                "samples": 1,
                "steps": 30, // Adjust as needed
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        if (response.status === 200) {
            const imageB64 = response.data.artifacts[0].base64;
            const dataURL = `data:image/jpeg;base64,${imageB64}`;
            return dataURL;
        } else {
            console.error('Stability API error:', response.status, response.data);
            throw new Error('Stability API error');
        }
    } catch (error) {
        console.error('Error generating model image:', error);
        throw error;
    }
}