import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  image: File;
}

export const imageCrop=({ image }: ImageCropperProps)=> {
  const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 16 / 9 });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleCropComplete = (croppedAreaPixels: ReactCrop.Crop) => {
    const img = new Image();
    img.src = URL.createObjectURL(image);

    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width || 0;
    canvas.height = croppedAreaPixels.height || 0;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        img,
        croppedAreaPixels.x || 0,
        croppedAreaPixels.y || 0,
        croppedAreaPixels.width || 0,
        croppedAreaPixels.height || 0,
        0,
        0,
        croppedAreaPixels.width || 0,
        croppedAreaPixels.height || 0
      );

      const croppedDataURL = canvas.toDataURL('image/jpeg');
      setCroppedImage(croppedDataURL);
    }
  };

  return (
    <div>
      <ReactCrop  crop={crop} onChange={setCrop} onComplete={handleCropComplete} />
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  );
}

export default imageCrop;
