// src/feature-module/global-category/globalCategory.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import {
    GlobalCategory,
} from "../types/globalCategory";
import { globalCategoryApi } from "../apis/globalCategory";

interface CategoryState {
    loading: boolean;
    error: string | null;
    categories: GlobalCategory[];
    selectedCategory: GlobalCategory | null;
}

const initialState: CategoryState = {
    loading: false,
    error: null,
    categories: [],
    selectedCategory: null,
};

const categorySlice = createSlice({
    name: "globalCategory",
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
        getAllSuccess(state, action: PayloadAction<GlobalCategory[]>) {
            state.loading = false;
            state.categories = action.payload;
        },
        getOneSuccess(state, action: PayloadAction<GlobalCategory>) {
            state.loading = false;
            state.selectedCategory = action.payload;
        },
        // CREATE CATEGORY
        createSuccess(state, action: PayloadAction<GlobalCategory>) {
            state.loading = false;
            state.categories.push(action.payload);
        },

        // UPDATE CATEGORY
        updateSuccess: (state, action: PayloadAction<GlobalCategory>) => {
            const updatedCategory = action.payload;
            const index = state.categories.findIndex(cat => cat.id === updatedCategory.id);
            if (index !== -1) {
                state.categories[index] = updatedCategory;
            }
        },
        // DELETE CATEGORY
        deleteSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.categories = state.categories.filter(
                (cat) => cat.id !== action.payload
            );
            // If the deleted category was selected, clear it
            if (state.selectedCategory?.id === action.payload) {
                state.selectedCategory = null;
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
} = categorySlice.actions;

export default categorySlice.reducer;

// ====== ASYNC ACTIONS ======

export const fetchGlobalCategories = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(requestStart());
        const res = await globalCategoryApi.getAll();
        dispatch(getAllSuccess(res.data));
    } catch (e: any) {
        dispatch(requestFail(e.message));
    }
};

export const fetchGlobalCategoryById =
    (id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            const category = await globalCategoryApi.getById(id);
            dispatch(getOneSuccess(category));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };

// CREATE
export const createGlobalCategory =
    (dto: Partial<GlobalCategory>) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            const created = await globalCategoryApi.create(dto);
            dispatch(createSuccess(created));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };

// UPDATE
export const updateGlobalCategoryold =
    (id: string, dto: GlobalCategory) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(requestStart());
                const updated = await globalCategoryApi.update(id, dto);
                dispatch(updateSuccess(updated));
            } catch (e: any) {
                dispatch(requestFail(e.message));
            }
        };
export const updateGlobalCategory =
    (id: string, data: Partial<GlobalCategory>) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            const updated = await globalCategoryApi.update(id, data);
            //dispatch(getOneSuccess(updated));
            dispatch(updateSuccess(updated));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };


// DELETE
export const deleteGlobalCategory =
    (id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(requestStart());
            await globalCategoryApi.delete(id);
            dispatch(deleteSuccess(id));
        } catch (e: any) {
            dispatch(requestFail(e.message));
        }
    };