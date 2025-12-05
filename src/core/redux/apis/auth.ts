import BASE_URL from "./api";
import { loginStart, loginSuccess, loginFailure,logout } from "../slices/auth";
import { LoginRequest } from "../types/auth";

export const loginUser =
  (credentials: LoginRequest) => async (dispatch: any) => {
    dispatch(loginStart());

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      dispatch(loginSuccess(data));
      // optionally store tokens in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error: any) {
      console.error("Login error:", error);
      dispatch(loginFailure(error.message));
    }
  };

  export const logoutUser =
  (refreshToken: string, redirect: () => void) => async (dispatch: any) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to logout");
      }

      // clear Redux state
      dispatch(logout());

      // remove tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // redirect to sign-in page
      redirect();
    } catch (error: any) {
      console.error("Logout error:", error);
      // optionally handle error state
    }
  };

