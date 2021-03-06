import React from "react";
import { Column } from "@ant-design/charts";

const Bar = (props) => {
  return (
    <Column data={props.data} xField="label" yField="value" {...props.config} />
  );
};

// const Bar = (props) => {
//   const canvasRef = useRef();
//   const [colors, setColors] = useState(null);
//   useEffect(() => {
//     if (colors) return;
//     const randomColorGenerator = get_chart_color(props.seed);
//     setColors(
//       Object.keys(props.data).map(() => randomColorGenerator.next().value)
//     );
//   }, []);

//   useEffect(() => {
//     if (!colors) return;
//     const canvas = canvasRef.current;

//     new Chart(canvas, {
//       type: "bar",
//       data: {
//         labels: Object.keys(props.data),
//         datasets: [
//           {
//             label: props.label,
//             data: Object.values(props.data),
//             backgroundColor: colors.map((color) => `rgba(${color}, 0.5)`),
//             borderColor: colors.map((color) => `rgba(${color}, 0.6)`),
//             borderWidth: 2,
//           },
//         ],
//       },
//       options: {
//         // aspectRatio: 1,
//         legend: {
//           display: false,
//         },
//         maintainAspectRatio: false,
//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 beginAtZero: true,
//               },
//             },
//           ],
//         },
//       },
//     });
//   }, [colors]);

//   return (
//     <div className={styles.Layout} style={{ height: "300px", width: "300px" }}>
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };

export default Bar;
