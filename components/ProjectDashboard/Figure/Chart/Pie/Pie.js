import React from "react";
import { Pie as AntPie } from "@ant-design/charts";

const Pie = (props) => {
  return (
    <AntPie
      label={{
        type: "inner",
        offset: "-50%",
        style: { textAlign: "center" },
        autoRotate: false,
        content: "{value}",
      }}
      data={props.data}
      radius={1}
      innerRadius={0.64}
      colorField="label"
      angleField="value"
      statistic={{
        title: false,
        content: {
          formatter: () => "",
        },
      }}
      {...props.config}
    />
  );
};

// const Pie = (props) => {
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
//       type: "doughnut",
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
//         maintainAspectRatio: false,
//       },
//     });
//   }, [colors]);

//   return (
//     <div className={styles.Layout} style={{ height: "300px", width: "300px" }}>
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };

export default Pie;
