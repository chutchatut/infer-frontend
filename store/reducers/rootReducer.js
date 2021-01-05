const { combineReducers } = require("redux");
import authReducer from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
