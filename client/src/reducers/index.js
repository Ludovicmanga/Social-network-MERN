import { combineReducers } from "redux";
import postReducer from "./post.reducer";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducers";
import errorReducer from "./error.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    errorReducer
})