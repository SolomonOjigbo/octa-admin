// import BASE_URL from "./api";
// import { loginStart, loginSuccess, loginFailure,logout } from "../slices/auth";
// import { AcceptInvitationRequest, AcceptInvitationResponse, InviteUserRequest, LoginRequest, PasswordResetRequest, RefreshResponse, ResetPasswordRequest } from "../types/auth";

// export const loginUser =
//   (credentials: LoginRequest) => async (dispatch: any) => {
//     dispatch(loginStart());

//     try {
//       const response = await fetch(`${BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to login");
//       }

//       dispatch(loginSuccess(data));
//       // optionally store tokens in localStorage
//       localStorage.setItem("accessToken", data.accessToken);
//       localStorage.setItem("refreshToken", data.refreshToken);
//     } catch (error: any) {
//       console.error("Login error:", error);
//       dispatch(loginFailure(error.message));
//     }
//   };

//   export const logoutUser =
//   (refreshToken: string, redirect: () => void) => async (dispatch: any) => {
//     try {
//       const response = await fetch(`${BASE_URL}/auth/logout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify({ refreshToken }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || "Failed to logout");
//       }

//       // clear Redux state
//       dispatch(logout());

//       // remove tokens from localStorage
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");

//       // redirect to sign-in page
//       redirect();
//     } catch (error: any) {
//       console.error("Logout error:", error);
//       // optionally handle error state
//     }
//   };

//   // Refresh token
// export const refreshToken = async (): Promise<RefreshResponse> => {
//   const refreshToken = localStorage.getItem("refreshToken");
//   const res = await fetch(`${BASE_URL}/auth/refresh`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refreshToken }),
//   });
//   if (!res.ok) throw new Error("Failed to refresh token");
//   return res.json();
// };


// // Accept Invitation
// export const acceptInvitation = (payload: AcceptInvitationRequest) => async () => {
//   const res = await fetch(`${BASE_URL}/auth/accept-invitation`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload)
//   });
//   if (!res.ok) throw new Error("Failed to accept invitation");
//   return res.json() as Promise<AcceptInvitationResponse>;
// };

// // Request Password Reset
// export const requestPasswordReset = (payload: PasswordResetRequest) => async () => {
//   const res = await fetch(`${BASE_URL}/auth/request-password-reset`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload)
//   });
//   if (!res.ok) throw new Error("Failed to request password reset");
//   return res.json();
// };

// // Reset Password
// export const resetPassword = (payload: ResetPasswordRequest) => async () => {
//   const res = await fetch(`${BASE_URL}/auth/reset-password`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload)
//   });
//   if (!res.ok) throw new Error("Failed to reset password");
//   return res.json();
// };

// // Invite User (protected)
// export const inviteUser = (payload: InviteUserRequest) => async () => {
//   const res = await fetch(`${BASE_URL}/auth/invite`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`
//     },
//     body: JSON.stringify(payload)
//   });
//   if (!res.ok) throw new Error("Failed to invite user");
//   return res.json();
// };

// // Send Verification Email (protected)
// export const sendVerificationEmail = (userId: string) => async () => {
//   const res = await fetch(`${BASE_URL}/auth/send-verification`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`
//     },
//     body: JSON.stringify({ userId })
//   });
//   if (!res.ok) throw new Error("Failed to send verification email");
//   return res.json();
// };


// // Verify Email
// export const verifyEmail = (token: string) => async () => {
//   const res = await fetch(`${BASE_URL}/auth/verify-email`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ token })
//   });
//   if (!res.ok) throw new Error("Failed to verify email");
//   return res.json();
// };

// // Check Email
// export const checkEmail = (email: string) => async () => {
//   const res = await fetch(`${BASE_URL}/auth/check-email?email=${encodeURIComponent(email)}`);
//   if (!res.ok) throw new Error("Failed to check email");
//   return res.json();
// };

import BASE_URL from "./api";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  setUsers,
  setSelectedUser,
  updateUserSuccess,
} from "../slices/auth";
import {
  LoginRequest,
  RefreshResponse,
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  PasswordResetRequest,
  ResetPasswordRequest,
  InviteUserRequest,
  User,
} from "../types/auth";


// ---------------------------
// 🔹 HELPERS (same as mobile)
// ---------------------------

const jsonHeaders = { "Content-Type": "application/json" };

const authHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function handleResponse(res: Response) {
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

const getAccessToken = () => localStorage.getItem("accessToken") || "";


// ===============================
// 🔐 AUTH
// ===============================

export const loginUser =
  (credentials: LoginRequest) => async (dispatch: any) => {
    dispatch(loginStart());

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify(credentials),
      });

      const data = await handleResponse(res);

      dispatch(loginSuccess(data));

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

export const fetchUsers =
  (tenantId: string) => async (dispatch: any) => {
    dispatch(loginStart());

    try {
      const res = await fetch(`${BASE_URL}/users?tenantId=${tenantId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();

      dispatch(setUsers(data));
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };

  export const fetchUserById =
  (id: string) => async (dispatch: any) => {
    dispatch(loginStart());

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();

      dispatch(setSelectedUser(data));
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };
export const updateUserById =
  (id: string, payload: Partial<User>) =>
  async (dispatch: any) => {
    dispatch(loginStart());

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const updatedUser = await res.json();

      dispatch(updateUserSuccess(updatedUser));
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };
  
export const logoutUser =
  (refreshToken: string, redirect: () => void) =>
  async (dispatch: any) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: authHeaders(getAccessToken()),
        body: JSON.stringify({ refreshToken }),
      });

      await handleResponse(res);

      dispatch(logout());

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      redirect();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


// ===============================
// 🔄 REFRESH TOKEN
// ===============================

export const refreshToken = async (): Promise<RefreshResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ refreshToken }),
  });

  return handleResponse(res);
};



// ===============================
// 👤 USER PROFILE
// ===============================

/**
 * 🔹 GET CURRENT USER PROFILE
 * Uses /users/me OR /users/:id depending on backend
 */
export const getProfile = () => async (dispatch: any) => {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: authHeaders(getAccessToken()),
    });

    const user: User = await handleResponse(res);

    dispatch(updateUser(user));
  } catch (err) {
    console.error("Get profile error:", err);
  }
};


/**
 * 🔹 UPDATE PROFILE
 */
export const updateProfile =
  (payload: Partial<User>, redirect?: () => void) =>
  async (dispatch: any) => {
    try {
      const res = await fetch(`${BASE_URL}/users/me`, {
        method: "PUT",
        headers: authHeaders(getAccessToken()),
        body: JSON.stringify(payload),
      });

      const updatedUser: User = await handleResponse(res);

      dispatch(updateUser(updatedUser));

      redirect?.();
    } catch (err) {
      console.error("Update profile error:", err);
    }
  };


// ===============================
// 📩 OTHER AUTH ACTIONS
// ===============================

export const acceptInvitation =
  (payload: AcceptInvitationRequest) => async () => {
    const res = await fetch(`${BASE_URL}/auth/accept-invitation`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });
    return handleResponse(res) as Promise<AcceptInvitationResponse>;
  };


export const requestPasswordReset =
  (payload: PasswordResetRequest) => async () => {
    const res = await fetch(`${BASE_URL}/auth/request-password-reset`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  };


export const resetPassword =
  (payload: ResetPasswordRequest) => async () => {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  };


export const inviteUser =
  (payload: InviteUserRequest) => async () => {
    const res = await fetch(`${BASE_URL}/auth/invite`, {
      method: "POST",
      headers: authHeaders(getAccessToken()),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  };


export const checkEmail = (email: string) => async () => {
  const res = await fetch(
    `${BASE_URL}/auth/check-email?email=${encodeURIComponent(email)}`
  );
  return handleResponse(res);
};