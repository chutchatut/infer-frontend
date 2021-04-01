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

export const fetchProjects = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_PROJECTS_INIT });
  try {
    const projects = (await axios.get("/api/project")).data;
    dispatch(fetchProjectsSuccess(projects));
    if (getState().project.currentProject) {
      const currentProjectID = getState().project.currentProject.id;
      dispatch(reloadCurrentProject(currentProjectID));
    }
  } catch (error) {
    dispatch(fetchProjectsFail(error));
  }
};

export const setCurrentProject = (project) => {
  localStorage.setItem("currentProjectID", project && project.id);
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: project,
  };
};

export const restoreCurrentProject = () => async (dispatch) => {
  dispatch(reloadCurrentProject(localStorage.getItem("currentProjectID")));
};

export const reloadCurrentProject = (currentProjectID) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/project/${currentProjectID}/`);
    dispatch({
      type: actionTypes.SET_CURRENT_PROJECT,
      payload: response.data.project,
    });
  } catch (error) {
    if (error && error.response && error.response.status === 404)
      dispatch(setCurrentProject(null));
    else message.info("An error occurred when trying to connect to server");
  }
};
