import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Supplier } from "../types/globalSupplier";
import { globalSupplierApi } from "../apis/globalSupplier";

interface SupplierState {
  loading: boolean;
  error: string | null;
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
}

const initialState: SupplierState = {
  loading: false,
  error: null,
  suppliers: [],
  selectedSupplier: null,
};

// Helper function to sort alphabetically by name
const sortByName = (suppliers: Supplier[]) => {
  return suppliers.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));
};

const supplierSlice = createSlice({
  name: "globalSupplier",
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

    getAllSuccess(state, action: PayloadAction<Supplier[]>) {
      state.loading = false;
      state.suppliers = sortByName(action.payload);
    },

    getOneSuccess(state, action: PayloadAction<Supplier>) {
      state.loading = false;
      state.selectedSupplier = action.payload;
    },

    createSuccess(state, action: PayloadAction<Supplier>) {
      state.loading = false;
      state.suppliers.push(action.payload);
      state.suppliers = sortByName(state.suppliers);
    },

updateSuccess(state, action: PayloadAction<Supplier>) {
  const updated = action.payload;
  state.suppliers = state.suppliers.map((s) =>
    s.id === updated.id ? { ...s, ...updated } : s
  );
  state.suppliers = sortByName(state.suppliers);

  state.selectedSupplier =
    state.selectedSupplier?.id === updated.id
      ? { ...state.selectedSupplier, ...updated }
      : state.selectedSupplier;

  state.loading = false;
},


    deleteSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.suppliers = state.suppliers.filter((s) => s.id !== action.payload);
      if (state.selectedSupplier?.id === action.payload) {
        state.selectedSupplier = null;
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
} = supplierSlice.actions;

export default supplierSlice.reducer;

// FETCH ALL
export const fetchGlobalSuppliers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const res = await globalSupplierApi.getAll();
    dispatch(getAllSuccess(res.data));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

// FETCH ONE
export const fetchGlobalSupplierById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const supplier = await globalSupplierApi.getById(id);
      dispatch(getOneSuccess(supplier));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// CREATE
export const createGlobalSupplier =
  (dto: Partial<Supplier>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const created = await globalSupplierApi.create(dto);
      dispatch(createSuccess(created));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// UPDATE
export const updateGlobalSupplier =
  (id: string, dto: Partial<Supplier>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const updated = await globalSupplierApi.update(id, dto);
      dispatch(updateSuccess(updated));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// DELETE
export const deleteGlobalSupplier =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      await globalSupplierApi.delete(id);
      dispatch(deleteSuccess(id));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };
