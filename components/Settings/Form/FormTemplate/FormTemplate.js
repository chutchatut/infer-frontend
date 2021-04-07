import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useSelector } from "react-redux";
import EditableTagGroup from "./EditableTagGroup/EditableTagGroup";
import SelectUser from "./SelectUser/SelectUser";
import TaskSelect from "./TaskSelect/TaskSelect";

const PIPELINE_ID_TOOLTIP =
  "Use command 'clara list pipelines' to get pipeline ID";

const OPERATOR_TOOLTIP =
  "Use command 'clara describe pipeline -p <pipeline ID>' to get operator name";

const getFormTemplate = (project, form, pipelines, users) => {
  // const projects = useSelector((state) => state.project.projects);
  // console.log(projects);
  return {
    "create-user": {
      pageTitle: "Create new user",
      formConfig: [
        {
          config: {
            name: "username",
            label: "Username",
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        {
          config: {
            name: "password",
            label: "Password",
            rules: [{ required: true }],
          },
          form: <Input type="password" />,
        },
        {
          config: {
            name: "first_name",
            label: "First name",
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        {
          config: {
            name: "last_name",
            label: "Last name",
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        {
          config: {
            name: "email",
            label: "Email",
            rules: [{ required: true }],
          },
          form: <Input type="email" />,
        },
      ],
      requestType: "POST",
      requestURL: "/api/user/",
    },

    "edit-user": {
      pageTitle: "Edit user",
      formConfig: [
        {
          config: {
            name: "user",
            label: "User",
            rules: [{ required: true }],
            getValueFromEvent: (e) => {
              // Don't use === because e is string but p.id is int
              const user = users.find((u) => u.username == e);
              form.setFieldsValue(user);
              return e;
            },
          },
          form: (
            <Select>
              {users &&
                users.map((u) => (
                  <Select.Option key={u.username}>{u.username}</Select.Option>
                ))}
            </Select>
          ),
        },
        {
          config: {
            name: "first_name",
            label: "First name",
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        {
          config: {
            name: "last_name",
            label: "Last name",
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        {
          config: {
            name: "email",
            label: "Email",
            rules: [{ required: true }],
          },
          form: <Input type="email" />,
        },
      ],
      requestType: "PUT",
      requestURL: "/api/user/{user}/update_batch/",
    },

    "change-user-password": {
      pageTitle: "Change password",
      formConfig: [
        {
          config: {
            name: "user",
            label: "User",
            rules: [{ required: true }],
          },
          form: (
            <Select>
              {users &&
                users.map((u) => (
                  <Select.Option key={u.username}>{u.username}</Select.Option>
                ))}
            </Select>
          ),
        },
        {
          config: {
            name: "password",
            label: "Password",
            rules: [{ required: true }],
          },
          form: <Input type="password" />,
        },
        {
          config: {
            name: "comfimation",
            label: "Confirmation",
            tooltip: "Please retype new password to confirm.",
            rules: [
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === getFieldValue("password")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`Please re-enter the password`)
                  );
                },
              }),
            ],
          },
          form: <Input type="password" />,
        },
      ],
      requestType: "PUT",
      requestURL: "/api/user/{user}/change_password/",
    },
    "delete-user": {
      pageTitle: <span style={{ color: "red" }}>{`Delete User`}</span>,
      formConfig: [
        {
          config: {
            name: "user",
            label: "User",
            rules: [{ required: true }],
          },
          form: (
            <Select>
              {users &&
                users.map((u) => (
                  <Select.Option key={u.username}>{u.username}</Select.Option>
                ))}
            </Select>
          ),
        },
        {
          config: {
            name: "comfimation",
            label: "Confirmation",
            tooltip:
              "Please type the username to confirm. This action cannot be undone.",
            rules: [
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === getFieldValue("user")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(`Please enter the username`));
                },
              }),
            ],
          },
          form: <Input />,
        },
      ],
      requestType: "DELETE",
      requestURL: `/api/user/{user}`,
    },

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
            initialValue:
              project && project.users && project.users.map((u) => u.username),
          },
          form: <SelectUser users={users} />,
        },
      ],
      requestType: "POST",
      requestURL: `/api/project/${project && project.id}/add_user_batch/`,
    },

    "create-pipeline": {
      pageTitle: `Create new pipeline for project ${project && project.name}`,
      formConfig: [
        {
          config: {
            name: "name",
            label: "Pipeline Name",
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        // {
        //   config: {
        //     name: "model_name",
        //     label: "Model Name",
        //     rules: [{ required: true }],
        //   },
        //   form: <Input />,
        // },
        {
          config: {
            name: "description",
            label: "Description",
            rules: [{ required: true }],
          },
          form: <TextArea />,
        },
        {
          config: {
            name: "pipeline_id",
            label: "Pipeline ID",
            tooltip: PIPELINE_ID_TOOLTIP,
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        {
          config: {
            name: "operator",
            label: "Operator",
            tooltip: OPERATOR_TOOLTIP,
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
            label: "Pipeline Name",
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        // {
        //   config: {
        //     name: "model_name",
        //     label: "Model Name",
        //     rules: [{ required: true }],
        //   },
        //   form: <Input />,
        // },
        {
          config: {
            name: "description",
            label: "Description",
            rules: [{ required: true }],
          },
          form: <TextArea />,
        },
        {
          config: {
            name: "pipeline_id",
            label: "Pipeline ID",
            tooltip: PIPELINE_ID_TOOLTIP,
            rules: [{ required: true }],
          },
          form: <Input />,
        },
        {
          config: {
            name: "operator",
            label: "Operator",
            tooltip: OPERATOR_TOOLTIP,
            rules: [{ required: true }],
          },
          form: <Input />,
        },
      ],
      requestType: "PUT",
      requestURL: "/api/pipeline/{id}/",
    },

    "delete-project": {
      pageTitle: (
        <span style={{ color: "red" }}>{`Delete project ${
          project && project.name
        }`}</span>
      ),
      formConfig: [
        {
          config: {
            name: "name",
            label: "Confirmation",
            tooltip:
              "Please type the name of the project to confirm. This action cannot be undone. This will permanently delete the any associated images, labels and pipelines.",
            rules: [
              ({ getFieldValue }) => ({
                validator(_, value) {
                  console.log(value);
                  if (value === project.name) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`Please enter the name of the project`)
                  );
                },
              }),
            ],
          },

          form: <Input />,
        },
      ],
      requestType: "DELETE",
      requestURL: `/api/project/${project && project.id}/`,
    },

    "delete-pipeline": {
      pageTitle: (
        <span style={{ color: "red" }}>{`Delete pipeline in project ${
          project && project.name
        }`}</span>
      ),
      formConfig: [
        {
          config: {
            name: "id",
            label: "Pipeline",
            rules: [{ required: true }],
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
            label: "Confirmation",
            tooltip:
              "Please type the name of the pipeline to confirm. This action cannot be undone. This will NOT delete associated pipeline in Clara deploy.",
            rules: [
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const p = pipelines.find((p) => p.name === value);
                  if (p && p.id === Number.parseInt(getFieldValue("id"))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`Please enter the name of a pipeline`)
                  );
                },
              }),
            ],
          },
          form: <Input />,
        },
      ],
      requestType: "DELETE",
      requestURL: `/api/pipeline/{id}`,
    },
  };
};

export default getFormTemplate;
