import { Badge, Card, Skeleton, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Router, useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

// TODO change to be more like ngc
const { Paragraph } = Typography;
const SelectProject = (props) => {
  const projects = useSelector((state) => state.project.projects);
  const router = useRouter();

  const currentProject = useSelector((state) => state.project.currentProject);

  if (!projects) {
    return <Skeleton />;
  }

  const getProjectCard = (project, i) => (
    <Card
      style={{
        width: "330px",
      }}
      hoverable
      onClick={router.push.bind(this, `project?id=${project.id}`)}
      key={i}
      cover={
        <img
          alt="Project cover"
          src="https://www.pilotcareernews.com/wp-content/uploads/2015/09/medical.jpg"
          height="170px"
          style={{ objectFit: "cover" }}
        />
      }
    >
      <Card.Meta
        title={
          <>
            <span style={{ fontSize: "20px" }}>{project.name}</span>
            <br />
            <span style={{ fontSize: "9px", color: "grey" }}>
              {project.task}
            </span>
          </>
        }
        description={
          <Paragraph ellipsis={{ rows: 4 }}>{project.description} </Paragraph>
        }
      />
    </Card>
  );

  return (
    <Space wrap size="middle">
      {projects.map((project, i) =>
        currentProject && project.id === currentProject.id ? (
          <Badge.Ribbon text="active" color="green">
            {getProjectCard(project, i)}
          </Badge.Ribbon>
        ) : (
          getProjectCard(project, i)
        )
      )}
    </Space>
  );
};

export default SelectProject;
