import React, { useState, useEffect } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
interface CustomCrop {
  unit?: string;
  width?: number;
  height?: number;
  aspect?: number;
  x?: number;
  y?: number;
}
interface ImageCropProps {
  imageFile: File;
  crop: CustomCrop ;
  setCrop: React.Dispatch<React.SetStateAction<CustomCrop>>;
}

export const ImageCrop: React.FC<ImageCropProps> = ({ imageFile, crop, setCrop }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageLoaded = (img: HTMLImageElement) => {
    const cropAspect = 4 / 3; // You can set your desired aspect ratio here
    const imageAspect = img.width / img.height;
    const aspect = cropAspect / imageAspect;

    setCrop((prevCrop) => ({ ...prevCrop, aspect })); // Use functional update for object properties
  };

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = (croppedArea: Crop, croppedAreaPixels: Crop) => {
    // You can save the croppedAreaPixels for sending to the server if needed
  };

  const handleFileRead = (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result;
    setImage(content);
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  return (
    <div>
      {image && (
        <ReactCrop
          src={image.toString()}
          crop={crop as ReactCrop.Crop}
          onImageLoaded={handleImageLoaded}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default ImageCrop;
