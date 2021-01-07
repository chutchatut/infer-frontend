import * as actionTypes from "./actionTypes";

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("Token");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const authInit = (username, password, remember) => async (dispatch) => {
  dispatch({ type: actionTypes.AUTH_INIT });
  try {
    // const response = await axios.post("/auth", {
    //   username: username,
    //   password: password,
    // });

    // For testing
    // throw new Error("Lmao");
    setTimeout(() => {
      const response = "lmao";
      dispatch(authSuccess(response));
      if (remember) localStorage.setItem("Token", response);
    }, 2000);
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const authRestore = () => (dispatch, getState) => {
  if (getState().auth.token) return;
  const token = localStorage.getItem("Token");
  if (token) {
    dispatch(authSuccess(token));
  }
};
