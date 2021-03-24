import React, { Fragment, useEffect, useState } from "react";
import { get_color } from "../../assets/color";
import Canvas from "./Canvas/Canvas";
import { Card, Space, Typography, Popconfirm, Form, Modal, Button } from "antd";
import DraggablePoints from "./DraggablePoints/DraggablePoints";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import MaskDashboard from "./MaskDashboard/MaskDashboard";
import TextArea from "antd/lib/input/TextArea";

// import styles from "./canvas.module.css";

// TODO use labelme as resource

const { Paragraph } = Typography;

const SegmentationEditor = (props) => {
  return (
    <Space direction="vertical">
      <Button>Download</Button>
      <Button>Upload</Button>
    </Space>
  );
};

export default SegmentationEditor;
