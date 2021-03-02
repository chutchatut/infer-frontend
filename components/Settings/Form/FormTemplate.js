import { PropertySafetyFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import EditableTagGroup from "./EditableTagGroup/EditableTagGroup";
import TaskSelect from "./TaskSelect/TaskSelect";

export default {
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
};
