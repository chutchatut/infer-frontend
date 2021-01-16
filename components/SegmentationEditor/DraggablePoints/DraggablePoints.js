import React, { Fragment } from "react";
import Draggable from "react-draggable";

const DraggablePoints = (props) => {
  return (
    <div height="600px" width="500px">
      {props.polys.map(
        (poly, i) =>
          poly.selected &&
          poly.visibility && (
            <div key={i}>
              {poly.points.map((point, j) => (
                <Draggable
                  defaultPosition={{ x: point[0] - 5, y: point[1] - 5 }}
                  onDrag={(mousemove, { deltaX, deltaY }) => {
                    const newPolys = [...props.polys];
                    newPolys[i].points = [...props.polys[i].points];
                    newPolys[i].points[j][0] += deltaX;
                    newPolys[i].points[j][1] += deltaY;
                    props.setPolys(newPolys);
                  }}
                  key={j}
                >
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: `rgba(${poly.color}, ${
                        poly.selected ? 1 : 0
                      })`,
                      width: "10px",
                      height: "10px",
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
