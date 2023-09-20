import { useState } from "react";
import Dropzone from "react-dropzone"


export const UploadPage = ({ onFileSelect }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleDrop = (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileSelect(file);
  
        // Display a preview of the selected image
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    return (
        <div>
            <h2 className="text-xl mb-4">Step 1: Upload Image</h2>
            <Dropzone onDrop={handleDrop}  multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="border-dashed border-2 p-4 rounded text-center">
                        <input {...getInputProps()} />

                        <p>Drag & drop an image here, or click to select one</p>

                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default UploadPage