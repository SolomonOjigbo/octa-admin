// src/core/redux/slices/invoice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Invoice } from "../types/invoice";
import { invoiceApi } from "../apis/invoice";

interface InvoiceState {
  loading: boolean;
  error: string | null;
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
}

const initialState: InvoiceState = {
  loading: false,
  error: null,
  invoices: [],
  selectedInvoice: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
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
    getAllSuccess(state, action: PayloadAction<Invoice[]>) {
      state.loading = false;
      state.invoices = action.payload;
    },
    getOneSuccess(state, action: PayloadAction<Invoice>) {
      state.loading = false;
      state.selectedInvoice = action.payload;
    },
    createSuccess(state, action: PayloadAction<Invoice>) {
      state.loading = false;
      state.invoices.push(action.payload);
    },
    updateSuccess(state, action: PayloadAction<Invoice>) {
      const updated = action.payload;
      state.invoices = state.invoices.map(inv =>
        inv.id === updated.id ? { ...inv, ...updated } : inv
      );
      if (state.selectedInvoice?.id === updated.id) {
        state.selectedInvoice = { ...state.selectedInvoice, ...updated };
      }
      state.loading = false;
    },
    deleteSuccess(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.invoices = state.invoices.filter(inv => inv.id !== id);
      if (state.selectedInvoice?.id === id) {
        state.selectedInvoice = null;
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
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

// ======================
// ASYNC ACTIONS
// ======================

export const fetchInvoices = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const data = await invoiceApi.getAll();
    dispatch(getAllSuccess(data));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

export const fetchInvoiceById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const invoice = await invoiceApi.getById(id);
    dispatch(getOneSuccess(invoice));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

export const fetchInvoicesByTenant = (tenantId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const data = await invoiceApi.getByTenant(tenantId);
    dispatch(getAllSuccess(data));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

export const fetchInvoicesByCustomer = (customerId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const data = await invoiceApi.getByCustomer(customerId);
    dispatch(getAllSuccess(data));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

export const fetchInvoicesBySupplier = (supplierId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const data = await invoiceApi.getBySupplier(supplierId);
    dispatch(getAllSuccess(data));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

export const createInvoice = (dto: Partial<Invoice>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const created = await invoiceApi.create(dto);
    dispatch(createSuccess(created));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

export const updateInvoice = (id: string, dto: Partial<Invoice>) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    const updated = await invoiceApi.update(id, dto);
    dispatch(updateSuccess(updated));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};

export const deleteInvoice = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    await invoiceApi.delete(id);
    dispatch(deleteSuccess(id));
  } catch (e: any) {
    dispatch(requestFail(e.message));
  }
};
