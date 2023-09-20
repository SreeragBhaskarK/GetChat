import React, { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropProps {
    src: any;
    onCropComplete: (croppedImage: Blob) => void;
    onBack: () => void;
}
const ImageCropPage = ({ src, onCropComplete, onBack }) => {

    const [crop, setCrop] = useState<any>({ aspect: 1 });
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const onImageLoad = (image: HTMLImageElement) => {
        setImageRef(image);
    };

    const getCroppedImg = async () => {
        const test = true
        console.log('clicked');
        
        if (imageRef && completedCrop||test) {

            onCropComplete('test');
            
            /* const canvas = document.createElement('canvas');
            const scaleX = imageRef.naturalWidth / imageRef.width;
            const scaleY = imageRef.naturalHeight / imageRef.height;
            canvas.width = completedCrop.width || 0;
            canvas.height = completedCrop.height || 0;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.drawImage(
                    imageRef,
                    completedCrop.x * scaleX,
                    completedCrop.y * scaleY,
                    completedCrop.width * scaleX,
                    completedCrop.height * scaleY,
                    0,
                    0,
                    completedCrop.width,
                    completedCrop.height
                );
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            onCropComplete(blob);
                            const croppedImageUrl = URL.createObjectURL(blob);
                            setCroppedImageUrl(croppedImageUrl);
                        }
                    },
                    'image/jpeg',
                    1
                );
            } */
        }
    };
    return (
        <div>
            <h2 className="text-xl mb-4">Step 2: Crop Image</h2>
            <div className="mb-4">
                {src && (
                    <ReactCrop
                      /*   src={src} */
                       /*  onImageLoaded={onImageLoad} */
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={(crop) => setCompletedCrop(crop)}
                    >  <img src={src} /></ReactCrop>
                )}
            </div>
            <div className="mb-4">
                {croppedImageUrl && (
                    <div>
                        <h3 className="text-lg mb-2">Cropped Image Preview</h3>
                        <img src={croppedImageUrl} alt="Cropped" className="max-w-full" />
                    </div>
                )}
            </div>
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
                <button
                    onClick={getCroppedImg}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ImageCropPage