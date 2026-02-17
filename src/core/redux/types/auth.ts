// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   tenantId: string;
// }

// export interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
//   user: User;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface AuthState {
//   user: User | null;
//   accessToken: string | null;
//   refreshToken: string | null;
//   loading: boolean;
//   error: string | null;
// }

export interface User {
  id: string;
  name: string;
  email: string;
  tenantId: string;
  practitionerId?: string;
  requiresProfileSetup?: boolean;
  roles?: string[];
  storeId?: string;
  warehouseId?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface AcceptInvitationRequest {
  token: string;
  password: string;
  name?: string;
}

export interface AcceptInvitationResponse {
  id: string;
  name: string;
  email: string;
  tenantId: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface InviteUserRequest {
  tenantId: string;
  email: string;
  name?: string;
  roleId: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

