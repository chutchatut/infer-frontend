import { message, Skeleton } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProjectDashboard from "../../components/ProjectDashboard/ProjectDashboard";

// const ProjectDashboard = dynamic(
//   () => import("../../components/ProjectDashboard/ProjectDashboard"),
//   { ssr: false }
// );

const project = (props) => {
  const router = useRouter();
  const [project, setProject] = useState(null);

  useEffect(async () => {
    if (!router.query.id) return;
    try {
      const projectData = await axios.get(`/api/project/${router.query.id}`);
      setProject(projectData.data.project);
    } catch (error) {
      message.error("There was an error loading the page!");
    }
  }, [router.query.id]);

  if (!project) return <Skeleton />;
  return <ProjectDashboard project={project} />;
};

export default project;
