import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusResponse, StatusState } from "../types/status";

const initialState: StatusState = {
  data: null,
  loading: false,
  error: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    fetchStatusStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatusSuccess(state, action: PayloadAction<StatusResponse>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStatusFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatusStart,
  fetchStatusSuccess,
  fetchStatusFailure,
} = statusSlice.actions;

export default statusSlice.reducer;
