import React, { useEffect, useRef, useState } from "react";
import "../style/CanvasComponent.css";

const CanvasComponent = ({ image, onPointsChange, onClose, onUndo }) => {
  const [points, setPoints] = useState([]);
  const [labels, setLabels] = useState([]);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.button === 0) {
      // Left click
      setPoints((prevPoints) => [...prevPoints, { x, y, color: "green" }]);
      setLabels((prevLabels) => [...prevLabels, 1]);
    } else if (e.button === 2) {
      // Right click
      setPoints((prevPoints) => [...prevPoints, { x, y, color: "red" }]);
      setLabels((prevLabels) => [...prevLabels, 0]);
    }
    e.preventDefault(); // Prevent context menu on right-click
  };

  useEffect(() => {
    onPointsChange(
      points.map((p) => [p.x, p.y]),
      labels
    );
  }, [points, labels]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    ctxRef.current = context;
    const drawImage = (imgSrc) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imgSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        // Redraw points after the image is drawn
        points.forEach((point) => {
          context.fillStyle = point.color;
          context.beginPath();
          context.arc(point.x, point.y, 5, 0, Math.PI * 2);
          context.fill();
        });
      };
    };

    if (image) {
      drawImage(URL.createObjectURL(image)); // Draw the uploaded image
    }
  }, [image, points]);

  const handleUndo = () => {
    if (points.length > 0) {
      // Remove the last drawn point
      setPoints((prevPoints) => prevPoints.slice(0, -1));
      setLabels((prevLabels) => prevLabels.slice(0, -1));
    }
  };

  return (
    <div className="canvas-card">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <button className="undo-button" onClick={handleUndo}>
        Undo
      </button>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onContextMenu={handleCanvasClick}
          className="image-canvas"
          style={{ border: "2px solid #fff", cursor: "crosshair" }}
        />
        {points.map((point, index) => (
          <div
            key={index}
            className="dot"
            style={{
              left: point.x,
              top: point.y,
              backgroundColor: point.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CanvasComponent;
