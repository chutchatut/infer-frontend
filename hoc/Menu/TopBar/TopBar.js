import { useRouter } from "next/router";
import React from "react";
import { Menu, Dropdown, Skeleton, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import Logo from "../../../assets/Logo";
import styles from "./TopBar.module.css";
import ResourceMonitor from "./ResourceMonitor/ResourceMonitor";

const TopBar = () => {
  const router = useRouter();
  let projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);
  const currentProject = useSelector((state) => state.project.currentProject);

  const dispatch = useDispatch();

  let projectsMenu = <Menu />;
  if (projects) {
    projectsMenu = (
      <Menu>
        {projects.map((project, i) => (
          <Menu.Item
            onClick={() => {
              dispatch(actions.setCurrentProject(project));
            }}
            key={i}
          >
            {project.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  return (
    <>
      {router.asPath.toLowerCase().includes("admin") ? (
        <div style={{ width: 150 }} />
      ) : loading ? (
        <Skeleton.Input style={{ width: 150, marginTop: 15 }} active />
      ) : (
        <Dropdown overlay={projectsMenu} trigger={["click"]}>
          <a
            className={["ant-dropdown-link", styles.dropdown]}
            onClick={(e) => e.preventDefault()}
          >
            {currentProject ? currentProject.name : "Select a project"}
            &ensp;
            <DownOutlined />
          </a>
        </Dropdown>
      )}

      <div
        style={{
          position: "absolute",
          marginTop: "10px",
          left: "calc( 50% - 50px )",
        }}
      >
        <Logo width="100px" height="50px" />
      </div>
      <Space size="small">
        <ResourceMonitor />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item
            danger
            icon={<LogoutOutlined />}
            key="logout"
            onClick={() => {
              router.push("logout");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Space>
    </>
  );
};

export default TopBar;
