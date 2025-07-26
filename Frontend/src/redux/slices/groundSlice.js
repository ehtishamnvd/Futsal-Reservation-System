import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "groundSlice",
  initialState: {
    groundId: "",
    groundname: "",
    ownername: "",
    email: "",
    phone: "",
    address: "",
    lat: null,
    lng: null,
  },
  reducers: {
    setGroundId: (state, action) => {
      state.groundId = action.payload;
    },
    setGroundName: (state, action) => {
      state.groundname = action.payload;
    },
    setOwnerName: (state, action) => {
      state.ownername = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
  },
});

export const {
  setGroundId,
  setGroundName,
  setOwnerName,
  setEmail,
  setPhone,
  setAddress,
  setLat,
  setLng,
} = slice.actions;

export default slice.reducer;
