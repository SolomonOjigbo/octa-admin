import { combineReducers, Reducer } from 'redux';
import globalReducer from "./global"
import statusReducer from "./slices/status";
import authReducer from "./slices/auth";
import globalProductReducer from "./slices/globalProduct";
import globalCategoryReducer from "./slices/globalCategory";
import globalBrandReducer from "./slices/globalBrand";
import globalSupplierReducer from "./slices/globalSupplier";
import  globalVariant from './slices/globalVariant';
import customer from "./slices/customer";
import user from "./slices/user"
import store from "./slices/store"
import invoice from "./slices/invoice"


import initialState from "./initial.value";

const rootReducer = combineReducers({
  status: statusReducer,
  global: globalReducer, 
  auth: authReducer,
  globalProduct: globalProductReducer,
  globalCategory: globalCategoryReducer,
  globalBrand: globalBrandReducer,
  globalSupplier: globalSupplierReducer,
  customer: customer,
  user: user,
  store: store,
  globalVariant: globalVariant,
  invoice: invoice
});

export default rootReducer;
