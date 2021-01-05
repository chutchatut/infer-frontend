import React, { useEffect, useState } from "react";
import { get_color } from "../../../assets/color";
import Canvas from "../../../components/Canvas/Canvas";

const canvas = (props) => {
  const [polys, setPolys] = useState([]);
  const randomColorGenerator = get_color();

  const onMouseUp = () => {
    // console.log(`Mouse up`);
  };

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // console.log(`Mouse down ${offsetX} ${offsetY}`);
  };

  const onMouseMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // console.log(`Mouse move ${offsetX} ${offsetY}`);
  };

  const onDoubleClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // console.log(`Mouse doubleclick ${offsetX} ${offsetY}`);
  };

  const onKeyDown = (event) => {
    console.log(`KeyDown ${event.key}`);
  };

  // For testing !!
  useEffect(() => {
    setPolys([
      {
        points: [
          [500, 500],
          [50, 200],
          [100, 100],
          [100, 1],
        ],
        color: randomColorGenerator.next().value,
        selected: true,
        label: "dog",
      },
      {
        points: [
          [100, 500],
          [1000, 200],
          [200, 200],
        ],
        color: randomColorGenerator.next().value,
        selected: false,
        label: "cat",
      },
    ]);
  }, []);

  return (
    <Canvas
      config={{
        onMouseUp: onMouseUp,
        onMouseDown: onMouseDown,
        onMouseMove: onMouseMove,
        onKeyDown: onKeyDown,
        onDoubleClick: onDoubleClick,
        tabIndex: 0,
      }}
      polys={polys}
      background="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
    />
  );
};

export default canvas;
