import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initial.value";

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<any>) => {
      state.product_list = action.payload;
    },
    setDashboardRecentProduct: (state, action: PayloadAction<any>) => {
      state.dashboard_recentproduct = action.payload;
    },
    setDashboardExpiredProduct: (state, action: PayloadAction<any>) => {
      state.dashboard_expiredproduct = action.payload;
    },
    setSalesDashboardRecentTransaction: (state, action: PayloadAction<any>) => {
      state.saleshdashboard_recenttransaction = action.payload;
    },
    setBrandList: (state, action: PayloadAction<any>) => {
      state.brand_list = action.payload;
    },
    setUnitData: (state, action: PayloadAction<any>) => {
      state.unit_data = action.payload;
    },
    setVariantAttributes: (state, action: PayloadAction<any>) => {
      state.variantattributes_data = action.payload;
    },
    setWarrantyData: (state, action: PayloadAction<any>) => {
      state.warranty_data = action.payload;
    },
    setBarcodeData: (state, action: PayloadAction<any>) => {
      state.barcode_data = action.payload;
    },
    setDepartmentList: (state, action: PayloadAction<any>) => {
      state.departmentlist_data = action.payload;
    },
    setDesignationList: (state, action: PayloadAction<any>) => {
      state.designation_data = action.payload;
    },
    setShiftList: (state, action: PayloadAction<any>) => {
      state.shiftlist_data = action.payload;
    },
    setAttendanceEmployee: (state, action: PayloadAction<any>) => {
      state.attendenceemployee_data = action.payload;
    },
    toggleHeader: (state, action: PayloadAction<boolean>) => {
      state.toggle_header = action.payload;
    },
    setInvoiceReport: (state, action: PayloadAction<any>) => {
      state.invoicereport_data = action.payload;
    },
    setSalesReturns: (state, action: PayloadAction<any>) => {
      state.salesreturns_data = action.payload;
    },
    setQuotationList: (state, action: PayloadAction<any>) => {
      state.quotationlist_data = action.payload;
    },
    setCustomerData: (state, action: PayloadAction<any>) => {
      state.customerdata = action.payload;
    },
    setUserList: (state, action: PayloadAction<any>) => {
      state.userlist_data = action.payload;
    },
    setRolesAndPermission: (state, action: PayloadAction<any>) => {
      state.rolesandpermission_data = action.payload;
    },
    setDeleteAccount: (state, action: PayloadAction<any>) => {
      state.deleteaccount_data = action.payload;
    },
    setAttendanceAdmin: (state, action: PayloadAction<any>) => {
      state.attendanceadmin_data = action.payload;
    },
    setLeavesAdmin: (state, action: PayloadAction<any>) => {
      state.leavesadmin_data = action.payload;
    },
    setLeaveTypes: (state, action: PayloadAction<any>) => {
      state.leavetypes_data = action.payload;
    },
    setHolidayData: (state, action: PayloadAction<any>) => {
      state.holiday_data = action.payload;
    },
    setExpiredProduct: (state, action: PayloadAction<any>) => {
      state.expiredproduct_data = action.payload;
    },
    setLowStock: (state, action: PayloadAction<any>) => {
      state.lowstock_data = action.payload;
    },
    setCategoryList: (state, action: PayloadAction<any>) => {
      state.categotylist_data = action.payload;
    },
    setLayoutStyle: (state, action: PayloadAction<any>) => {
      state.layoutstyledata = action.payload;
    },
  },
});

export const {
  setProductList,
  setDashboardRecentProduct,
  setDashboardExpiredProduct,
  setSalesDashboardRecentTransaction,
  setBrandList,
  setUnitData,
  setVariantAttributes,
  setWarrantyData,
  setBarcodeData,
  setDepartmentList,
  setDesignationList,
  setShiftList,
  setAttendanceEmployee,
  toggleHeader,
  setInvoiceReport,
  setSalesReturns,
  setQuotationList,
  setCustomerData,
  setUserList,
  setRolesAndPermission,
  setDeleteAccount,
  setAttendanceAdmin,
  setLeavesAdmin,
  setLeaveTypes,
  setHolidayData,
  setExpiredProduct,
  setLowStock,
  setCategoryList,
  setLayoutStyle,
} = globalSlice.actions;

export default globalSlice.reducer;
