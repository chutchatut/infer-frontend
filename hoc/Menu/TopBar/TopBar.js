import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Menu, Dropdown, message, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import Logo from "../../../assets/Logo";
import styles from './TopBar.module.css'

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
//TODO change theme
  return (
    <Fragment>
      {loading ? (
        <Skeleton.Input style={{ width: 150, marginTop: 15 }} active />
      ) : (
        <Dropdown overlay={projectsMenu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {currentProject ? currentProject.name : "Select a project"}
            &ensp;
            <DownOutlined />
          </a>
        </Dropdown>
      )}

      <Logo width="120px" height="50px" />

      <Menu theme="dark" mode="horizontal">
        <Menu.Item
          danger
          // style={{color:'white'}}
          // style={{ background: "red" }}
          icon={<LogoutOutlined />}
          className={styles.Logout}
          key="logout"
          onClick={() => {
            router.push("logout");
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </Fragment>
  );
};

export default TopBar;