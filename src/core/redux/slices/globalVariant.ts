// src/core/redux/slices/variant.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { GlobalVariant } from "../types/globalVariant";
import { globalVariantApi } from "../apis/globalVariant";

interface VariantState {
    loading: boolean;
    error: string | null;
    variants: GlobalVariant[];
    selectedVariant: GlobalVariant | null;
}

const initialState: VariantState = {
    loading: false,
    error: null,
    variants: [],
    selectedVariant: null,
};

const sortByName = (arr: GlobalVariant[]) =>
    arr.slice().sort((a, b) => a.name.localeCompare(b.name));

const variantSlice = createSlice({
    name: "variant",
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

        getAllSuccess(state, action: PayloadAction<GlobalVariant[]>) {
            state.loading = false;
            state.variants = sortByName(action.payload);
        },

        getOneSuccess(state, action: PayloadAction<GlobalVariant>) {
            state.loading = false;
            state.selectedVariant = action.payload;
        },

        createSuccess(state, action: PayloadAction<GlobalVariant>) {
            state.loading = false;
            state.variants.push(action.payload);
            state.variants = sortByName(state.variants);
        },

        updateSuccessold(state, action: PayloadAction<GlobalVariant>) {
            const updated = action.payload;

            state.variants = state.variants.map((v) =>
                v.id === updated.id ? { ...v, ...updated } : v
            );

            if (state.selectedVariant?.id === updated.id) {
                state.selectedVariant = { ...state.selectedVariant, ...updated };
            }

            state.loading = false;
        },
        updateSuccess(state, action) {
            const updated = action.payload;

            state.variants = state.variants.map((v) =>
                v.id === updated.id ? { ...v, ...updated } : v
            );

            state.loading = false;
        },

        deleteSuccess(state, action: PayloadAction<string>) {
            const id = action.payload;

            state.variants = state.variants.filter((v) => v.id !== id);

            if (state.selectedVariant?.id === id) {
                state.selectedVariant = null;
            }

            state.loading = false;
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
} = variantSlice.actions;

export default variantSlice.reducer;

// ======================
// ASYNC ACTIONS
// ======================

// FETCH ALL
export const fetchGlobalVariants = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(requestStart());
        const res = await globalVariantApi.getAll();
        dispatch(getAllSuccess(res.data));
    } catch (e: any) {
        dispatch(requestFail(e.message));
    }
};

// FETCH BY ID
export const fetchGlobalVariantById =
    (id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            const variant = await globalVariantApi.getById(id);
            dispatch(getOneSuccess(variant));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };

// FETCH BY PRODUCT
export const fetchVariantsByProduct =
    (globalProductId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            const res = await globalVariantApi.getByProduct(globalProductId);
            dispatch(getAllSuccess(res.data));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };

// CREATE
export const createGlobalVariant =
    (dto: Partial<GlobalVariant>) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            const created = await globalVariantApi.create(dto);
            dispatch(createSuccess(created));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };

// UPDATE
export const updateGlobalVariant =
    (id: string, dto: Partial<GlobalVariant>) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(requestStart());
                const updated = await globalVariantApi.update(id, dto);
                dispatch(updateSuccess(updated));
            } catch (e: any) {
                dispatch(requestFail(e.message));
            }
        };

// DELETE
export const deleteGlobalVariant =
    (id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            await globalVariantApi.delete(id);
            dispatch(deleteSuccess(id));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };
