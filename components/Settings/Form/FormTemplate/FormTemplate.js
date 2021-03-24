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
      includeFile: true,
      requestType: "POST",
      requestURL: "/api/project/",
    },

    "edit-project": {
      pageTitle: "Create new project",
      formConfig: [
        {
          config: {
            name: "name",
            label: "Name",
            rules: [{ required: true }],
            initialValue: project.name,
          },
          form: <Input />,
        },
        {
          config: {
            name: "description",
            label: "Description",
            rules: [{ required: true }],
            initialValue: project.description,
          },
          form: <Input />,
        },
        {
          config: {
            name: "task",
            label: "Task",
            rules: [{ required: true }],
            initialValue: project.task,
          },
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
            initialValue: project.predclasses,
          },
          form: <EditableTagGroup />,
        },
      ],
      includeFile: true,
      requestType: "PUT",
      // TODO change this later
      requestURL: "/api/project/asdasd",
    },

    "create-pipeline": {
      //TODO fix this
      pageTitle: `Create new pipeline for project ${project.name}`,
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
      requestURL: "/api/project/{name}",
    },

    "edit-pipeline": {
      //TODO fix this
      pageTitle: `Edit pipeline for project ${project.name}`,
      formConfig: [
        {
          config: {
            name: "pipeline",
            label: "Pipeline",
            rules: [{ required: true }],
            getValueFromEvent: (e) => {
              // const formData = form.getFieldsValue();
              // Don't use === because e is string but p.id is int
              const pipeline = pipelines.find((p) => p.id == e);
              // for (let key in formData) {
              //   if (formData[key]) continue;
              //   formData[key] = pipeline[key];
              // }
              // form.setFieldsValue(formData);
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
      requestURL: "/api/project/{name}",
    },
  };
};

export default getFormTemplate;
