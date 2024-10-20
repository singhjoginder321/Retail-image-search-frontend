import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import "./App.css";
import CanvasComponent from "./components/CanvasComponent";
import HeaderComponent from "./components/HeaderComponent";
import ImageUploadComponent from "./components/ImageUploadComponent";
import LoaderExample from "./components/Loader"; // Import your loader component
import ModelRunComponent from "./components/ModelRunComponent";
import RecommendationsComponent from "./components/RecommendationsComponent";
import SegmentedImageComponent from "./components/SegmentedImageComponent";
import data from "./data.json";

function App() {
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState([]);
  const [labels, setLabels] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const [recommendedImages, setRecommendedImages] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state
  const bottomRef = useRef(null);

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const handlePointsChange = (newPoints, newLabels) => {
    setPoints(newPoints);
    setLabels(newLabels);
  };

  useEffect(() => {
    // Set initial state from JSON data for testing
    if (data) {
      setSegmentedImage(data.seg_img || null);
      setRecommendedImages(data.images || []);
    }
  }, []);
  const handleRunModel = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("points", JSON.stringify(points));
    formData.append("labels", JSON.stringify(labels));

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSegmentedImage(data.seg_img);
        setRecommendedImages(data.images);
      } else {
        console.error("Model run failed");
      }
    } catch (error) {
      console.error("Error running the model:", error);
    } finally {
      // Scroll to the bottom after loading state updates
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setLoading(false); // Stop loading
      }, 0);
    }
  };

  const handleUndo = () => {
    setPoints((prevPoints) => prevPoints.slice(0, -1));
    setLabels((prevLabels) => prevLabels.slice(0, -1));
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="app">
      <HeaderComponent />
      <div className="content">
        <div className="main-section">
          {!image ? (
            <ImageUploadComponent
              image={image}
              setImage={setImage}
              onImageUpload={handleImageUpload}
            />
          ) : (
            <>
              {showCanvas ? (
                <div className="canvas-container">
                  <CanvasComponent
                    image={image}
                    onPointsChange={handlePointsChange}
                    onClose={() => setShowCanvas(false)}
                    onUndo={handleUndo}
                  />
                </div>
              ) : (
                <div className="image-preview-section">
                  <div className="inside-preview-section">
                    <button
                      onClick={triggerFileInput}
                      className="upload-button1"
                    >
                      <FaUpload className="upload-icon" /> Upload Again
                    </button>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="preview-image"
                      onClick={() => setShowCanvas(true)}
                    />
                  </div>

                  <ModelRunComponent onRunModel={handleRunModel} />
                </div>
              )}

              {loading ? (
                <LoaderExample /> // Render loader while loading
              ) : (
                <>
                  {segmentedImage && (
                    <SegmentedImageComponent segImage={segmentedImage} />
                  )}

                  {recommendedImages.length > 0 && (
                    <RecommendationsComponent images={recommendedImages} />
                  )}
                </>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
