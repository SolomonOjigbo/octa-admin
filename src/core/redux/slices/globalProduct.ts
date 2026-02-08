// src/feature-module/global-products/globalProduct.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import {
  GlobalProduct,
  CreateGlobalProductDto,
  UpdateGlobalProductDto,
  GlobalProductImportResult,
  ImportResult
} from "../types/globalProduct";
import { globalProductApi, globalProductImportApi } from "../apis/globalProduct";

interface GlobalProductState {
  loading: boolean;
  products: GlobalProduct[];
  selectedProduct: GlobalProduct | null;
  importResult: ImportResult | null;
  //importResult: GlobalProductImportResult | null;
  error: string | null;
}

const initialState: GlobalProductState = {
  loading: false,
  products: [],
  selectedProduct: null,
  importResult: null,
  error: null,
};

const globalProductSlice = createSlice({
  name: "globalProduct",
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

    // GET ALL
    getAllSuccess(state, action: PayloadAction<GlobalProduct[]>) {
      state.loading = false;
      state.products = action.payload;
    },

    // GET ONE
    getOneSuccess(state, action: PayloadAction<GlobalProduct>) {
      state.loading = false;
      state.selectedProduct = action.payload;
    },

    // CREATE
    createSuccess(state, action: PayloadAction<GlobalProduct>) {
      state.loading = false;
      state.products.push(action.payload);
    },

    // UPDATE
    updateSuccess(state, action: PayloadAction<GlobalProduct>) {
      const updated = action.payload;

      state.products = state.products.map((p) =>
        p.id === updated.id ? updated : p
      );

      state.selectedProduct =
        state.selectedProduct?.id === updated.id ? updated : state.selectedProduct;

      state.loading = false;
    },

    // DELETE
    deleteSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    // CSV IMPORT
    importSuccess(state, action: PayloadAction<ImportResult>) {
      state.loading = false;
      state.importResult = action.payload;
      state.error = null;
    },

    resetImportResult(state) {
      state.importResult = null;
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
  importSuccess,
    resetImportResult,
} = globalProductSlice.actions;

export default globalProductSlice.reducer;

//
// ===========================
// ASYNC THUNKS
// ===========================
//

// ------- GET ALL -------
export const fetchGlobalProducts = () => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  try {
    dispatch(requestStart());

    const token =
      getState().auth?.accessToken || localStorage.getItem("accessToken");
    if (!token) return dispatch(requestFail("No access token found"));

    const res = await globalProductApi.getAll(); // already returns { data: Product[] }
    dispatch(getAllSuccess(res.data));
  } catch (e: any) {
    dispatch(requestFail(e.message || "Failed to fetch products"));
  }
};

// ------- GET ONE BY ID -------
export const fetchGlobalProductById =
  (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(requestStart());

        const token =
          getState().auth?.accessToken || localStorage.getItem("accessToken");
        if (!token) return dispatch(requestFail("No access token found"));

        const product = await globalProductApi.getById(id);
        dispatch(getOneSuccess(product));
      } catch (e: any) {
        dispatch(requestFail(e.message || "Failed to fetch product"));
      }
    };

// ------- CREATE -------
export const createGlobalProduct =
  (dto: CreateGlobalProductDto) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(requestStart());

        const token =
          getState().auth?.accessToken || localStorage.getItem("accessToken");
        if (!token) return dispatch(requestFail("No access token found"));

        const created = await globalProductApi.create(dto);
        dispatch(createSuccess(created));
      } catch (e: any) {
        dispatch(requestFail(e.message || "Failed to create product"));
      }
    };

// ------- UPDATE (PARTIAL) -------
export const updateGlobalProduct =
  (id: string, dto: Partial<UpdateGlobalProductDto>) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(requestStart());

        const token =
          getState().auth?.accessToken || localStorage.getItem("accessToken");
        if (!token) return dispatch(requestFail("No access token found"));

        const updated = await globalProductApi.update(id, dto); // partial update
        dispatch(updateSuccess(updated));
      } catch (e: any) {
        dispatch(requestFail(e.message || "Failed to update product"));
      }
    };

// ------- DELETE -------
export const deleteGlobalProduct =
  (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(requestStart());

        const token =
          getState().auth?.accessToken || localStorage.getItem("accessToken");
        if (!token) return dispatch(requestFail("No access token found"));

        await globalProductApi.delete(id);
        dispatch(deleteSuccess(id));
      } catch (e: any) {
        dispatch(requestFail(e.message || "Failed to delete product"));
      }
    };


// ------- IMPORT CSV -------
export const importGlobalProductsCsv =
  (file: File,globalCategoryId: string, brandId?: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(requestStart());

      const token =
        getState().auth?.accessToken ||
        localStorage.getItem("accessToken");

      if (!token) {
        return dispatch(requestFail("No access token found"));
      }

      const result = await globalProductImportApi.importCsv(file,globalCategoryId,brandId);
      dispatch(importSuccess(result));
    } catch (e: any) {
      dispatch(
        requestFail(e.message || "Failed to import products")
      );
    }
  };

