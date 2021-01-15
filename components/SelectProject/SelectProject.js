import { Card, Descriptions, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import ProjectDashboard from "./ProjectDashboard/ProjectDashboard";

const { Paragraph } = Typography;

const SelectProject = (props) => {
  const projects = useSelector((state) => state.project.projects);
  const [projectOnModal, setProjectOnModal] = useState(null);
  const dispatch = useDispatch();

  if (!projects) {
    return <div>loading</div>;
  }

  return (
    <Fragment>
      <Space wrap size="middle">
        {projects.map((project) => (
          <Card
            style={{
              width: "300px",
              // height: "250px"
            }}
            hoverable
            onClick={setProjectOnModal.bind(this, project)}
          >
            <Descriptions title={project.name} key={project.id}>
              <Descriptions.Item>
                <Paragraph ellipsis={{ rows: 6, expandable: false }}>
                  {project.description}
                </Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ))}
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
        width="800px"
        height="500px"
      >
        <ProjectDashboard project={projectOnModal} />
      </Modal>
    </Fragment>
  );
};

export default SelectProject;
