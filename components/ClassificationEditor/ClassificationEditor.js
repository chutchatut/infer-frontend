import { Skeleton, Row, Col } from "antd";
import { useEffect, useState } from "react";
import Viewer from "./Viewer/Viewer";
import Editor from "./Editor/Editor";

const ClassificationEditor = (props) => {
  const img = props.data && props.data.image;
  const results = props.data && props.data.result;

  // defaultLogits is a dict used to generate new logits
  const [defaultLogits, setDefaultLogits] = useState({});
  const [logits, setLogits] = useState([]);
  const [gradcam, setGradcam] = useState(img.data);

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
        confidence: Number.parseFloat(newData[pred]).toFixed(4),
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
          {props.task_type.indexOf("2d") !== -1 && (
            <Col lg={24} xxl={16}>
              <Viewer img={img} gradcam={gradcam} />
            </Col>
          )}

          <Col
            xxl={8}
            flex="auto"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Editor
              task_type={props.task_type}
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

export default ClassificationEditor;
