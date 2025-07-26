import { setTeamData } from "../slices/utilitySlice";
export const teamAction = (data) => async (dispatch) => {
    dispatch(setTeamData(data));
};

