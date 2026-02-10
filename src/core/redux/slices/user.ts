import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { User } from "../types/user";
import { globalUserApi } from "../apis/user";

interface UserState {
  loading: boolean;
  error: string | null;
  users: User[];
  selectedUser: User | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  users: [],
  selectedUser: null,
};

// SORT alphabetically
const sortByName = (arr: User[]) =>
  arr.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));

const userSlice = createSlice({
  name: "user",
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

    getAllSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = sortByName(action.payload);
    },

    getOneSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.selectedUser = action.payload;
    },

    createSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.users.push(action.payload);
      state.users = sortByName(state.users);
    },

    updateSuccess(state, action: PayloadAction<User>) {
      const updated = action.payload;
      state.users = state.users.map((c) =>
        c.id === updated.id ? { ...c, ...updated } : c
      );

      if (state.selectedUser?.id === updated.id) {
        state.selectedUser = { ...state.selectedUser, ...updated };
      }

      state.loading = false;
    },

      upsertUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index >= 0) {
        state.users[index] = action.payload;
      } else {
        state.users.push(action.payload);
      }
      state.users = sortByName(state.users);
      state.loading = false;
    },

    deleteSuccess(state, action: PayloadAction<string>) {
      const id = action.payload;

      state.loading = false;
      state.users = state.users.filter((c) => c.id !== id);

      if (state.selectedUser?.id === id) {
        state.selectedUser = null;
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
  upsertUser
} = userSlice.actions;

export default userSlice.reducer;

// ======================
// ASYNC ACTIONS
// ======================

// FETCH ALL
export const fetchGlobalUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const res = await globalUserApi.getAll();
    dispatch(getAllSuccess(res.users));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

// FETCH BY TENANT
export const fetchUsersByTenant =
  (tenantId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const res = await globalUserApi.getByTenant(tenantId);
      dispatch(getAllSuccess(res.users));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// FETCH ONE
export const fetchGlobalUserById =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const customer = await globalUserApi.getById(id);
      dispatch(getOneSuccess(customer));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// CREATE
export const createGlobalUser =
  (dto: Partial<User>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const created = await globalUserApi.create(dto);
      dispatch(createSuccess(created));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// UPDATE
export const updateGlobalUser =
  (id: string, dto: Partial<User>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const updated = await globalUserApi.update(id, dto);
      dispatch(updateSuccess(updated));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

  // ACTIVATE / DEACTIVATE
export const deactivateUser =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const user = await globalUserApi.deactivate(id);
      dispatch(upsertUser(user));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

export const reactivateUser =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const user = await globalUserApi.reactivate(id);
      dispatch(upsertUser(user));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

  // INVITE
export const inviteUser =
  (dto: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      const user = await globalUserApi.invite(dto);
      dispatch(upsertUser(user));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };

// DELETE
export const deleteGlobalUser =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(requestStart());
      await globalUserApi.delete(id);
      dispatch(deleteSuccess(id));
    } catch (e: any) {
      dispatch(requestFail(e.message));
    }
  };
