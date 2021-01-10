import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Menu, Dropdown, message, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { DownOutlined } from "@ant-design/icons";

const TopBar = () => {
  const router = useRouter();
  let projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);
  const currentProject = useSelector((state) => state.project.currentProject);

  const dispatch = useDispatch();

  let projectsMenu= <Menu />;
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
      <span style={{ color: "white" }}>Logo here</span>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item
          danger
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
