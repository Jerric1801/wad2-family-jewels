import config from '@/config/pebblely';
import axios from 'axios';

export async function fetchModelImages(base64Image, count = 5) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${config.apiUrl}/create-background/v2/`, {
        images: [base64Image],
        theme: "Surprise me",
        count: count,
      },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Pebblely-Access-Token": config.apiKey
          }
        });

        if (response.status === 200) {
          const imageB64 = response.data.data; // Access the Base64 image from response.data.data
          console.log(imageB64)
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
