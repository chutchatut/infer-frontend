import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return { ...state, loading: true, error: null };
    case actionTypes.AUTH_SUCCESS:
      return { ...state, loading: false, token: action.payload };
    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
