import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import SelectProject from "./SelectProject/SelectProject";
import EditableTagGroup from "./EditableTagGroup/EditableTagGroup";
import TaskSelect from "./TaskSelect/TaskSelect";

const getFormTemplate = (form) => ({
  "create-project": {
    pageTitle: "Create new project",
    formConfig: [
      {
        config: {
          name: "name",
          label: "Name",
          rules: [{ required: true }],
        },
        form: <Input />,
      },
      {
        config: {
          name: "description",
          label: "Description",
          rules: [{ required: true }],
        },
        form: <Input />,
      },
      {
        config: { name: "task", label: "Task", rules: [{ required: true }] },
        form: <TaskSelect />,
      },
      {
        config: {
          name: "cover",
          label: "Cover",
          rules: [{ required: true }],
          getValueFromEvent: (e) =>
            e.fileList[0] && e.fileList[0].originFileObj,
          valuePropName: "~~~", // Put here to stop error message
        },

        form: (
          <Upload accept={[".png", ".jpg"]} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        ),
      },
      {
        config: {
          name: "predclasses",
          label: "Classes",
          rules: [{ required: true }],
        },
        form: <EditableTagGroup />,
      },
    ],
    includeFile: true,
    requestType: "POST",
    requestURL: "/api/project/",
  },
  "create-pipeline": {
    pageTitle: "Edit project",
    formConfig: [
      {
        config: {
          name: "project",
          label: "Project",
          rules: [{ required: true }],
        },
        form: <SelectProject />,
      },
      {
        config: {
          name: "name",
          label: "Name",
          rules: [{ required: true }],
        },
        form: <Input />,
      },
      {
        config: {
          name: "description",
          label: "Description",
          rules: [{ required: true }],
        },
        form: <Input />,
      },
      {
        config: {
          name: "pipeline_id",
          label: "Pipeline ID",
          rules: [{ required: true }],
        },
        form: <Input />,
      },
      {
        config: {
          name: "operator",
          label: "Operator",
          rules: [{ required: true }],
        },
        form: <Input />,
      },
    ],
    requestType: "POST",
    //TODO fix this
    requestURL: "/api/project/",
  },
});

export default getFormTemplate;
