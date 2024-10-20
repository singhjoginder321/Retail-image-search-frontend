import React from "react";
import "../style/RecommendationsComponent.css";

const RecommendationsComponent = ({ images }) => {
  return (
    <div className="recommendations-container">
      <h2>Recommended Images</h2>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={`data:image/png;base64,${image}`}
              alt={`Recommendation ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsComponent;
