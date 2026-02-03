export interface Store {
  id: string;
  tenantId: string;
  businessEntityId: string;
  code: string;
  name: string;

  email: string | null;
  phone: string | null;
  address: string | null;

  type: string | null; //ENUM
  status: string | null;

  isMain: boolean;
  managerId: boolean;

  openingHours: JSON;
  branding: JSON;
  settings: JSON;

  createdAt: string;
  updatedAt: string;
}

export interface StoreListResponse {
  count: number;
  stores: Store[];
}
