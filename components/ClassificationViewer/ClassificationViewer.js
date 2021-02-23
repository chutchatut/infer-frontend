import {
  Button,
  Select,
  Space,
  Image,
  Skeleton,
  message,
  Row,
  Col,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Fragment, useEffect, useState } from "react";
import MyTable from "../MyTable/MyTable";
import styles from "./ClassificationViewer.module.css";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import Viewer from "./Viewer/Viewer";
import Editor from "./Editor/Editor";

const ClassificationViewer = (props) => {
  const img = props.data && props.data.image;
  const results = props.data && props.data.result;

  // defaultLogits is a dict used to generate new logits
  const [defaultLogits, setDefaultLogits] = useState({});
  const [logits, setLogits] = useState([]);
  const [gradcam, setGradcam] = useState(img.data16);

  useEffect(() => {
    if (!img) return;
    const newDefaultLogits = {};
    for (let pred of img.project_predclasses) {
      newDefaultLogits[pred] = {
        key: pred,
        name: pred,
        confidence: 0.0,
        selected: img.actual_class && img.actual_class.indexOf(pred) > -1,
      };
    }
    setDefaultLogits(newDefaultLogits);
    setLogits(Object.values(newDefaultLogits));
  }, [img]);

  const selectPipeline = (i) => {
    const newData = JSON.parse(results[i].predicted_class);
    const newLogits = { ...defaultLogits };
    for (let pred of Object.keys(newData)) {
      newLogits[pred] = {
        ...newLogits[pred],
        confidence: Number.parseFloat(newData[pred]),
      };
    }
    setLogits(Object.values(newLogits));
    setGradcam(results[i].gradcam);
  };

  return (
    <>
      {img ? (
        <Row
          gutter={[8, 8]}
          // align="middle"
        >
          <Col span={16}>
            <Viewer img={img} gradcam={gradcam} />
          </Col>

          <Col span={8}>
            <Editor
              results={results}
              logits={logits}
              img={img}
              edit={props.edit} // for default edit value in queryparams
              selectPipeline={selectPipeline}
            />
          </Col>
        </Row>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default ClassificationViewer;
