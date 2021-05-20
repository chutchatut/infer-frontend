import {
  ProjectOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Select, Space } from "antd";
import React, { useState } from "react";
import Settings from "../../components/Settings/Settings";

const { SubMenu } = Menu;

const admin = () => {
  const [page, setPage] = useState(null);

  return (
    <Space direction="vertical">
      <Menu onClick={(e) => setPage(e.key)} mode="horizontal">
        <SubMenu key="user" icon={<UserOutlined />} title="User Settings">
          <Menu.Item key="create-user">Create User</Menu.Item>
          <Menu.Item key="edit-user">Edit User</Menu.Item>
          <Menu.Item key="change-user-password">Change User Password</Menu.Item>
          <Menu.Item key="delete-user" danger>
            Delete User
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="project"
          icon={<SettingOutlined />}
          title="Project Settings"
        >
          <Menu.ItemGroup title="Create" key="create_project">
            <Menu.Item key="create-project">Create project</Menu.Item>
            <Menu.Item key="create-pipeline">Create pipeline</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Edit" key="edit_project">
            <Menu.Item key="edit-project">Edit Project</Menu.Item>
            <Menu.Item key="manage-user">Manage User</Menu.Item>
            <Menu.Item key="edit-pipeline">Edit pipeline</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Delete" key="delete_project">
            <Menu.Item key="delete-project" danger>
              Delete project
            </Menu.Item>
            <Menu.Item key="delete-pipeline" danger>
              Delete pipeline
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="advance" icon={<ProjectOutlined />} title="Advance">
          <Menu.ItemGroup title="Export" key="export">
            <Menu.Item key="export-dataset">Export dataset</Menu.Item>
            <Menu.Item key="download-dataset">Download dataset</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
      <Settings page={page} />
    </Space>
  );
};

export default admin;
