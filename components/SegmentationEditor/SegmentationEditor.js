import React, { Fragment, useEffect, useState } from "react";
import { get_color } from "../../assets/color";
import Canvas from "./Canvas/Canvas";
import { Card, Space, Typography, Popconfirm } from "antd";
import DraggablePoints from "./DraggablePoints/DraggablePoints";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
// import styles from "./canvas.module.css";

// TODO use labelme as resource

const { Paragraph } = Typography;

const SegmentationEditor = (props) => {
  const [polys, setPolys] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const randomColorGenerator = get_color();

  const addPoint = (x, y) => {
    if (!polys.length || typeof selectedIndex !== "number") return;
    const newPolys = [...polys];
    newPolys[selectedIndex].points = [
      ...newPolys[selectedIndex].points,
      [x, y],
    ];
    setPolys(newPolys);
  };

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    addPoint(offsetX, offsetY);
  };

  const addPolygon = () => {
    if (polys.length && polys[polys.length - 1].points.length < 1) return;
    const newPolys = [
      ...polys,
      {
        points: [],
        color: randomColorGenerator.next().value,
        selected: true,
        label: "New Class",
        visibility: true,
      },
    ];
    if (typeof selectedIndex === "number")
      newPolys[selectedIndex] = { ...newPolys[selectedIndex], selected: false };
    setSelectedIndex(newPolys.length - 1);
    setPolys(newPolys);
  };

  const select = (i) => {
    console.log(i, selectedIndex);
    const newPolys = [...polys];
    if (typeof selectedIndex === "number") {
      newPolys[selectedIndex] = { ...newPolys[selectedIndex], selected: false };
    }
    newPolys[i] = { ...newPolys[i], selected: true };
    setPolys(newPolys);
    setSelectedIndex(i);
  };

  const toggleVisibility = (i) => {
    const newPolys = [...polys];
    newPolys[i] = { ...newPolys[i], visibility: !newPolys[i].visibility };
    setPolys(newPolys);
  };

  const deletePoly = (i) => {
    if (i === selectedIndex) {
      setSelectedIndex(null);
    } else if (i < selectedIndex) {
      setSelectedIndex(selectedIndex - 1);
    }
    setPolys(polys.slice(0, i).concat(polys.slice(i + 1)));
  };

  // TODO implment logic to edit

  return (
    <Space align="start">
      <div>
        <DraggablePoints polys={polys} setPolys={setPolys} />
        <Canvas
          config={{
            onMouseDown: onMouseDown,
          }}
          polys={polys}
          background="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
        />
      </div>
      <Space
        direction="vertical"
        align="baseline"
        style={{ width: "270px", height: "600px", overflowY: "auto" }}
      >
        {polys.map((poly, i) => (
          <Card
            style={{ width: "250px" }}
            hoverable
            actions={[
              <CheckCircleOutlined
                onClick={select.bind(this, i)}
                style={poly.selected ? { color: "#1890ff" } : null}
              />,
              <EditOutlined
              // TODO implement onClick
              />,
              poly.visibility ? (
                <EyeOutlined onClick={toggleVisibility.bind(this, i)} />
              ) : (
                <EyeInvisibleOutlined
                  onClick={toggleVisibility.bind(this, i)}
                />
              ),
              <Popconfirm
                placement="top"
                title="Are you sure to delete segmentation mask?"
                onConfirm={deletePoly.bind(this, i)}
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>,
            ]}
            key={i}
          >
            <Card.Meta title={poly.label} />
          </Card>
        ))}
        <Card
          style={{ width: "250px" }}
          hoverable
          onClick={addPolygon.bind(this)}
        >
          <Space align="center">
            <PlusOutlined /> <h3>Add new polygon</h3>
          </Space>
        </Card>
      </Space>
    </Space>
  );
};

export default SegmentationEditor;
