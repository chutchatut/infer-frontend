import React, { Fragment, useEffect } from "react";
import Draggable from "react-draggable";

const DraggablePoints = (props) => {
  return (
    <div height="600px" width="500px" >
      {props.polys.map(
        (poly, i) =>
          poly.selected &&
          poly.visibility && (
            <div key={i}>
              {poly.points.map((point, j) => (
                <Draggable
                  onMouseDown={props.setLastSelectedPoint.bind(this, j)}
                  defaultPosition={{ x: point[0] - 5, y: point[1] - 5 }}
                  onDrag={(mousemove, { deltaX, deltaY }) => {
                    const newPolys = [...props.polys];
                    newPolys[i].points = [...props.polys[i].points];
                    newPolys[i].points[j][0] += deltaX;
                    newPolys[i].points[j][1] += deltaY;
                    props.setPolys(newPolys);
                  }}
                  // bounds="parent"
                  key={props.polys[i].points[j][2]}
                >
                  <div
                    onDoubleClick={() => {
                      const newPolys = [...props.polys];
                      const newPoints = newPolys[i].points
                        .slice(0, j)
                        .concat(newPolys[i].points.slice(j + 1));
                      newPolys[i].points = newPoints;
                      props.setPolys(newPolys);
                      props.setLastSelectedPoint(
                        props.lastSelectedPoint > 0
                          ? props.lastSelectedPoint - 1
                          : null
                      );
                    }}
                    style={{
                      position: "absolute",
                      backgroundColor: `rgba(${poly.color}, ${
                        poly.selected ? 1 : 0
                      })`,
                      width: props.lastSelectedPoint === j ? "12px" : "10px",
                      height: props.lastSelectedPoint === j ? "12px" : "10px",
                    }}
                  />
                </Draggable>
              ))}
            </div>
          )
      )}
    </div>
  );
};

export default DraggablePoints;
