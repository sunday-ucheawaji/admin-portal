import { combineReducers } from "redux";
import ThemeReducer from "./reducers/ThemeReducer";
import { authReducerLogin } from "./reducers/authReducer";

const rootReducer = combineReducers({
  ThemeReducer,
  auth: authReducerLogin,
});

export default rootReducer;
