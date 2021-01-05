import { createSlice } from "@reduxjs/toolkit";
import { teal } from "@material-ui/core/colors";

const initialState = {
  wallet: teal[600],
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducer: {
    setWalletTheme(state, action) {
      return {
        ...state,
        wallet: action.payload,
      };
    },
  },
});

export const { setWalletTheme } = themeSlice.actions;
export default themeSlice.reducer;
