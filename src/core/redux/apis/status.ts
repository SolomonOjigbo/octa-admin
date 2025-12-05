import BASE_URL from "./api";
import {
  fetchStatusStart,
  fetchStatusSuccess,
  fetchStatusFailure,
} from "../slices/status";

export const checkApiStatus = () => async (dispatch: any) => {
  dispatch(fetchStatusStart());

  try {
    const response = await fetch(`${BASE_URL}/`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load API status");
    }

    dispatch(fetchStatusSuccess(data));
  } catch (error: any) {
      console.error("API fetch error:", error);
  dispatch(fetchStatusFailure(error.message || "Unknown error"));
  }
};
