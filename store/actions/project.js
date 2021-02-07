import { message } from "antd";
import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchProjectsSuccess = (projects) => {
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    payload: projects,
  };
};

export const fetchProjectsFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    payload: error,
  };
};

export const fetchProjects = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_PROJECTS_INIT });
  try {
    const projects = await axios.get("/api/project");
    dispatch(fetchProjectsSuccess(projects.data));
  } catch (error) {
    dispatch(fetchProjectsFail(error));
  }
};

export const setCurrentProject = (project) => {
  localStorage.setItem("currentProjectID", project.id);
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: project,
  };
};

export const restoreCurrentProject = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `/api/project/${localStorage.getItem("currentProjectID")}/`
    );
    dispatch({
      type: actionTypes.SET_CURRENT_PROJECT,
      payload: response.data.project,
    });
  } catch (error) {
    message.info("An error occurred when trying to connect to server");
  }
};
