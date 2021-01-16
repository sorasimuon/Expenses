import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  firstname: "",
  lastname: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        userId: action.payload.userId,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
