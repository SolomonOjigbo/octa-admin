export interface User {
  id: string;
  tenantId: string;

  name: string;
  firstName: string;
  lastName: string;
  email: string | null;

  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;

  profilePicture: string | null;

  isEmailVerified: boolean;
  isSuperAdmin: boolean;
   isActive: boolean;

  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export interface UserListResponse {
  count: number;
  users: User[];
}
export interface InviteUserDto {
  tenantId: string;
  roleId: string;
  email: string;
  name?: string;
}
