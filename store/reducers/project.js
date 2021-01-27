import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  projects: null,
  currentProject: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_INIT:
      return { ...state, loading: true };
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        error: null,
        loading: false,
      };
    case actionTypes.FETCH_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.SET_CURRENT_PROJECT:
      return { ...state, currentProject: action.payload };
    case actionTypes.CLEAR_CURRENT_PROJECT:
      return { ...state, currentProject: null };
    default:
      return state;
  }
};

export default reducer;
