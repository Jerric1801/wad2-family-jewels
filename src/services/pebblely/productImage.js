async function fetchModelImages(base64ProductImage, base64SelectedImage, xVal, yVal, xScale, yScale, jewelleryType, description) { 
  try {
    const response = await fetch('https://fetchmodelimage-f5cxjr2tqq-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        base64ProductImage, 
        base64SelectedImage,
        xVal,
        yVal,
        xScale,
        yScale,
        jewelleryType,
        description
      })
    });

    console.log(response)

    const data = await response.json();
    if (response.ok) {
      const imageB64 = data.imageB64; 
      console.log(imageB64)
      const dataURL = `data:image/png;base64,${imageB64}`;
      return dataURL
    } else {
      console.error('Error:', data.error);
    }

  } catch (error) {
    console.error('Error fetching model image:', error);
  }
}

export {fetchModelImages}