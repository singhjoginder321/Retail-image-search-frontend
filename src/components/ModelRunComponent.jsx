import React from "react";
import "../style/ModelRunComponent.css";

const ModelRunComponent = ({ onRunModel }) => {
  return (
    <div className="model-run-container">
      <h2>Step 3: Run Model</h2>
      <button onClick={onRunModel} className="run-model-button">
        Run Model
      </button>
    </div>
  );
};

export default ModelRunComponent;
