import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "teamSlice",
  initialState: {
    teamId: "",
    teamname: "",
    captainname: "",
    email: "",
    phone: "",
    address: "",
  },

  reducers: {
    setTeamId(state, action) {
      state.teamId = action.payload;
    },
    setTeamName(state, action) {
      state.teamname = action.payload;
    },
    setCaptainName(state, action) {
      state.captainname = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const {
  setAddress,
  setCaptainName,
  setEmail,
  setPhone,
  setTeamId,
  setTeamName,
} = slice.actions;

export default slice.reducer;
