import { ProjectOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import Settings from "../../components/Settings/Settings";

const { SubMenu } = Menu;

const settings = () => {
  const [page, setPage] = useState(null);

  return (
    <>
      <Menu onClick={(e) => setPage(e.key)} mode="horizontal">
        <SubMenu key="project" icon={<ProjectOutlined />} title="Project">
          <Menu.ItemGroup title="Project" key="project">
            <Menu.Item key="create-project">Create project</Menu.Item>
            <Menu.Item key="edit-project">Edit Project</Menu.Item>
            <Menu.Item key="manage-user">Manage User</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Pipeline" key="pipeline">
            <Menu.Item key="create-pipeline">Create pipeline</Menu.Item>
            <Menu.Item key="edit-pipeline">Edit pipeline</Menu.Item>
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

export default settings;
