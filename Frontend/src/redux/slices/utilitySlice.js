import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "utilitySlice",
  initialState: {
    teamData: [],
    userEmail: "",
    Grounds: "",

  },
  reducers: {
    setTeamData: (state, action) => ({
      ...state,
      teamData: action.payload,
    }),
    setEmail:(state, action) => ({
      ...state,
      userEmail: action.payload
    }),
    setGrounds:(state, action) => ({
      ...state,
      Grounds: action.payload
    })
  },
});

export const { setTeamData, setEmail, setGrounds } = slice.actions;
export default slice.reducer;
