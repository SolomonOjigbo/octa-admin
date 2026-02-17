import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse, User } from "../types/auth";


const initialState: AuthState & {
  passwordResetSuccess: boolean;
  emailVerificationSuccess: boolean;
} = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
    passwordResetSuccess: false,
  emailVerificationSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    // Add optional action for updating user after invitation
updateUser(state, action: PayloadAction<User>) {
  state.user = action.payload;
},
  // ---- REFRESH TOKEN ----
    refreshStart(state) {
      state.loading = true;
      state.error = null;
    },
    refreshSuccess(state, action: PayloadAction<{ accessToken: string }>) {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
    },
    refreshFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- ACCEPT INVITATION ----
    acceptInvitationStart(state) {
      state.loading = true;
      state.error = null;
    },
    acceptInvitationSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    acceptInvitationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- PASSWORD RESET ----
    passwordResetRequestStart(state) {
      state.loading = true;
      state.error = null;
      state.passwordResetSuccess = false;
    },
    passwordResetRequestSuccess(state) {
      state.loading = false;
      state.passwordResetSuccess = true;
    },
    passwordResetRequestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- RESET PASSWORD ----
    resetPasswordStart(state) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
      state.passwordResetSuccess = true;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- EMAIL VERIFICATION ----
    sendVerificationStart(state) {
      state.loading = true;
      state.error = null;
      state.emailVerificationSuccess = false;
    },
    sendVerificationSuccess(state) {
      state.loading = false;
      state.emailVerificationSuccess = true;
    },
    sendVerificationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    verifyEmailStart(state) {
      state.loading = true;
      state.error = null;
    },
    verifyEmailSuccess(state) {
      state.loading = false;
      state.emailVerificationSuccess = true;
      if (state.user) state.user.requiresProfileSetup = false; // optional
    },
    verifyEmailFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- INVITE USER (ADMIN) ----
    inviteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    inviteUserSuccess(state) {
      state.loading = false;
    },
    inviteUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },


  },
});

export const { loginStart, loginSuccess, loginFailure, logout,
   refreshStart,
  refreshSuccess,
  refreshFailure,
  acceptInvitationStart,
  acceptInvitationSuccess,
  acceptInvitationFailure,
  passwordResetRequestStart,
  passwordResetRequestSuccess,
  passwordResetRequestFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  sendVerificationStart,
  sendVerificationSuccess,
  sendVerificationFailure,
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailFailure,
  inviteUserStart,
  inviteUserSuccess,
  inviteUserFailure
 } = authSlice.actions;

export default authSlice.reducer;
