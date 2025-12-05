// src/feature-module/global-brand/globalBrand.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { GlobalBrand } from "../types/globalBrand";
import { globalBrandApi } from "../apis/globalBrand";

interface BrandState {
  loading: boolean;
  error: string | null;
  brands: GlobalBrand[];
  selectedBrand: GlobalBrand | null;
}

const initialState: BrandState = {
  loading: false,
  error: null,
  brands: [],
  selectedBrand: null,
};

const brandSlice = createSlice({
  name: "globalBrand",
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

    getAllSuccess(state, action: PayloadAction<GlobalBrand[]>) {
      state.loading = false;
      state.brands = action.payload;
    },

    getOneSuccess(state, action: PayloadAction<GlobalBrand>) {
      state.loading = false;
      state.selectedBrand = action.payload;
    },

    createSuccess(state, action: PayloadAction<GlobalBrand>) {
      state.loading = false;
      state.brands.push(action.payload);
    },

    updateSuccess(state, action: PayloadAction<GlobalBrand>) {
      const updated = action.payload;

      state.brands = state.brands.map((b) =>
        b.id === updated.id ? updated : b
      );

      state.selectedBrand =
        state.selectedBrand?.id === updated.id ? updated : state.selectedBrand;

      state.loading = false;
    },

    deleteSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.brands = state.brands.filter((b) => b.id !== action.payload);

      if (state.selectedBrand?.id === action.payload) {
        state.selectedBrand = null;
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
} = brandSlice.actions;

export default brandSlice.reducer;


// FETCH ALL
export const fetchGlobalBrands = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const res = await globalBrandApi.getAll();
    dispatch(getAllSuccess(res.data));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

// FETCH ONE
export const fetchGlobalBrandById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const brand = await globalBrandApi.getById(id);
      dispatch(getOneSuccess(brand));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// CREATE
export const createGlobalBrand =
  (dto: Partial<GlobalBrand>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const created = await globalBrandApi.create(dto);
      dispatch(createSuccess(created));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// UPDATE (Partial)
export const updateGlobalBrand =
  (id: string, dto: Partial<GlobalBrand>) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const updated = await globalBrandApi.update(id, dto);
      dispatch(updateSuccess(updated));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// DELETE
export const deleteGlobalBrand =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      await globalBrandApi.delete(id);
      dispatch(deleteSuccess(id));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };
