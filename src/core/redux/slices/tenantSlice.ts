import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Tenant } from "../types/tenantTypes";
import { globalTenantApi } from "../apis/tenant";

interface TenantState {
  loading: boolean;
  error: string | null;
  tenants: Tenant[];
  selectedTenant: Tenant | null;

  // active store (same as mobile)
  activeStoreId: string | null;
  activeStoreName: string;
}

const initialState: TenantState = {
  loading: false,
  error: null,
  tenants: [],
  selectedTenant: null,
  activeStoreId: null,
  activeStoreName: "Select Store",
};

// SORT BY LATEST
const sortByLatest = (arr: Tenant[]) =>
  arr.slice().sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
      state.error = null;
    },

    requestFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    getAllSuccess(state, action: PayloadAction<Tenant[]>) {
      state.loading = false;
      state.tenants = sortByLatest(action.payload);
    },

    getOneSuccess(state, action: PayloadAction<Tenant>) {
      state.loading = false;
      state.selectedTenant = action.payload;
    },

    createSuccess(state, action: PayloadAction<Tenant>) {
      state.loading = false;
      state.tenants.unshift(action.payload);
    },

    updateSuccessold(state, action: PayloadAction<Tenant>) {
      const updated = action.payload;

      state.tenants = state.tenants.map((t) =>
        t.id === updated.id ? { ...t, ...updated } : t
      );

      if (state.selectedTenant?.id === updated.id) {
        state.selectedTenant = updated;
      }

      state.loading = false;
    },

    updateSuccess(state, action: PayloadAction<Tenant>) {
  const updated = action.payload;

  const index = state.tenants.findIndex(t => t.id === updated.id);

  if (index !== -1) {
    state.tenants[index] = updated;
  }

  if (state.selectedTenant?.id === updated.id) {
    state.selectedTenant = updated;
  }

  state.loading = false;
},

    deleteSuccess(state, action: PayloadAction<string>) {
      const id = action.payload;

      state.loading = false;
      state.tenants = state.tenants.filter((t) => t.id !== id);

      if (state.selectedTenant?.id === id) {
        state.selectedTenant = null;
      }
    },

    // ACTIVE STORE (same feature as mobile)
    setActiveStore(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      state.activeStoreId = action.payload.id;
      state.activeStoreName = action.payload.name;
    },

    clearTenantState(state) {
      state.activeStoreId = null;
      state.activeStoreName = "Select Store";
    },
  },
});

export const {
  requestStart,
  requestFail,
  getAllSuccess,
  getOneSuccess,
  createSuccess,
  updateSuccess,
  deleteSuccess,
  setActiveStore,
  clearTenantState,
} = tenantSlice.actions;

export default tenantSlice.reducer;


// FETCH ALL TENANTS
export const fetchGlobalTenants = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const res = await globalTenantApi.getAll();
    dispatch(getAllSuccess(res.data));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

// FETCH ONE
export const fetchGlobalTenantById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const tenant = await globalTenantApi.getById(id);
      dispatch(getOneSuccess(tenant));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// CREATE / ONBOARD
export const createGlobalTenant =
  (dto: Partial<Tenant>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const created = await globalTenantApi.create(dto);
      dispatch(createSuccess(created));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// UPDATE
export const updateGlobalTenantold =
  (id: string, dto: Partial<Tenant>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const updated = await globalTenantApi.update(id, dto);
      dispatch(updateSuccess(updated));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

  export const updateGlobalTenant =
  (id: string, dto: Partial<Tenant>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const updated = await globalTenantApi.update(id, dto);

      dispatch(updateSuccess(updated));

      return updated; // ⭐ IMPORTANT
    } catch (e: any) {
      dispatch(requestFail(e.message));
      throw e; // ⭐ IMPORTANT for catch in component
    }
  };

// DELETE
export const deleteGlobalTenant =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      await globalTenantApi.delete(id);
      dispatch(deleteSuccess(id));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };