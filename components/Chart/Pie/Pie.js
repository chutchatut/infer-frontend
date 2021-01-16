import React, { useEffect, useRef, useState } from "react";
import { get_chart_color, get_color } from "../../../assets/color";
import Chart from "chart.js";
import styles from "./Pie.module.css";

const Pie = (props) => {
  const canvasRef = useRef();
  const [colors, setColors] = useState(null);
  useEffect(() => {
    if (colors) return;
    const randomColorGenerator = get_chart_color(props.seed);
    setColors(
      Object.keys(props.data).map(() => randomColorGenerator.next().value)
    );
  }, []);

  useEffect(() => {
    if (!colors) return;
    const canvas = canvasRef.current;

    new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(props.data),
        datasets: [
          {
            label: props.label,
            data: Object.values(props.data),
            backgroundColor: colors.map((color) => `rgba(${color}, 0.5)`),
            borderColor: colors.map((color) => `rgba(${color}, 0.6)`),
            borderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
      },
    });
  }, [colors]);

  return (
    <div className={styles.Layout} style={{ height: "300px", width: "300px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Pie;
