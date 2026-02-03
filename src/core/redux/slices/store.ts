import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Store } from "../types/store";
import { globalStoreApi } from "../apis/store";

interface StoreState {
  loading: boolean;
  error: string | null;
  stores: Store[];
  selectedStore: Store | null;
}

const initialState: StoreState = {
  loading: false,
  error: null,
  stores: [],
  selectedStore: null,
};

// SORT alphabetically
const sortByName = (arr: Store[]) =>
  arr.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));

const storeSlice = createSlice({
  name: "store",
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

    getAllSuccess(state, action: PayloadAction<Store[]>) {
      state.loading = false;
      state.stores = sortByName(action.payload);
    },

    getOneSuccess(state, action: PayloadAction<Store>) {
      state.loading = false;
      state.selectedStore = action.payload;
    },

    createSuccess(state, action: PayloadAction<Store>) {
      state.loading = false;
      state.stores.push(action.payload);
      state.stores = sortByName(state.stores);
    },

    updateSuccess(state, action: PayloadAction<Store>) {
      const updated = action.payload;
      state.stores = state.stores.map((c) =>
        c.id === updated.id ? { ...c, ...updated } : c
      );

      if (state.selectedStore?.id === updated.id) {
        state.selectedStore = { ...state.selectedStore, ...updated };
      }

      state.loading = false;
    },

    deleteSuccess(state, action: PayloadAction<string>) {
      const id = action.payload;

      state.loading = false;
      state.stores = state.stores.filter((c) => c.id !== id);

      if (state.selectedStore?.id === id) {
        state.selectedStore = null;
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
} = storeSlice.actions;

export default storeSlice.reducer;

// ======================
// ASYNC ACTIONS
// ======================

// FETCH ALL
export const fetchGlobalStores = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const res = await globalStoreApi.getAll();
    dispatch(getAllSuccess(res.stores));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

// FETCH ONE
export const fetchGlobalStoreById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const store = await globalStoreApi.getById(id);
      dispatch(getOneSuccess(store));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// CREATE
export const createGlobalStore =
  (dto: Partial<Store>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const created = await globalStoreApi.create(dto);
      dispatch(createSuccess(created));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// UPDATE
export const updateGlobalStore =
  (id: string, dto: Partial<Store>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const updated = await globalStoreApi.update(id, dto);
      dispatch(updateSuccess(updated));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// DELETE
export const deleteGlobalStore =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      await globalStoreApi.delete(id);
      dispatch(deleteSuccess(id));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };
