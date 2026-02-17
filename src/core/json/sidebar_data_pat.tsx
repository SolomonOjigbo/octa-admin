import React from 'react';

import * as Icon from 'react-feather';
import * as Feather from "react-feather";
export const icon = (name: string) => {
  const IconComponent = (Feather as Record<string, React.ComponentType<any>>)[name];
  return IconComponent ? <IconComponent /> : null;
};
const item = (
  label: string,
  link: string | null = null,
  iconName: string | null = null,
  options: {
    submenu?: boolean;
    showSubRoute?: boolean;
    submenuItems?: any[];
  } = {}
) => ({
  label,
  link,
  icon: iconName ? icon(iconName) : null,
  submenu: options.submenu ?? false,
  showSubRoute: options.showSubRoute ?? false,
  submenuItems: options.submenuItems || [],
});

const section = (
  label: string,
  submenuItems: any[],
  options: {
    submenuOpen?: boolean;
    showSubRoute?: boolean;
    submenuHdr?: string;
  } = {}
) => ({
  label,
  submenuOpen: options.submenuOpen ?? true,
  showSubRoute: options.showSubRoute ?? false,
  submenuHdr: options.submenuHdr ?? label,
  submenuItems,
});


export const SidebarDataPat = [

  section("Main", [
    item("Dashboard", "/", "Grid", {
      submenu: true,
      submenuItems: [
        item("Admin Dashboard", "/"),
        item("Sales Dashboard", "/sales-dashboard"),
      ]
    }),

  //   item("Application", "/", "Smartphone", {
  //     submenu: true,
  //     submenuItems: [
  //       item("Chat", "/chat"),
  //       item("Call", null, null, {
  //         submenu: true,
  //         submenuItems: [
  //           item("Video Call", "/video-call"),
  //           item("Audio Call", "/audio-call"),
  //           item("Call History", "/call-history")
  //         ]
  //       }),
  //       item("Calendar", "/calendar"),
  //       item("Email", "/email"),
  //       item("To Do", "/todo"),
  //       item("Notes", "/notes"),
  //       item("File Manager", "/file-manager"),
  //     ]
  //   }
  // )
  ]),

  section("Inventory", [
    item("Products", "/product-list", "Box"),
    item("Create Product", "/add-product", "PlusSquare"),
    item("Expired Products", "/expired-products", "Codesandbox"),
    item("Low Stocks", "/low-stocks", "TrendingDown"),
    item("Category", "/category-list", "Codepen"),
    item("Sub Category", "/sub-categories", "Speaker"),
    item("Brands", "/brand-list", "Tag"),
    // item("Units", "/units", "Speaker"),
    item("Variants", "/variants", "Layers"),
    item("Variant Attributes", "/variant-attributes", "Layers"),
    // item("Warranties", "/warranty", "Bookmark"),
    item("Print Barcode", "/barcode", "AlignJustify"),
    item("Print QR Code", "/qrcode", "Maximize")
  ]),

  section("Stock", [
    item("Manage Stock", "/manage-stocks", "Package"),
    item("Stock Adjustment", "/stock-adjustment", "Clipboard"),
    item("Stock Transfer", "/stock-transfer", "Truck"),
  ]),

  section("Sales", [
    item("Sales", "/sales-list", "ShoppingCart"),
    item("Invoices", "/invoice-report", "FileText"),
    item("Sales Return", "/sales-returns", "Copy"),
    item("Quotation", "/quotation-list", "Save"),
    item("POS", "/pos", "HardDrive"),
  ]),

  // section("Promo", [
  //   item("Coupons", "/coupons", "ShoppingCart"),
  // ]),

  section("Purchases", [
    item("Purchases", "/purchase-list", "ShoppingBag"),
    item("Purchase Order", "/purchase-order-report", "FileMinus"),
    item("Purchase Return", "/purchase-returns", "RefreshCw"),
  ]),

  section("Finance & Accounts", [
    item("Expenses", null, "FileText", {
      submenu: true,
      submenuItems: [
        item("Expenses", "/expense-list"),
        item("Expense Category", "/expense-category")
      ]
    }),
  ]),

  section("People", [
    item("Customers", "/customers", "User"),
    item("Suppliers", "/suppliers", "Users"),
    item("Stores", "/store-list", "Home"),
    item("Warehouses", "/warehouse", "Archive"),
  ]),

  // section("HRM", [
  //   item("Employees", "/employees-grid", "Users"),
  //   item("Departments", "/department-grid", "User"),
  //   item("Designations", "/designation", "UserCheck"),
  //   item("Shifts", "/shift", "Shuffle"),

  //   item("Attendance", "#", "Clock", {
  //     submenu: true,
  //     submenuItems: [
  //       item("Employee", "/attendance-employee"),
  //       item("Admin", "/attendance-admin"),
  //     ]
  //   }),

  //   item("Leaves", "#", "Calendar", {
  //     submenu: true,
  //     submenuItems: [
  //       item("Employee Leaves", "/leaves-employee"),
  //       item("Admin Leaves", "/leaves-admin"),
  //       item("Leave Types", "/leave-types"),
  //     ]
  //   }),

  //   item("Holidays", "/holidays", "CreditCard"),

  //   item("Payroll", "#", "DollarSign", {
  //     submenu: true,
  //     submenuItems: [
  //       item("Payslip", "/payslip")
  //     ]
  //   })
  // ]),

  section("Reports", [
    item("Sales Report", "/sales-report", "BarChart2"),
    item("Purchase Report", "/purchase-report", "PieChart"),
    item("Inventory Report", "/inventory-report", "Inbox"),
    item("Invoice Report", "/invoice-report", "File"),
    item("Supplier Report", "/supplier-report", "UserCheck"),
    item("Customer Report", "/customer-report", "User"),
    item("Expense Report", "/expense-report", "FileText"),
    item("Income Report", "/income-report", "BarChart"),
    item("Tax Report", "/tax-report", "Database"),
    item("Profit & Loss", "/profit-loss-report", "TrendingDown"),
  ]),

  section("User Management", [
    item("Users", "/users", "UserCheck"),
    item("Roles & Permissions", "/roles-permissions", "UserCheck"),
    item("Delete Account Request", "/delete-account", "Lock"),
  ]),

  section("Pages", [
    item("Profile", "/profile", "User"),

    // item("Authentication", null, "Shield", {
    //   submenu: true,
    //   submenuItems: [
    //     item("Login", null, null, {
    //       submenu: true,
    //       submenuItems: [
    //         item("Cover", "/signin"),
    //         item("Illustration", "/signin-2"),
    //         item("Basic", "/signin-3")
    //       ]
    //     }),
    //     item("Register", null, null, {
    //       submenu: true,
    //       submenuItems: [
    //         item("Cover", "/register"),
    //         item("Illustration", "/register-2"),
    //         item("Basic", "/register-3")
    //       ]
    //     }),
    //     item("Forgot Password", null, null, {
    //       submenu: true,
    //       submenuItems: [
    //         item("Cover", "/forgot-password"),
    //         item("Illustration", "/forgot-password-2"),
    //         item("Basic", "/forgot-password-3")
    //       ]
    //     }),
    //     item("Reset Password", null, null, {
    //       submenu: true,
    //       submenuItems: [
    //         item("Cover", "/reset-password"),
    //         item("Illustration", "/reset-password-2"),
    //         item("Basic", "/reset-password-3")
    //       ]
    //     }),
    //     item("Email Verification", null, null, {
    //       submenu: true,
    //       submenuItems: [
    //         item("Cover", "/email-verification"),
    //         item("Illustration", "/email-verification-2"),
    //         item("Basic", "/email-verification-3")
    //       ]
    //     }),
    //     item("2 Step Verification", null, null, {
    //       submenu: true,
    //       submenuItems: [
    //         item("Cover", "/two-step-verification"),
    //         item("Illustration", "/two-step-verification-2"),
    //         item("Basic", "/two-step-verification-3")
    //       ]
    //     }),
    //     item("Lock Screen", "/lock-screen"),
    //   ]
    // }),

    item("Error Pages", null, "FileMinus", {
      submenu: true,
      submenuItems: [
        item("404 Error", "/error-404"),
        item("500 Error", "/error-500"),
      ]
    }),

    // item("Blank Page", "/blank-page", "File"),
    item("Coming Soon", "/coming-soon", "Send"),
    item("Under Maintenance", "/under-maintenance", "AlertTriangle"),
  ]),

  section("Settings", [
    item("General Settings", null, "Settings", {
      submenu: true,
      submenuItems: [
        item("Profile", "/general-settings"),
        item("Security", "/security-settings"),
        item("Notifications", "/notification"),
        item("Connected Apps", "/connected-apps")
      ]
    }),

    item("Website Settings", null, "Globe", {
      submenu: true,
      submenuItems: [
        item("System Settings", "/system-settings"),
        item("Company Settings", "/company-settings"),
        item("Localization", "/localization-settings"),
        item("Prefixes", "/prefixes"),
        item("Preference", "/preference"),
        item("Appearance", "/appearance"),
        item("Social Authentication", "/social-authentication"),
        item("Language", "/language-settings")
      ]
    }),

    item("App Settings", null, "Smartphone", {
      submenu: true,
      submenuItems: [
        item("Invoice", "/invoice-settings"),
        item("Printer", "/printer-settings"),
        item("POS", "/pos-settings"),
        item("Custom Fields", "/custom-fields"),
      ]
    }),

    item("System Settings", null, "Monitor", {
      submenu: true,
      submenuItems: [
        item("Email", "/email-settings"),
        item("SMS Gateways", "/sms-gateway"),
        item("OTP", "/otp-settings"),
        item("GDPR Cookies", "/gdpr-settings"),
      ]
    }),

    item("Financial Settings", null, "DollarSign", {
      submenu: true,
      submenuItems: [
        item("Payment Gateway", "/payment-gateway-settings"),
        item("Bank Accounts", "/bank-settings-grid"),
        item("Tax Rates", "/tax-rates"),
        item("Currencies", "/currency-settings"),
      ]
    }),

    item("Other Settings", null, "Hexagon", {
      submenu: true,
      submenuItems: [
        item("Storage", "/storage-settings"),
        item("Ban IP Address", "/ban-ip-address"),
      ]
    }),

    item("Logout", "/signin", "LogOut")
  ]),

  // section("UI Interface", [
  //   item("Base UI", null, "Layers", {
  //     submenu: true,
  //     submenuItems: [
  //       item("Alerts", "/ui-alerts"),
  //       item("Accordion", "/ui-accordion"),
  //       item("Avatar", "/ui-avatar"),
  //       item("Badges", "/ui-badges"),
  //       item("Border", "/ui-borders"),
  //       item("Buttons", "/ui-buttons"),
  //       item("Button Group", "/ui-buttons-group"),
  //       item("Breadcrumb", "/ui-breadcrumb"),
  //       item("Card", "/ui-cards"),
  //     ]
  //   }),
  // ])
];

