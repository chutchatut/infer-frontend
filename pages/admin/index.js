import { ProjectOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Select, Space } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Settings from "../../components/Settings/Settings";

const { SubMenu } = Menu;

const admin = () => {
  const [page, setPage] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  const projects = useSelector((state) => state.project.projects);
  return (
    <Space direction="vertical">
      <div>
        Select the pipeline to edit:{"   "}
        <Select
          style={{ width: "200px" }}
          onChange={(e) => {
            const project = projects.find((p) => p.id === Number.parseInt(e));
            setCurrentProject(project);
          }}
        >
          {projects &&
            projects.map((p) => (
              <Select.Option key={p.id}>{p.name}</Select.Option>
            ))}
        </Select>
      </div>
      <Menu onClick={(e) => setPage(e.key)} mode="horizontal">
        <SubMenu key="project" icon={<SettingOutlined />} title="Settings">
          <Menu.ItemGroup title="Project" key="project">
            <Menu.Item key="create-project">Create project</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Edit Current Project" key="current_project">
            <Menu.Item key="edit-project" disabled={!currentProject}>
              Edit Project
            </Menu.Item>
            <Menu.Item key="manage-user" disabled={!currentProject}>
              Manage User
            </Menu.Item>
            <Menu.Item key="create-pipeline" disabled={!currentProject}>
              Create pipeline
            </Menu.Item>
            <Menu.Item key="edit-pipeline" disabled={!currentProject}>
              Edit pipeline
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Delete" key="delete">
            <Menu.Item key="delete-project" disabled={!currentProject} danger>
              Delete project
            </Menu.Item>
            <Menu.Item key="delete-pipeline" disabled={!currentProject} danger>
              Delete pipeline
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="advance" icon={<ProjectOutlined />} title="Advance">
          <Menu.ItemGroup title="Export" key="export">
            <Menu.Item key="export-dataset">Export dataset</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
      <Settings page={page} currentProject={currentProject} />
    </Space>
  );
};

export default admin;
