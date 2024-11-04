import config from '@/config/pebblely';
import axios from 'axios';

export async function fetchModelImages(base64ProductImage, base64SelectedImage, xVal, yVal, xScale, yScale, jewelleryType, description) {

  switch (jewelleryType) {
    case "necklace":
      description = "A female model wearing a beautiful necklace, zoomed in on the neck and collarbone area." + description;
      break;
    case "earrings":
      description = "Close-up photo of a female model wearing elegant earrings, focused on the ears and face." + description;
      break;
    case "bracelets":
      description = "A female model showcasing a stylish bracelet, zoomed in on the wrist and hand." + description;
      break;
    case "rings":
      description = "Close-up of a female model's hand wearing a stunning ring, focused on the fingers." + description;
      break;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${config.apiUrl}/create-background/v2/`, {
        images: [base64ProductImage],
        style_image: base64SelectedImage,
        description: description, 
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
            "X-Pebblely-Access-Token": config.apiKey
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
