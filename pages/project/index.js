import { message, Skeleton } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProjectDashboard from "../../components/ProjectDashboard/ProjectDashboard";

const project = (props) => {
  const router = useRouter();
  const [projectData, setProjectData] = useState(null);

  useEffect(async () => {
    if (!router.query.id) return;
    try {
      const projectData = await axios.get(`/api/project/${router.query.id}`);
      setProjectData(projectData.data);
    } catch (error) {
      message.error("There was an error loading the page!");
    }
  }, [router.query.id]);

  if (!projectData) return <Skeleton />;
  return <ProjectDashboard projectData={projectData} />;
};

export default project;
