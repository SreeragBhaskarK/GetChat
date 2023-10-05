import React, { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropProps {
    src: string;
    onCropComplete: (croppedImage: Blob) => void;
    onBack: () => void;
}

const ImageCropPage: React.FC<ImageCropProps> = ({ src, onCropComplete, onBack }) => {
    const [crop, setCrop] = useState<Crop>({
        unit: 'px',
        width: 200,
        height: 200,
        x: 100,
        y: 100,
    });

    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [completedCrop, setCompletedCrop] = useState<Crop | null>({unit: 'px',
    width: 200,
    height: 200,
    x: 100,
    y: 100,});
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [cropedFile, setCropedFile] = useState<Blob>()

    const onImageLoad = (e: any) => {
        setImageRef(e);
    };

    const getCroppedImg = async () => {
    
        
        if (imageRef && completedCrop) {
            const scaleX = imageRef.naturalWidth / imageRef.width;
            const scaleY = imageRef.naturalHeight / imageRef.height;
            const canvas = document.createElement('canvas');
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
                            setCropedFile(blob)
                           
                            const croppedImageUrl = URL.createObjectURL(blob);
                            setCroppedImageUrl(croppedImageUrl);
                        }
                    },
                    'image/jpeg',
                    1
                );
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl mb-4">Step 2: Crop Image</h2>
            <div className="mb-4">
                {src && (
                    <ReactCrop

                        crop={crop}
                        aspect={1}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={(crop) => setCompletedCrop(crop)}
                    >
                        <img src={src} onLoad={(e) => onImageLoad(e.target)} alt="Original" />
                    </ReactCrop>
                )}
            </div>
            <div className="mb-4">
                {croppedImageUrl && (
                    <div>
                        <h3 className="text-lg mb-2">Cropped Image Preview</h3>
                        <img src={croppedImageUrl} ref={imgRef} alt="Cropped" className="max-w-full" />
                    </div>
                )}
            </div>
            <div className="flex justify-between">
                <button onClick={onBack} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Back
                </button>
                <button onClick={getCroppedImg} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Crop
                </button>
                {cropedFile && <button onClick={()=>onCropComplete(cropedFile)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Next
                </button>  
                }
            </div>
        </div>
    );
};

export default ImageCropPage;
