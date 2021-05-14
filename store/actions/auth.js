import * as actionTypes from "./actionTypes";
import axios from "axios";
import { fetchProjects, restoreCurrentProject } from "./project";

export const setToken = (token, username) => async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] = `token ${token}`;
    const response = await axios.get(`/api/user/${username}`); // change this later
    const isAdmin = response.data.is_staff;
    dispatch(authSuccess(token, isAdmin));
    dispatch(restoreCurrentProject());
    dispatch(fetchProjects());
  } catch (e) {
    dispatch(authFail);
  }
};

export const authSuccess = (token, isAdmin) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      isAdmin: isAdmin,
    },
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const authLogout = () => (dispatch) => {
  localStorage.removeItem("Token");
  localStorage.removeItem("currentProjectID");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: actionTypes.AUTH_LOGOUT });
  dispatch({ type: actionTypes.CLEAR_CURRENT_PROJECT });
};

export const authInit = (username, password, remember) => async (dispatch) => {
  dispatch({ type: actionTypes.AUTH_INIT });
  try {
    const response = await axios.post("auth/", {
      username: username,
      password: password,
    });
    if (remember) {
      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("Username", username);
    }
    dispatch(setToken(response.data.token, username));
  } catch (error) {
    if (error.response && error.response.status === 400)
      dispatch(authFail("Invalid credential"));
    else dispatch(authFail(error.message));
  }
};

export const authRestore = () => async (dispatch, getState) => {
  if (getState().auth.token) return;
  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("Username");
  if (token) {
    dispatch(setToken(token, username));
  }
};
