import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Select, Switch, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useSelector } from "react-redux";
import EditableTagGroup from "./EditableTagGroup/EditableTagGroup";
import PipelineSelect from "./PipelineSelect/PipelineSelect";
import SelectUser from "./SelectUser/SelectUser";
import TaskSelect from "./TaskSelect/TaskSelect";

// TODO add clara pipeline name

const PIPELINE_NAME_TOOLTIP =
  "Use command 'clara list pipelines' to get pipeline name";

const PIPELINE_ID_TOOLTIP =
  "Use command 'clara list pipelines' to get pipeline ID";

const OPERATOR_TOOLTIP =
  "Use command 'clara describe pipeline -p <pipeline ID>' to get operator name. Paste the name of the last operator";

const PREDCLASS_TOOLTIP =
  "The classes should be sorted similar to the order of the model's output";

const getFormTemplate = (form, users, re_render) => {
  const projects = useSelector((state) => state.project.projects);
  const pipelines = projects ? projects.flatMap((p) => p.pipeline) : [];

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
            name: "admin",
            label: "Admin",
            initialValue: false,
            valuePropName: "checked",
          },
          form: <Switch />,
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
            name: "admin",
            label: "Admin",
            initialValue: false,
            valuePropName: "checked",
          },
          form: <Switch />,
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
      requestURL: "/api/user/{user}/",
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
          form: (
            <TaskSelect
              onChange={(e) => {
                re_render();
                return e;
              }}
            />
          ),
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
      ].concat(
        form.getFieldValue("task") === "2D Classification" ||
          form.getFieldValue("task") === "3D Classification"
          ? [
              {
                config: {
                  name: "predclasses",
                  label: "Classes",
                  tooltip: PREDCLASS_TOOLTIP,
                  rules: [{ required: true }],
                  initialValue: [],
                },
                form: <EditableTagGroup />,
              },
            ]
          : []
      ),
      requestType: "POST",
      requestURL: "/api/project/",
    },

    "edit-project": {
      pageTitle: `Edit project`,
      formConfig: [
        {
          config: {
            name: "project",
            label: "Project",
            rules: [{ required: true }],
            getValueFromEvent: (e) => {
              // Don't use === because e is string but p.id is int
              const project = projects.find((p) => p.id == e);
              delete project.cover;
              form.setFieldsValue(project);
              re_render();
              return e;
            },
          },
          form: (
            <Select>
              {projects &&
                projects.map((p) => (
                  <Select.Option key={p.id}>{p.name}</Select.Option>
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
            name: "task",
            label: "Task",
            rules: [{ required: true }],
          },
          form: (
            <TaskSelect
              onChange={(e) => {
                re_render();
                return e;
              }}
            />
          ),
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
      ].concat(
        form.getFieldValue("task") === "2D Classification" ||
          form.getFieldValue("task") === "3D Classification"
          ? [
              {
                config: {
                  name: "predclasses",
                  label: "Classes",
                  tooltip: PREDCLASS_TOOLTIP,
                  rules: [{ required: true }],
                  initialValue: [],
                },
                form: <EditableTagGroup />,
              },
            ]
          : []
      ),
      requestType: "PUT",
      requestURL: `/api/project/{project}/`,
    },

    "manage-user": {
      pageTitle: `Manage user for project`,
      formConfig: [
        {
          config: {
            name: "project",
            label: "Project",
            rules: [{ required: true }],
            getValueFromEvent: (e) => {
              // Don't use === because e is string but p.id is int
              const project = projects.find((p) => p.id == e);
              form.setFieldsValue({
                users: project.users.map((u) => u.username),
              });
              return e;
            },
          },
          form: (
            <Select>
              {projects &&
                projects.map((p) => (
                  <Select.Option key={p.id}>{p.name}</Select.Option>
                ))}
            </Select>
          ),
        },
        {
          config: {
            name: "users",
            label: "Users",
            initialValue: [],
          },
          form: <SelectUser users={users} />,
        },
      ],
      requestType: "POST",
      requestURL: `/api/project/{project}/add_user_batch/`,
    },

    "create-pipeline": {
      pageTitle: `Create new pipeline`,
      formConfig: [
        {
          config: {
            name: "project",
            label: "Project",
            rules: [{ required: true }],
          },
          form: (
            <Select>
              {projects &&
                projects.map((p) => (
                  <Select.Option key={p.id}>{p.name}</Select.Option>
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
            name: "model_type",
            label: "Model Type",
            rules: [{ required: true }],
          },
          form: (
            <Select
              onChange={(e) => {
                re_render();
                return e;
              }}
            >
              <Select.Option value="CLARA">CLARA</Select.Option>
              <Select.Option value="NON CLARA">NON CLARA</Select.Option>
            </Select>
          ),
        },
      ].concat(
        form.getFieldValue("model_type") === "CLARA"
          ? [
              {
                config: {
                  name: "clara_pipeline_name",
                  label: "Clara Pipeline Name",
                  tooltip: PIPELINE_NAME_TOOLTIP,
                  rules: [{ required: true }],
                },
                form: <Input />,
              },
              {
                config: {
                  name: "pipeline_id",
                  label: "Clara Pipeline ID",
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
            ]
          : form.getFieldValue("model_type") === "NON CLARA"
          ? [
              {
                config: {
                  name: "model_name",
                  label: "Model Name",
                  rules: [{ required: true }],
                },
                form: <Input />,
              },
              // {
              //   config: {
              //     name: "netInputname",
              //     label: "Net Input Name",
              //     rules: [{ required: true }],
              //   },
              //   form: <Input />,
              // },
              // {
              //   config: {
              //     name: "netOutputname",
              //     label: "Net Output Name",
              //     rules: [{ required: true }],
              //   },
              //   form: <Input />,
              // },
            ]
          : []
      ),
      requestType: "POST",
      requestURL: `/api/project/{project}/add_pipeline/`,
    },

    "edit-pipeline": {
      pageTitle: `Edit pipeline`,
      formConfig: [
        {
          config: {
            name: "pipeline",
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
            <PipelineSelect
              projects={projects}
              onChange={(e) => {
                re_render();
                return e;
              }}
            />
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
            name: "model_type",
            label: "Model Type",
            rules: [{ required: true }],
          },
          form: (
            <Select
              onChange={(e) => {
                re_render();
                return e;
              }}
            >
              <Select.Option value="CLARA">CLARA</Select.Option>
              <Select.Option value="NON CLARA">NON CLARA</Select.Option>
            </Select>
          ),
        },
      ].concat(
        form.getFieldValue("model_type") === "CLARA"
          ? [
              {
                config: {
                  name: "clara_pipeline_name",
                  label: "Clara Pipeline Name",
                  tooltip: PIPELINE_NAME_TOOLTIP,
                  rules: [{ required: true }],
                },
                form: <Input />,
              },
              {
                config: {
                  name: "pipeline_id",
                  label: "Clara Pipeline ID",
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
            ]
          : form.getFieldValue("model_type") === "NON CLARA"
          ? [
              {
                config: {
                  name: "model_name",
                  label: "Model Name",
                  rules: [{ required: true }],
                },
                form: <Input />,
              },
              // {
              //   config: {
              //     name: "netInputname",
              //     label: "Net Input Name",
              //     rules: [{ required: true }],
              //   },
              //   form: <Input />,
              // },
              // {
              //   config: {
              //     name: "netOutputname",
              //     label: "Net Output Name",
              //     rules: [{ required: true }],
              //   },
              //   form: <Input />,
              // },
            ]
          : []
      ),
      requestType: "PUT",
      requestURL: "/api/pipeline/{pipeline}/",
    },

    "delete-project": {
      pageTitle: <span style={{ color: "red" }}>{`Delete project`}</span>,
      formConfig: [
        {
          config: {
            name: "project",
            label: "Project",
            rules: [{ required: true }],
          },
          form: (
            <Select>
              {projects &&
                projects.map((p) => (
                  <Select.Option key={p.id}>{p.name}</Select.Option>
                ))}
            </Select>
          ),
        },
        {
          config: {
            name: "name",
            label: "Confirmation",
            tooltip:
              "Please type the name of the project to confirm. This action cannot be undone. This will permanently delete the any associated images, labels and pipelines.",
            rules: [
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const project_id = getFieldValue("project");
                  const project = projects.find((p) => p.id == project_id);
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
      requestURL: `/api/project/{project}/`,
    },

    "delete-pipeline": {
      pageTitle: <span style={{ color: "red" }}>{`Delete pipeline`}</span>,
      formConfig: [
        {
          config: {
            name: "pipeline",
            label: "Pipeline",
            rules: [{ required: true }],
          },
          form: <PipelineSelect projects={projects} />,
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
                  if (
                    p &&
                    p.id === Number.parseInt(getFieldValue("pipeline"))
                  ) {
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
      requestURL: `/api/pipeline/{pipeline}`,
    },

    "export-dataset": {
      pageTitle: "Export dataset",
      formConfig: [
        {
          config: {
            name: "project",
            label: "Project",
            rules: [{ required: true }],
          },
          form: (
            <Select>
              {projects &&
                projects.map((p) => (
                  <Select.Option key={p.id}>{p.name}</Select.Option>
                ))}
            </Select>
          ),
        },
      ],
      requestType: "POST",
      // TODO change this later
      requestURL: `/api/project/{project}/`,
    },

    "download-dataset": {
      pageTitle: "Download dataset",
      formConfig: [
        {
          config: {
            name: "project",
            label: "Project",
            rules: [{ required: true }],
          },
          form: (
            <Select>
              {projects &&
                projects.map((p) => (
                  <Select.Option key={p.id}>{p.name}</Select.Option>
                ))}
            </Select>
          ),
        },
      ],
      requestType: "DOWNLOAD",
      // TODO change this later
      requestURL: `/api/project/{project}/`,
      filename: "{project}",
    },
  };
};

export default getFormTemplate;
