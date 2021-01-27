import * as actionTypes from "./actionTypes";
import axios from "axios";
import { fetchProjects } from "./project";

export const authSuccess = (authData) => (dispatch) => {
  dispatch({
    type: actionTypes.AUTH_SUCCESS,
    payload: authData,
  });
  dispatch(fetchProjects());
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
    if (remember) localStorage.setItem("Token", response.data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `token ${response.data.token}`;
    dispatch(authSuccess(response.data.token));
  } catch (error) {
    if (error.response.status === 400) dispatch(authFail("Invalid credential"));
    else dispatch(authFail(error.message));
  }
};

export const authRestore = () => (dispatch, getState) => {
  if (getState().auth.token) return;
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `token ${token}`;
  if (token) {
    dispatch(authSuccess(token));
  }
};
