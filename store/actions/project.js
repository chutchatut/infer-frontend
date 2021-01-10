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
  return {
    type: actionTypes.SET_CURRENT_PROJECT,
    payload: project,
  };
};
