import React, { useState } from "react";
import { Steps, Button, message, Result } from "antd";
import PipelineSelector from "./PipelineSelector/PipelineSelector";
import SelectImage from "./SelectImage/SelectImage";
import { SmileOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Step } = Steps;

const NewDiag = () => {
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const router = useRouter();
  const steps = [
    {
      title: "Select pipeline",
      content: (
        <PipelineSelector
          selectedPipeline={selectedPipeline}
          setSelectedPipeline={setSelectedPipeline}
        />
      ),
    },
    {
      title: "Select image",
      content: (
        <SelectImage
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
          icon={<SmileOutlined />}
          title="The selected image(s) will be processed"
          extra={
            <Button type="primary" onClick={router.push.bind(this, "history")}>
              Redirect to history
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
          //   textAlign: "center",
          //   paddingTop: "80px",
          padding: "12px",
        }}
      >
        {steps[current].content}
      </div>
      <div style={{ marginTop: "24px" }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {/* {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )} */}
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
