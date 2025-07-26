import { combineReducers } from "redux";
import utilitySlice from './slices/utilitySlice'
import teamSlice from "./slices/teamSlice"
import groundSlice from "./slices/groundSlice";

export default combineReducers({
    utilitySlice,
    teamSlice,
    groundSlice
});
