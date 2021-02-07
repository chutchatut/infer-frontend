import React, { useEffect, useState } from "react";
import { Steps, Button, message, Result } from "antd";
import PipelineSelector from "./PipelineSelector/PipelineSelector";
import SelectImage from "./SelectImage/SelectImage";
import { CheckOutlined, SmileOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

const { Step } = Steps;

const NewDiag = () => {
  const [selectedPipeline, setSPipeline] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const setSelectedPipeline = (pipelines) => {
    setSPipeline(pipelines);
    setSelectedImages([]);
  };

  const router = useRouter();

  const project = useSelector((state) => state.project.currentProject);

  const [pipelines, setPipelines] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(async () => {
    if (project)
      setPipelines(
        (await axios.get(`/api/project/${project.id}/list_pipeline/`)).data
          .result
      );
  }, [project]);

  useEffect(async () => {
    if (project && selectedPipeline)
      setImages(
        (
          await axios.get(
            `/api/project/${project.id}/list_uninfer_image/?pipeline=${selectedPipeline.id}`,
            {
              pipeline: selectedPipeline.id,
            }
          )
        ).data.result
      );
  }, [project, selectedPipeline]);

  const confirmInfer = () => {
    setLoading(true);
    axios.post(`/api/project/${project.id}/infer_image/`, {
      image_ids: selectedImages,
      pipeline: selectedPipeline.id,
    });
    setLoading(false);
    router.push("/history");
  };

  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "Select pipeline",
      content: (
        <PipelineSelector
          pipelines={pipelines}
          selectedPipeline={selectedPipeline}
          setSelectedPipeline={setSelectedPipeline}
        />
      ),
    },
    {
      title: "Select image",
      content: (
        <SelectImage
          images={images}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          selectedPipeline={selectedPipeline}
        />
      ),
    },
    {
      title: "Done",
      content: (
        <Result
          icon={<CheckOutlined />}
          title="The selected images will be add to inference queue"
          extra={
            <Button
              type="primary"
              onClick={confirmInfer.bind(this)}
              loading={loading}
            >
              Confirm and redirect
            </Button>
          }
        />
      ),
    },
  ];
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div
        style={{
          marginTop: "16px",
          border: "1px dashed #e9e9e9",
          borderRadius: "2px",
          backgroundColor: "#fafafa",
          minHeight: "200px",
          padding: "12px",
        }}
      >
        {steps[current].content}
      </div>
      <div style={{ marginTop: "24px" }}>
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            disabled={
              !(current === 0 && selectedPipeline !== null) &&
              !(current === 1 && selectedImages.length !== 0)
            }
          >
            Next
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default NewDiag;
