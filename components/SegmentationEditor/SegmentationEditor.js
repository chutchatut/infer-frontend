import React, { Fragment, useEffect, useState } from "react";
import { get_color } from "../../assets/color";
import Canvas from "./Canvas/Canvas";
import { Card, Space, Typography, Popconfirm, Form, Modal } from "antd";
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
import { v4 as uuidv4 } from "uuid";
import MaskDashboard from "./MaskDashboard/MaskDashboard";

// import styles from "./canvas.module.css";

// TODO use labelme as resource

const { Paragraph } = Typography;

const SegmentationEditor = (props) => {
  const [polys, setPolys] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [lastSelectedPoint, setLastSelectedPoint] = useState(null);
  const randomColorGenerator = get_color();

  const addPoint = (x, y) => {
    // return if polys is empty, selectedIndex is null,
    // or selected poly is not visible
    if (
      !polys.length ||
      typeof selectedIndex !== "number" ||
      !polys[selectedIndex].visibility
    )
      return;
    const newPolys = [...polys];
    newPolys[selectedIndex].points = [
      ...newPolys[selectedIndex].points.slice(0, lastSelectedPoint + 1),
      [x, y, uuidv4()],
      ...newPolys[selectedIndex].points.slice(lastSelectedPoint + 1),
    ];
    setPolys(newPolys);
    if (typeof lastSelectedPoint === "number") {
      setLastSelectedPoint(lastSelectedPoint + 1);
    } else {
      setLastSelectedPoint(0);
    }
  };

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    addPoint(offsetX, offsetY);
  };

  const addPolygon = () => {
    // If last polys is empty, skip
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
    setLastSelectedPoint(null);
    setPolys(newPolys);
  };

  const select = (i) => {
    const newPolys = [...polys];
    if (typeof selectedIndex === "number") {
      newPolys[selectedIndex] = { ...newPolys[selectedIndex], selected: false };
    }
    newPolys[i] = { ...newPolys[i], selected: true };
    setPolys(newPolys);
    setLastSelectedPoint(newPolys.points && newPolys[i].points.length - 1);
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

  const [maskOnModal, setMaskOnModal] = useState(null);
  const [form] = Form.useForm();
  const formSubmit = (i, formData) => {
    console.log(i, formData);
    const newPolys = [...polys];
    newPolys[i] = {
      ...newPolys[i],
      label: formData.label,
      color: formData.color,
    };
    setPolys(newPolys);
  };

  return (
    <Space align="start">
      <div style={{ position: "relative" }}>
        <DraggablePoints
          polys={polys}
          setPolys={setPolys}
          lastSelectedPoint={lastSelectedPoint}
          setLastSelectedPoint={setLastSelectedPoint}
        />
        <Canvas
          config={{
            onMouseDown: onMouseDown,
          }}
          polys={polys}
          background="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Normal_posteroanterior_(PA)_chest_radiograph_(X-ray).jpg/1200px-Normal_posteroanterior_(PA)_chest_radiograph_(X-ray).jpg"
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
              <>
                <Modal
                  visible={maskOnModal !== null}
                  onCancel={setMaskOnModal.bind(this, null)}
                  onOk={() => {
                    formSubmit(i, form.getFieldsValue(true));
                    setMaskOnModal(null);
                  }}
                  okText="Update"
                  width="650px"
                  key={maskOnModal}
                >
                  <div
                    style={{
                      width: "600px",
                      height: "400px",
                      overflow: "auto",
                    }}
                  >
                    <MaskDashboard
                      form={form}
                      setMaskOnModal={setMaskOnModal}
                      maskOnModal={maskOnModal}
                      polys={polys}
                      setPolys={setPolys}
                    />
                  </div>
                </Modal>
                <EditOutlined onClick={setMaskOnModal.bind(this, i)} />
              </>,
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
