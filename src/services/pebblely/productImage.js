import config from '@/config/pebblely';
import axios from 'axios';

// Helper function to convert Base64 to Blob
function base64ToBlob(base64Image) {
  const byteString = atob(base64Image.split(',')[1]);
  const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

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
