import React, { useState } from "react";
import "../style/ImageUploadComponent.css";

const ImageUploadComponent = ({ onImageUpload, image, setImage }) => {
  //   const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onImageUpload(file);
  };

  return (
    <div className="image-upload-container">
      <h2> Please Upload an Image</h2>
      <p className="instructions">
        To begin the segmentation process, please upload an image in JPG, PNG,
        or JPEG format. After selecting and uploading the image, it will be
        previewed below, and you can proceed to select specific areas for
        further processing.
      </p>
      <div className="upload-box">
        <p className="upload-instructions">Drag and drop here</p>
        <label className="upload-label" htmlFor="file-input">
          <i className="fas fa-upload upload-icon"></i>
          Upload Here
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
        <p className="data-format">Data Format: JPG, PNG, JPEG</p>
      </div>
      {image && (
        <div className="image-preview">
          <img src={URL.createObjectURL(image)} alt="Uploaded" />
          <button
            onClick={() => onImageUpload(image)}
            className="proceed-button"
          >
            Proceed to Select
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
