import { Badge, Card, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import ProjectDashboard from "./ProjectDashboard/ProjectDashboard";

const SelectProject = (props) => {
  const projects = useSelector((state) => state.project.projects);
  const [projectOnModal, setProjectOnModal] = useState(null);
  const dispatch = useDispatch();

  const currentProject = useSelector((state) => state.project.currentProject);

  if (!projects) {
    return <div>loading</div>;
  }

  const getProjectCard = (project, i) => (
    <Card
      style={{
        width: "300px",
      }}
      hoverable
      onClick={setProjectOnModal.bind(this, project)}
      key={i}
      cover={
        <img
          alt="Project cover"
          src="http://www.reportingday.com/wp-content/uploads/2018/06/Cat-HD-Pics.jpg"
          height="170px"
          style={{ objectFit: "cover" }}
        />
      }
    >
      <Card.Meta title={project.name} description={project.task} />
    </Card>
  );

  return (
    <Fragment>
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
      <Modal
        title={projectOnModal && projectOnModal.name}
        visible={projectOnModal}
        onCancel={setProjectOnModal.bind(this, null)}
        onOk={() => {
          dispatch(actions.setCurrentProject(projectOnModal));
          setProjectOnModal(null);
        }}
        okText="Select this project"
        width="850px"
        // height="800px"
      >
        <div style={{ width: "800px", height: "500px", overflow: "auto" }}>
          <ProjectDashboard project={projectOnModal} />
        </div>
      </Modal>
    </Fragment>
  );
};

export default SelectProject;
