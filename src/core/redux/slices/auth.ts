import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse, User } from "../types/auth";


const initialState: AuthState & {
  passwordResetSuccess: boolean;
  emailVerificationSuccess: boolean;

    users: User[];
  selectedUser: User | null;
  success: boolean;
} = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
    passwordResetSuccess: false,
  emailVerificationSuccess: false,

    users: [],
  selectedUser: null,
  success: false,
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
    //  USER LIST
setUsers(state, action: PayloadAction<User[]>) {
  state.users = action.payload;
  state.loading = false;
},

//  SELECT USER
setSelectedUser(state, action: PayloadAction<User>) {
  state.selectedUser = action.payload;
  state.loading = false;
},

clearSelectedUser(state) {
  state.selectedUser = null;
},

//  ADD USER
addUserSuccess(state, action: PayloadAction<User>) {
  state.users.unshift(action.payload);
  state.loading = false;
},

//  UPDATE USER (instant UI)
updateUserSuccess(state, action: PayloadAction<User>) {
  const updatedUser = action.payload;

  const index = state.users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    state.users[index] = updatedUser;
  }

  // also update selected user
  if (state.selectedUser?.id === updatedUser.id) {
    state.selectedUser = updatedUser;
  }
},

//  DELETE USER
deleteUserSuccess(state, action: PayloadAction<string>) {
  state.users = state.users.filter(u => u.id !== action.payload);
},

//  ACTIVATE / DEACTIVATE
updateUserStatus(
  state,
  action: PayloadAction<{ id: string; isActive: boolean }>
) {
  state.users = state.users.map(user =>
    user.id === action.payload.id
      ? { ...user, isActive: action.payload.isActive }
      : user
  );
},
    // Add optional action for updating user after invitation
updateUser(state, action: PayloadAction<User>) {
  state.user = action.payload;
},
clearError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
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
   clearError, clearUser,refreshStart,
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
  inviteUserFailure,

  updateUser,
  setUsers,
  setSelectedUser,
  clearSelectedUser,
  addUserSuccess,
  updateUserSuccess,
 } = authSlice.actions;

export default authSlice.reducer;
