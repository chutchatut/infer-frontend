import React, { useEffect, useRef } from "react";

const loadImg = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Focus on canvas so it can listen to keyboard event
    canvas.focus();

    // Draw background
    const background = await loadImg(props.background);

    canvas.height = background.height;
    canvas.width = background.width;
    context.drawImage(background, 0, 0);

    context.font = "30px Arial";

    // Draw poly
    context.lineCap = "round";
    context.lineWidth = 1.5;
    for (let poly of props.polys) {
      if (!poly.points.length) continue;
      // Fill poly
      context.beginPath();
      context.fillStyle = `rgba(${poly.color}, ${
        poly.selected ? "0.5" : "0.3"
      })`;
      context.moveTo(poly.points[0][0], poly.points[0][1]);
      for (let point of poly.points.slice(1)) {
        context.lineTo(point[0], point[1]);
      }
      context.fill();
      // Draw border if the polygon is selected
      if (poly.selected) {
        context.strokeStyle = `rgba(${poly.color}, 0.5)`;
        context.closePath();
        context.stroke();
        context.fillStyle = `rgb(${poly.color})`;
        context.fillText(poly.label, poly.points[0][0], poly.points[0][1]);
      }
    }

    // Draw points
    for (let poly of props.polys) {
      if (!poly.points.length) continue;
      for (let point of poly.points) {
        context.beginPath();
        // Somehow the circle isn't working
        // context.arc(point[0], point[1], 3, 0, 2 * Math.pi);
        context.fillStyle = poly.selected
          ? `rgb(${poly.color})`
          : `rgba(${poly.color}, 0.5)`;
        context.fillRect(point[0] - 5, point[1] - 5, 10, 10);
        context.stroke();
      }
    }
  }, [props.polys]);

  return <canvas ref={canvasRef} {...props.config} />;
};

export default Canvas;
