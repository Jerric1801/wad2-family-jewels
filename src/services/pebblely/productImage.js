import config from '@/config/pebblely';
import axios from 'axios';

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

async function urlToBlob(url) {
  const response = await fetch(url);
  return await response.blob();
}

export async function fetchModelImages(productImg, count = 5) {
  return new Promise(async (resolve, reject) => {
    let blob;

    console.log("productImg:", productImg); // Log the productImg object

    if (productImg instanceof Blob || productImg instanceof File) {
      blob = productImg;
    } else if (typeof productImg === 'object' && productImg.src) { // Assuming <img> element
      const imgSrc = productImg.src;
      if (imgSrc.startsWith('data:image')) {
        blob = dataURLtoBlob(imgSrc);
      } else {
        blob = await urlToBlob(imgSrc);
      }
    } else if (typeof productImg === 'object' && productImg.imageData instanceof Uint8Array) {
      blob = new Blob([productImg.imageData], { type: 'image/png' }); // Or the correct image type
    } else if (typeof productImg === 'object' && typeof productImg.data === 'string' && productImg.data.startsWith('data:image')) { // Check for Base64 string in data property
      blob = dataURLtoBlob(productImg.data);
    } else {
      // Handle other cases or throw an error if the type is unsupported
      return reject(new Error('Unsupported productImg type'));
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result.split(',')[1];

        const response = await axios.post(`${config.apiUrl}/create-background/v2/`, {
          images: [base64Image],
          theme: "Surprise me",
          count: count,
          "X-Pebblely-Access-Token": config.accessToken
        });

        if (response.status === 200) {
          resolve(response.data.images);
        } else {
          console.error('Pebblely API Error:', response.status, response.data);
          reject(new Error('Pebblely API Error'));
        }
      } catch (error) {
        console.error('Error fetching model images:', error);
        reject(error);
      }
    };
    reader.readAsDataURL(blob);
  });
}