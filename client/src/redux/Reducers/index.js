//import { combineReducers } from "redux";
import userSlice from "./userSlice";
import blogsSlice from "./blogsSlice";

const rootReducer = {
    user : userSlice,
    blogs: blogsSlice
}
export default rootReducer;