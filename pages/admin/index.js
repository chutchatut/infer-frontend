import { ProjectOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Settings from "../../components/Settings/Settings";

const { SubMenu } = Menu;

// Name -> Pipeline name
// Swap desc and model name
// Change desc to textarea
// Delete project, pipeline + Warning

const admin = () => {
  const [page, setPage] = useState(null);
  const currentProject = useSelector((state) => state.project.currentProject);
  return (
    <>
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
            <Menu.Item key="delete-project" disabled={!currentProject}>
              <span style={{ color: "red" }}>Delete project</span>
            </Menu.Item>
            <Menu.Item key="delete-pipeline" disabled={!currentProject}>
              <span style={{ color: "red" }}>Delete pipeline</span>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="advance" icon={<ProjectOutlined />} title="Advance">
          <Menu.ItemGroup title="Export" key="export">
            <Menu.Item key="export-dataset">Export dataset</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
      <Settings page={page} />
    </>
  );
};

export default admin;
