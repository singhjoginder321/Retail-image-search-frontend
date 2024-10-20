import React from "react";
import "../style/SegmentedImageComponent.css";

const SegmentedImageComponent = ({ segImage }) => {
  return (
    <div className="segmented-image-container">
      <h2>Segmented Image</h2>
      <img src={`data:image/png;base64,${segImage}`} alt="Segmented" />
    </div>
  );
};

export default SegmentedImageComponent;
