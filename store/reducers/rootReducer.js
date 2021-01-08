const { combineReducers } = require("redux");
import authReducer from "./auth";
import projectReducer from "./project";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer;
