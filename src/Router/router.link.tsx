import React from "react";
import { Route, Navigate } from "react-router-dom";


//NEW SETUP ROUTE
import Signin from "../pages/login/signin";
import SideLogout from "../core/json/SideLogout";
import Forgotpassword from "../pages/forgotpassword/forgotpassword";
import Register from "../pages/register/register";
import Customers from "../pages/dashboard/customers/customers";
import Tenants from "../pages/dashboard/tenant/tenant";
import Tenant360 from "../feature-module/tenants/Tenant360";
import RequireSuperAdmin from "./RequireSuperAdmin";
import Profile from "../pages/dashboard/profile";

import ProductList from "../pages/dashboard/products/productlist"; 
import AddProduct from "../pages/dashboard/products/addproduct";
import ProductDetail from "../pages/dashboard/products/productdetail";
import EditProduct from "../pages/dashboard/products/editproduct";

import CategoryList from "../pages/dashboard/category/categorylist";

import BrandList from "../pages/dashboard/brands/brandlist";

import StoreList from "../pages/dashboard/stores/storelist";

import GeneralSettings from "../pages/dashboard/settings/generalsettings/generalsettings";
import SecuritySettings from "../pages/dashboard/settings/generalsettings/securitysettings";
import Notification from "../feature-module/settings/generalsettings/notification";
import ConnectedApps from "../feature-module/settings/generalsettings/connectedapps";
import SystemSettings from "../pages/dashboard/settings/websitesettings/systemsettings";
import CompanySettings from "../pages/dashboard/settings/websitesettings/companysettings";
import LocalizationSettings from "../pages/dashboard/settings/websitesettings/localizationsettings";
import Prefixes from "../feature-module/settings/websitesettings/prefixes";
import Preference from "../feature-module/settings/websitesettings/preference";
import BanIpaddress from "../feature-module/settings/othersettings/ban-ipaddress";
import StorageSettings from "../feature-module/settings/othersettings/storagesettings";

import Appearance from "../feature-module/settings/websitesettings/appearance";
import SocialAuthentication from "../feature-module/settings/websitesettings/socialauthentication";
import LanguageSettings from "../feature-module/settings/websitesettings/languagesettings";
import InvoiceSettings from "../feature-module/settings/appsetting/invoicesettings";
import PrinterSettings from "../feature-module/settings/appsetting/printersettings";
import PosSettings from "../feature-module/settings/websitesettings/possettings";
import CustomFields from "../feature-module/settings/websitesettings/customfields";
import EmailSettings from "../feature-module/settings/systemsettings/emailsettings";
import SmsGateway from "../feature-module/settings/systemsettings/smsgateway";
import OtpSettings from "../feature-module/settings/systemsettings/otpsettings";
import GdprSettings from "../feature-module/settings/systemsettings/gdprsettings";
import PaymentGateway from "../feature-module/settings/financialsettings/paymentgateway";
import BankSetting from "../feature-module/settings/financialsettings/banksetting";
import TaxRates from "../feature-module/settings/financialsettings/taxrates";
import CurrencySettings from "../feature-module/settings/financialsettings/currencysettings";
//*********************************************************

//OTHER ROUTES 
import SigninTwo from "../feature-module/pages/login/signinTwo";
import SigninThree from "../feature-module/pages/login/signinThree";
import RegisterTwo from "../feature-module/pages/register/registerTwo";
import RegisterThree from "../feature-module/pages/register/registerThree";
import ForgotpasswordTwo from "../feature-module/pages/forgotpassword/forgotpasswordTwo";
import ForgotpasswordThree from "../feature-module/pages/forgotpassword/forgotpasswordThree";


// END OTHER ROUTES
import Dashboard from "../feature-module/dashboard/Dashboard";

// import ProductList from "../feature-module/inventory/products/productlist"; 
// import AddProduct from "../feature-module/inventory/products/addproduct";

import SalesDashbaord from "../feature-module/dashboard/salesdashbaord";
// import BrandList from "../feature-module/inventory/brandlist";
import VariantAttributes from "../feature-module/inventory/variantattributes";
import Warranty from "../feature-module/inventory/warranty";
import PrintBarcode from "../feature-module/inventory/printbarcode";



const routes = all_routes;

// import Chats from "../feature-module/Application/chat";
import ExpensesList from "../feature-module/FinanceAccounts/expenseslist";
import ExpenseCategory from "../feature-module/FinanceAccounts/expensecategory";
import ExpiredProduct from "../feature-module/inventory/expiredproduct";
import LowStock from "../feature-module/inventory/lowstock";
// import CategoryList from "../feature-module/inventory/categorylist";
import SubCategories from "../feature-module/inventory/subcategories";
// import EditProduct from "../feature-module/inventory/products/editproduct";
// import Videocall from "../feature-module/Application/videocall";
import QRcode from "../feature-module/inventory/qrcode";
import PurchaseOrderReport from "../feature-module/purchases/purchaseorderreport";
import PurchaseReturns from "../feature-module/purchases/purchasereturns";
// import Appearance from "../feature-module/settings/websitesettings/appearance";
// import SocialAuthentication from "../feature-module/settings/websitesettings/socialauthentication";
// import LanguageSettings from "../feature-module/settings/websitesettings/languagesettings";
// import InvoiceSettings from "../feature-module/settings/appsetting/invoicesettings";
// import PrinterSettings from "../feature-module/settings/appsetting/printersettings";
// import PosSettings from "../feature-module/settings/websitesettings/possettings";
// import CustomFields from "../feature-module/settings/websitesettings/customfields";
// import EmailSettings from "../feature-module/settings/systemsettings/emailsettings";
// import SmsGateway from "../feature-module/settings/systemsettings/smsgateway";
// import OtpSettings from "../feature-module/settings/systemsettings/otpsettings";
// import GdprSettings from "../feature-module/settings/systemsettings/gdprsettings";
// import PaymentGateway from "../feature-module/settings/financialsettings/paymentgateway";
// import BankSetting from "../feature-module/settings/financialsettings/banksetting";
//import Customers from "../feature-module/people/customers";
import Variants from "../feature-module/inventory/variants/variant";
import Suppliers from "../feature-module/people/suppliers";
// import StoreList from "../core/modals/peoples/storelist";
import StockAdjustment from "../feature-module/stock/stockAdjustment";
import Invoicereport from "../feature-module/Reports/invoice/invoicereport";
// Live cross-tenant reports (replace the empty template shells).
import {
  AnalyticsDashboard, SalesReport, PurchaseReport, InventoryReport,
  SupplierReport, CustomerReport, ExpenseReport, IncomeReport, TaxReport, ProfitLoss,
} from "../feature-module/admin/reports";
// import GeneralSettings from "../feature-module/settings/generalsettings/generalsettings";
// import SecuritySettings from "../feature-module/settings/generalsettings/securitysettings";
// import Notification from "../feature-module/settings/generalsettings/notification";
// import ConnectedApps from "../feature-module/settings/generalsettings/connectedapps";
// import SystemSettings from "../feature-module/settings/websitesettings/systemsettings";
// import CompanySettings from "../feature-module/settings/websitesettings/companysettings";
// import LocalizationSettings from "../feature-module/settings/websitesettings/localizationsettings";
// import Prefixes from "../feature-module/settings/websitesettings/prefixes";
// import Preference from "../feature-module/settings/websitesettings/preference";
// import BanIpaddress from "../feature-module/settings/othersettings/ban-ipaddress";
// import StorageSettings from "../feature-module/settings/othersettings/storagesettings";
import SalesList from "../feature-module/sales/saleslist";
import InvoiceReport from "../feature-module/sales/invoicereport";
import SalesReturn from "../feature-module/sales/salesreturn";
//import Profile from "../feature-module/pages/profile";


import Resetpassword from "../feature-module/pages/resetpassword/resetpassword";
import ResetpasswordTwo from "../feature-module/pages/resetpassword/resetpasswordTwo";
import ResetpasswordThree from "../feature-module/pages/resetpassword/resetpasswordThree";
import EmailVerification from "../feature-module/pages/emailverification/emailverification";
import EmailverificationTwo from "../feature-module/pages/emailverification/emailverificationTwo";
import EmailverificationThree from "../feature-module/pages/emailverification/emailverificationThree";
import Twostepverification from "../feature-module/pages/twostepverification/twostepverification";
import TwostepverificationTwo from "../feature-module/pages/twostepverification/twostepverificationTwo";
import TwostepverificationThree from "../feature-module/pages/twostepverification/twostepverificationThree";
import Lockscreen from "../feature-module/pages/lockscreen";
import Error404 from "../feature-module/pages/errorpages/error404";
import Error500 from "../feature-module/pages/errorpages/error500";
import Blankpage from "../feature-module/pages/blankpage";
import Comingsoon from "../feature-module/pages/comingsoon";
import Undermaintainence from "../feature-module/pages/undermaintainence";
import Users from "../feature-module/usermanagement/users";
import RolesPermissions from "../feature-module/usermanagement/RolesPermissions";
import Sessions from "../feature-module/usermanagement/Sessions";
import BusinessEntities from "../feature-module/admin/BusinessEntities";
import PlatformSettings from "../feature-module/admin/PlatformSettings";
import ProductSuppliers from "../feature-module/admin/ProductSuppliers";
import Barcodes from "../feature-module/admin/Barcodes";
import B2bConnections from "../feature-module/admin/B2bConnections";
import AdminWarehouses from "../feature-module/admin/Warehouses";
import TenantCatalog from "../feature-module/admin/TenantCatalog";
import AuditLogs from "../feature-module/admin/AuditLogs";
import {
  Transactions, Payments, PosSessions, Stock, InventoryMovements,
  StockTransfers, Quotations, PurchaseOrders,
} from "../feature-module/admin/operations";
import Permissions from "../feature-module/usermanagement/permissions";
import DeleteAccount from "../feature-module/usermanagement/deleteaccount";
// import ProductDetail from "../feature-module/inventory/products/productdetail";
import { Units } from "../feature-module/inventory/units";
// import TaxRates from "../feature-module/settings/financialsettings/taxrates";
// import CurrencySettings from "../feature-module/settings/financialsettings/currencysettings";
import Coupons from "../feature-module/coupons/coupons";
import { all_routes } from "./all_routes";
export const publicRoutes = [
  {
    id: 1,
    path: routes.dashboard,
    name: "home",
    element: <Dashboard />,
    route: Route,
  },
  {
    id: 2,
    path: routes.productlist,
    name: "products",
    element: <ProductList />,
    route: Route,
  },
  {
    id: 3,
    path: routes.addproduct,
    name: "products",
    element: <AddProduct />,
    route: Route,
  },
  {
    id: 4,
    path: routes.salesdashboard,
    name: "salesdashboard",
    element: <SalesDashbaord />,
    route: Route,
  },
  {
    id: 5,
    path: routes.brandlist,
    name: "brant",
    element: <BrandList />,
    route: Route,
  },
  {
    id: 6,
    path: routes.units,
    name: "unit",
    element: <Units />,
    route: Route,
  },
  {
    id: 7,
    path: routes.variantyattributes,
    name: "variantyattributes",
    element: <VariantAttributes />,
    route: Route,
  },
  {
    id: 8,
    path: routes.warranty,
    name: "warranty",
    element: <Warranty />,
    route: Route,
  },
  {
    id: 9,
    path: routes.barcode,
    name: "barcode",
    element: <PrintBarcode />,
    route: Route,
  },







  // {
  //   id: 60,
  //   path: routes.chat,
  //   name: "chat",
  //   element: <Chats />,
  //   route: Route,
  // },
  {
    id: 58,
    path: routes.expiredproduct,
    name: "expiredproduct",
    element: <ExpiredProduct />,
    route: Route,
  },
  {
    id: 59,
    path: routes.lowstock,
    name: "lowstock",
    element: <LowStock />,
    route: Route,
  },
  {
    id: 60,
    path: routes.categorylist,
    name: "categorylist",
    element: <CategoryList />,
    route: Route,
  },
  {
    id: 61,
    path: routes.expenselist,
    name: "expenselist",
    element: <ExpensesList />,
    route: Route,
  },
  {
    id: 62,
    path: routes.expensecategory,
    name: "expensecategory",
    element: <ExpenseCategory />,
    route: Route,
  },

  {
    id: 64,
    path: routes.subcategories,
    name: "subcategories",
    element: <SubCategories />,
    route: Route,
  },
  {
    id: 65,
    path: routes.editproduct,
    name: "editproduct",
    element: <EditProduct />,
    route: Route,
  },
  // {
  //   id: 63,
  //   path: routes.videocall,
  //   name: "videocall",
  //   element: <Videocall />,
  //   route: Route,
  // },
  {
    id: 66,
    path: routes.variantattributes,
    name: "variantattributes",
    element: <VariantAttributes />,
    route: Route,
  },
  {
    id: 67,
    path: routes.qrcode,
    name: "qrcode",
    element: <QRcode />,
    route: Route,
  },
  {
    id: 68,
    path: routes.purchaselist,
    name: "purchaselist",
    element: (<RequireSuperAdmin><PurchaseOrders /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 69,
    path: routes.purchaseorderreport,
    name: "purchaseorderreport",
    element: <PurchaseOrderReport />,
    route: Route,
  },
  {
    id: 70,
    path: routes.purchasereturn,
    name: "purchasereturn",
    element: <PurchaseReturns />,
    route: Route,
  },
  {
    id: 71,
    path: routes.appearance,
    name: "appearance",
    element: <Appearance />,
    route: Route,
  },
  {
    id: 72,
    path: routes.socialauthendication,
    name: "socialauthendication",
    element: <SocialAuthentication />,
    route: Route,
  },
  {
    id: 73,
    path: routes.languagesettings,
    name: "languagesettings",
    element: <LanguageSettings />,
    route: Route,
  },
  {
    id: 74,
    path: routes.invoicesettings,
    name: "invoicesettings",
    element: <InvoiceSettings />,
    route: Route,
  },
  {
    id: 75,
    path: routes.printersettings,
    name: "printersettings",
    element: <PrinterSettings />,
    route: Route,
  },
  {
    id: 76,
    path: routes.possettings,
    name: "possettings",
    element: <PosSettings />,
    route: Route,
  },
  {
    id: 77,
    path: routes.customfields,
    name: "customfields",
    element: <CustomFields />,
    route: Route,
  },
  {
    id: 78,
    path: routes.emailsettings,
    name: "emailsettings",
    element: <EmailSettings />,
    route: Route,
  },
  {
    id: 79,
    path: routes.smssettings,
    name: "smssettings",
    element: <SmsGateway />,
    route: Route,
  },
  {
    id: 80,
    path: routes.otpsettings,
    name: "otpsettings",
    element: <OtpSettings />,
    route: Route,
  },
  {
    id: 81,
    path: routes.gdbrsettings,
    name: "gdbrsettings",
    element: <GdprSettings />,
    route: Route,
  },
  {
    id: 82,
    path: routes.paymentgateway,
    name: "paymentgateway",
    element: <PaymentGateway />,
    route: Route,
  },
  {
    id: 83,
    path: routes.banksettingslist,
    name: "banksettingslist",
    element: <BankSetting />,
    route: Route,
  },
  {
    id: 84,
    path: routes.customers,
    name: "customers",
    element: <Customers />,
    route: Route,
  },
  {
    id: 85,
    path: routes.suppliers,
    name: "suppliers",
    element: <Suppliers />,
    route: Route,
  },
  {
    id: 86,
    path: routes.storelist,
    name: "storelist",
    element: <StoreList />,
    route: Route,
  },
  {
    id: 87,
    path: routes.managestock,
    name: "managestock",
    element: (<RequireSuperAdmin><Stock /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 88,
    path: routes.stockadjustment,
    name: "stockadjustment",
    element: <StockAdjustment />,
    route: Route,
  },
  {
    id: 89,
    path: routes.stocktransfer,
    name: "stocktransfer",
    element: (<RequireSuperAdmin><StockTransfers /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 90,
    path: routes.salesreport,
    name: "salesreport",
    element: <SalesReport />,
    route: Route,
  },
  {
    id: 91,
    path: routes.purchasereport,
    name: "purchasereport",
    element: <PurchaseReport />,
    route: Route,
  },
  {
    id: 92,
    path: routes.inventoryreport,
    name: "inventoryreport",
    element: <InventoryReport />,
    route: Route,
  },
  {
    id: 93,
    path: routes.invoicereport,
    name: "invoicereport",
    element: <Invoicereport />,
    route: Route,
  },
  {
    id: 94,
    path: routes.supplierreport,
    name: "supplierreport",
    element: <SupplierReport />,
    route: Route,
  },
  {
    id: 95,
    path: routes.customerreport,
    name: "customerreport",
    element: <CustomerReport />,
    route: Route,
  },
  {
    id: 96,
    path: routes.expensereport,
    name: "expensereport",
    element: <ExpenseReport />,
    route: Route,
  },
  {
    id: 97,
    path: routes.incomereport,
    name: "incomereport",
    element: <IncomeReport />,
    route: Route,
  },
  {
    id: 98,
    path: routes.taxreport,
    name: "taxreport",
    element: <TaxReport />,
    route: Route,
  },
  {
    id: 99,
    path: routes.profitloss,
    name: "profitloss",
    element: <ProfitLoss />,
    route: Route,
  },
  {
    id: 89,
    path: routes.generalsettings,
    name: "generalsettings",
    element: <GeneralSettings />,
    route: Route,
  },
  {
    id: 90,
    path: routes.securitysettings,
    name: "securitysettings",
    element: <SecuritySettings />,
    route: Route,
  },
  {
    id: 91,
    path: routes.notification,
    name: "notification",
    element: <Notification />,
    route: Route,
  },
  {
    id: 92,
    path: routes.connectedapps,
    name: "connectedapps",
    element: <ConnectedApps />,
    route: Route,
  },
  {
    id: 93,
    path: routes.systemsettings,
    name: "systemsettings",
    element: <SystemSettings />,
    route: Route,
  },
  {
    id: 94,
    path: routes.companysettings,
    name: "companysettings",
    element: <CompanySettings />,
    route: Route,
  },
  {
    id: 94,
    path: routes.localizationsettings,
    name: "localizationsettings",
    element: <LocalizationSettings />,
    route: Route,
  },
  {
    id: 95,
    path: routes.prefixes,
    name: "prefixes",
    element: <Prefixes />,
    route: Route,
  },
  {
    id: 99,
    path: routes.preference,
    name: "preference",
    element: <Preference />,
    route: Route,
  },
  {
    id: 99,
    path: routes.banipaddress,
    name: "banipaddress",
    element: <BanIpaddress />,
    route: Route,
  },
  {
    id: 99,
    path: routes.storagesettings,
    name: "storagesettings",
    element: <StorageSettings />,
    route: Route,
  },
  {
    id: 99,
    path: routes.taxrates,
    name: "taxrates",
    element: <TaxRates />,
    route: Route,
  },
  {
    id: 99,
    path: routes.currencysettings,
    name: "currencysettings",
    element: <CurrencySettings />,
    route: Route,
  },
  {
    id: 102,
    path: routes.saleslist,
    name: "saleslist",
    element: <SalesList />,
    route: Route,
  },
  {
    id: 102,
    path: routes.invoicereport,
    name: "invoicereport",
    element: <InvoiceReport />,
    route: Route,
  },
  {
    id: 102,
    path: routes.salesreturn,
    name: "salesreturn",
    element: <SalesReturn />,
    route: Route,
  },
  {
    id: 103,
    path: routes.quotationlist,
    name: "quotationlist",
    element: (<RequireSuperAdmin><Quotations /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 106,
    path: routes.profile,
    name: "profile",
    element: <Profile />,
    route: Route,
  },
  {
    id: 20,
    path: routes.blankpage,
    name: "blankpage",
    element: <Blankpage />,
    route: Route,
  },
  {
    id: 104,
    path: routes.users,
    name: "users",
    element: <Users />,
    route: Route,
  },
  {
    id: 105,
    path: routes.rolespermission,
    name: "rolespermission",
    element: (
      <RequireSuperAdmin>
        <RolesPermissions />
      </RequireSuperAdmin>
    ),
    route: Route,
  },
  {
    id: 121,
    path: routes.sessions,
    name: "sessions",
    element: (
      <RequireSuperAdmin>
        <Sessions />
      </RequireSuperAdmin>
    ),
    route: Route,
  },
  {
    id: 122,
    path: routes.businessentities,
    name: "businessentities",
    element: (<RequireSuperAdmin><BusinessEntities /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 123,
    path: routes.platformsettings,
    name: "platformsettings",
    element: (<RequireSuperAdmin><PlatformSettings /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 124,
    path: routes.productsuppliers,
    name: "productsuppliers",
    element: (<RequireSuperAdmin><ProductSuppliers /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 125,
    path: routes.barcodes,
    name: "barcodes",
    element: (<RequireSuperAdmin><Barcodes /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 126,
    path: routes.b2bconnections,
    name: "b2bconnections",
    element: (<RequireSuperAdmin><B2bConnections /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 127,
    path: routes.tenantcatalog,
    name: "tenantcatalog",
    element: (<RequireSuperAdmin><TenantCatalog /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 128,
    path: routes.transactions,
    name: "transactions",
    element: (<RequireSuperAdmin><Transactions /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 129,
    path: routes.payments,
    name: "payments",
    element: (<RequireSuperAdmin><Payments /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 130,
    path: routes.possessions,
    name: "possessions",
    element: (<RequireSuperAdmin><PosSessions /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 131,
    path: routes.inventorymovements,
    name: "inventorymovements",
    element: (<RequireSuperAdmin><InventoryMovements /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 132,
    path: routes.auditlogs,
    name: "auditlogs",
    element: (<RequireSuperAdmin><AuditLogs /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 133,
    path: routes.analytics,
    name: "analytics",
    element: (<RequireSuperAdmin><AnalyticsDashboard /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 106,
    path: routes.permissions,
    name: "permissions",
    element: <Permissions />,
    route: Route,
  },
  {
    id: 107,
    path: routes.deleteaccount,
    name: "deleteaccount",
    element: <DeleteAccount />,
    route: Route,
  },
  {
    id: 113,
    path: routes.productdetails,
    name: "productdetails",
    element: <ProductDetail />,
    route: Route,
  },
  {
    id: 114,
    path: routes.warehouses,
    name: "warehouses",
    element: (<RequireSuperAdmin><AdminWarehouses /></RequireSuperAdmin>),
    route: Route,
  },
  {
    id: 114,
    path: routes.coupons,
    name: "coupons",
    element: <Coupons />,
    route: Route,
  },
  {
    id: 115,
    path: "/",
    name: "Root",
    element: <Navigate to="/" />,
    route: Route,
  },
  {
    id: 116,
    path: "*",
    name: "NotFound",
    element: <Navigate to="/" />,
    route: Route,
  },
    {
    id: 117,
    path: routes.variants,
    name: "variants",
    element: <Variants />,
    route: Route,
  },
      {
    id: 118,
    path: "/logout",
    name: "variants",
    element: <SideLogout  />,
    route: Route,
  },
    {
    id: 119,
    path: routes.tenants,
    name: "tenants",
    element: <Tenants />,
    route: Route,
  },
  {
    id: 120,
    path: "/tenants/:id/360",
    name: "tenant360",
    element: (
      <RequireSuperAdmin>
        <Tenant360 />
      </RequireSuperAdmin>
    ),
    route: Route,
  },
];
export const posRoutes = [
];

export const pagesRoute = [
  {
    id: 1,
    path: routes.signin,
    name: "signin",
    element: <Signin />,
    route: Route,
  },
  {
    id: 2,
    path: routes.signintwo,
    name: "signintwo",
    element: <SigninTwo />,
    route: Route,
  },
  {
    id: 3,
    path: routes.signinthree,
    name: "signinthree",
    element: <SigninThree />,
    route: Route,
  },
  {
    id: 4,
    path: routes.register,
    name: "register",
    element: <Register />,
    route: Route,
  },
  {
    id: 5,
    path: routes.registerTwo,
    name: "registerTwo",
    element: <RegisterTwo />,
    route: Route,
  },
  {
    id: 6,
    path: routes.registerThree,
    name: "registerThree",
    element: <RegisterThree />,
    route: Route,
  },
  {
    id: 7,
    path: routes.forgotPassword,
    name: "forgotPassword",
    element: <Forgotpassword />,
    route: Route,
  },
  {
    id: 7,
    path: routes.forgotPasswordTwo,
    name: "forgotPasswordTwo",
    element: <ForgotpasswordTwo />,
    route: Route,
  },
  {
    id: 8,
    path: routes.forgotPasswordThree,
    name: "forgotPasswordThree",
    element: <ForgotpasswordThree />,
    route: Route,
  },
  {
    id: 9,
    path: routes.resetpassword,
    name: "resetpassword",
    element: <Resetpassword />,
    route: Route,
  },
  {
    id: 10,
    path: routes.resetpasswordTwo,
    name: "resetpasswordTwo",
    element: <ResetpasswordTwo />,
    route: Route,
  },
  {
    id: 11,
    path: routes.resetpasswordThree,
    name: "resetpasswordThree",
    element: <ResetpasswordThree />,
    route: Route,
  },
  {
    id: 12,
    path: routes.emailverification,
    name: "emailverification",
    element: <EmailVerification />,
    route: Route,
  },
  {
    id: 12,
    path: routes.emailverificationTwo,
    name: "emailverificationTwo",
    element: <EmailverificationTwo />,
    route: Route,
  },
  {
    id: 13,
    path: routes.emailverificationThree,
    name: "emailverificationThree",
    element: <EmailverificationThree />,
    route: Route,
  },
  {
    id: 14,
    path: routes.twostepverification,
    name: "twostepverification",
    element: <Twostepverification />,
    route: Route,
  },
  {
    id: 15,
    path: routes.twostepverificationTwo,
    name: "twostepverificationTwo",
    element: <TwostepverificationTwo />,
    route: Route,
  },
  {
    id: 16,
    path: routes.twostepverificationThree,
    name: "twostepverificationThree",
    element: <TwostepverificationThree />,
    route: Route,
  },
  {
    id: 17,
    path: routes.lockscreen,
    name: "lockscreen",
    element: <Lockscreen />,
    route: Route,
  },
  {
    id: 18,
    path: routes.error404,
    name: "error404",
    element: <Error404 />,
    route: Route,
  },
  {
    id: 19,
    path: routes.error500,
    name: "error500",
    element: <Error500 />,
    route: Route,
  },
  {
    id: 20,
    path: routes.comingsoon,
    name: "comingsoon",
    element: <Comingsoon />,
    route: Route,
  },
  {
    id: 21,
    path: routes.undermaintenance,
    name: "undermaintenance",
    element: <Undermaintainence />,
    route: Route,
  },
];
