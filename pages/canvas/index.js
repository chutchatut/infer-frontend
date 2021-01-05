import React, { Fragment, useEffect, useState } from "react";
import { get_color } from "../../assets/color";
import Canvas from "../../components/Canvas/Canvas";
import Button from "../../components/Button/Button";
import styles from "./canvas.module.css";

const canvas = (props) => {
  const [polys, setPolys] = useState([]);
  const randomColorGenerator = get_color();

  const addPoint = (x, y) => {
    if (!polys.length) return;
    const newPolys = [...polys];
    newPolys[newPolys.length - 1].points = [
      ...newPolys[newPolys.length - 1].points,
      [x, y],
    ];
    console.log(newPolys);
    setPolys(newPolys);
  };

  const onMouseUp = () => {
    // console.log(`Mouse up`);
  };

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    addPoint(offsetX, offsetY);
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

  const addPolygon = () => {
    if (polys.length && !polys[polys.length - 1].points) return;
    const newPolys = [
      ...polys,
      {
        points: [],
        color: randomColorGenerator.next().value,
        selected: true,
        label: "cat",
      },
    ];
    if (newPolys.length > 1) newPolys[newPolys.length - 2].selected = false;
    setPolys(newPolys);
  };

  return (
    <Fragment>
      <div className={styles.addPoly}>
        <Button onClick={addPolygon.bind(this)}>Add polygon</Button>
      </div>
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
    </Fragment>
  );
};

export default canvas;
