import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  username: null,
  loading: false,
  error: null,
  isAdmin: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return {
        ...state,
        loading: true,
        error: null,
        isAdmin: false,
        username: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin,
        username: action.payload.username,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: null,
        username: null,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        username: null,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export default reducer;
