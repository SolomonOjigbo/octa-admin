import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Customer } from "../types/customer";
import { globalCustomerApi } from "../apis/customer";

interface CustomerState {
  loading: boolean;
  error: string | null;
  customers: Customer[];
  selectedCustomer: Customer | null;
}

const initialState: CustomerState = {
  loading: false,
  error: null,
  customers: [],
  selectedCustomer: null,
};

// SORT alphabetically
const sortByName = (arr: Customer[]) =>
  arr.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));

const customerSlice = createSlice({
  name: "customer",
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

    getAllSuccess(state, action: PayloadAction<Customer[]>) {
      state.loading = false;
      state.customers = sortByName(action.payload);
    },

    getOneSuccess(state, action: PayloadAction<Customer>) {
      state.loading = false;
      state.selectedCustomer = action.payload;
    },

    createSuccess(state, action: PayloadAction<Customer>) {
      state.loading = false;
      state.customers.push(action.payload);
      state.customers = sortByName(state.customers);
    },

    updateSuccess(state, action: PayloadAction<Customer>) {
      const updated = action.payload;
      state.customers = state.customers.map((c) =>
        c.id === updated.id ? { ...c, ...updated } : c
      );

      if (state.selectedCustomer?.id === updated.id) {
        state.selectedCustomer = { ...state.selectedCustomer, ...updated };
      }

      state.loading = false;
    },

    updateSuccessss(state, action: PayloadAction<Customer>) {
      const updated = action.payload;

      state.customers = state.customers.map((c) =>
        c.id === updated.id ? { ...c, ...updated } : c
      );

      state.customers = sortByName(state.customers);

      // Update selected
      if (state.selectedCustomer?.id === updated.id) {
        state.selectedCustomer = { ...state.selectedCustomer, ...updated };
      }

      state.loading = false;
    },

    deleteSuccess(state, action: PayloadAction<string>) {
      const id = action.payload;

      state.loading = false;
      state.customers = state.customers.filter((c) => c.id !== id);

      if (state.selectedCustomer?.id === id) {
        state.selectedCustomer = null;
      }
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
} = customerSlice.actions;

export default customerSlice.reducer;

// ======================
// ASYNC ACTIONS
// ======================

// FETCH ALL
export const fetchGlobalCustomers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const res = await globalCustomerApi.getAll();
    dispatch(getAllSuccess(res.customers));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

// FETCH ONE
export const fetchGlobalCustomerById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const customer = await globalCustomerApi.getById(id);
      dispatch(getOneSuccess(customer));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// CREATE
export const createGlobalCustomer =
  (dto: Partial<Customer>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const created = await globalCustomerApi.create(dto);
      dispatch(createSuccess(created));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// UPDATE
export const updateGlobalCustomer =
  (id: string, dto: Partial<Customer>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const updated = await globalCustomerApi.update(id, dto);
      dispatch(updateSuccess(updated));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// DELETE
export const deleteGlobalCustomer =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      await globalCustomerApi.delete(id);
      dispatch(deleteSuccess(id));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };
