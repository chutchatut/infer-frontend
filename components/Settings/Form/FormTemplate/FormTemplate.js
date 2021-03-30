import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Select, Upload } from "antd";
import EditableTagGroup from "./EditableTagGroup/EditableTagGroup";
import TaskSelect from "./TaskSelect/TaskSelect";

const getFormTemplate = (project, form, pipelines) => {
  return {
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
      requestType: "POST",
      requestURL: "/api/project/",
    },

    "edit-project": {
      pageTitle: `Edit project ${project && project.name}`,
      formConfig: [
        {
          config: {
            name: "name",
            label: "Name",
            rules: [{ required: true }],
            initialValue: project && project.name,
          },
          form: <Input />,
        },
        {
          config: {
            name: "description",
            label: "Description",
            rules: [{ required: true }],
            initialValue: project && project.description,
          },
          form: <Input />,
        },
        {
          config: {
            name: "task",
            label: "Task",
            rules: [{ required: true }],
            initialValue: project && project.task,
          },
          form: <TaskSelect />,
        },
        {
          config: {
            name: "cover",
            label: "Cover",
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
            initialValue: project && project.predclasses,
          },
          form: <EditableTagGroup />,
        },
      ],
      requestType: "PUT",
      requestURL: `/api/project/${project && project.id}/`,
    },

    "manage-user": {
      pageTitle: `Manage user for project ${project && project.name}`,
      formConfig: [
        {
          config: {
            name: "users",
            label: "Users",
            rules: [{ required: true }],
            initialValue:
              project && project.users && project.users.map((u) => u.username),
          },
          form: <EditableTagGroup />,
        },
      ],
      requestType: "POST",
      // TODO change this later
      requestURL: `/api/project/${project && project.id}/add_user_batch/`,
    },

    "create-pipeline": {
      pageTitle: `Create new pipeline for project ${project && project.name}`,
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
          config: {
            name: "model_name",
            label: "Model Name",
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
      requestURL: `/api/project/${project && project.id}/add_pipeline/`,
    },

    "edit-pipeline": {
      pageTitle: `Edit pipeline for project ${project && project.name}`,
      formConfig: [
        {
          config: {
            name: "id",
            label: "Pipeline",
            rules: [{ required: true }],
            getValueFromEvent: (e) => {
              // Don't use === because e is string but p.id is int
              const pipeline = pipelines.find((p) => p.id == e);
              form.setFieldsValue(pipeline);
              return e;
            },
          },
          form: (
            <Select>
              {pipelines &&
                pipelines.map((pipeline) => (
                  <Select.Option key={pipeline.id}>
                    {pipeline.name}
                  </Select.Option>
                ))}
            </Select>
          ),
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
            name: "model_name",
            label: "Model Name",
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
      requestType: "PUT",
      requestURL: "/api/pipeline/{id}/",
    },
  };
};

export default getFormTemplate;
