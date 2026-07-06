import React from 'react';

import * as Icon from 'react-feather';

export const SidebarData = [
          
    {
        label: "Main",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Main",
        submenuItems: [
        {
            label: "Dashboard",
            icon: <Icon.Grid  />,
            submenu: true,
            showSubRoute: false,
            link: "/",

            submenuItems: [
              { label: "Admin Dashboard", link: "/" },
              { label: "Sales Dashboard", link: "/sales-dashboard" }
            ]
          },
        ]
      },
      {
        label: "Inventory",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Inventory",
      
        submenuItems: [
          { label: "Products", link: "/product-list", icon:<Icon.Box />,showSubRoute: false,submenu: false },
          { label: "Create Product", link: "/add-product", icon:  <Icon.PlusSquare />,showSubRoute: false, submenu: false },
          { label: "Expired Products", link: "/expired-products", icon:  <Icon.Codesandbox  />,showSubRoute: false,submenu: false },
          { label: "Low Stocks", link: "/low-stocks", icon: <Icon.TrendingDown  />,showSubRoute: false,submenu: false },
          { label: "Category", link: "/category-list", icon:  <Icon.Codepen />,showSubRoute: false,submenu: false },
          { label: "Sub Category", link: "/sub-categories", icon:  <Icon.Speaker  />,showSubRoute: false,submenu: false },
          { label: "Brands", link: "/brand-list", icon:  <Icon.Tag />,showSubRoute: false,submenu: false },
          { label: "Units", link: "/units", icon:  <Icon.Speaker />,showSubRoute: false,submenu: false },
          { label: "Variant Attributes", link: "/variant-attributes", icon:  <Icon.Layers />,showSubRoute: false,submenu: false },
          { label: "Warranties", link: "/warranty", icon:  <Icon.Bookmark />,showSubRoute: false,submenu: false },
          { label: "Print Barcode", link: "/barcode", icon: <Icon.AlignJustify />, showSubRoute: false,submenu: false },
          { label: "Print QR Code", link: "/qrcode", icon:  <Icon.Maximize  />,showSubRoute: false,submenu: false }
        ]
      },
      {
        label: "Stock",
        submenuOpen: true,
        submenuHdr: "Stock",
        submenu: true,
        showSubRoute: false,
        submenuItems: [
          { label: "Manage Stock", link: "/manage-stocks", icon:  <Icon.Package />,showSubRoute: false,submenu: false },
          { label: "Stock Adjustment", link: "/stock-adjustment", icon:  <Icon.Clipboard />,showSubRoute: false,submenu: false },
          { label: "Stock Transfer", link: "/stock-transfer", icon:  <Icon.Truck />,showSubRoute: false,submenu: false }
        ]
      },
      {
        label: "Sales",
        submenuOpen: true,
        submenuHdr: "Sales",
        submenu: false,
        showSubRoute: false,
        submenuItems: [
          { label: "Sales", link: "/sales-list", icon:  <Icon.ShoppingCart />,showSubRoute: false,submenu: false },
          { label: "Invoices", link: "/invoice-report", icon:  <Icon.FileText />,showSubRoute: false,submenu: false },
          { label: "Sales Return", link: "/sales-returns", icon:  <Icon.Copy />,showSubRoute: false,submenu: false },
          { label: "Quotation", link: "/quotation-list", icon:  <Icon.Save />,showSubRoute: false,submenu: false },
        ]
      },
      {
        label: "Promo",
        submenuOpen: true,
        submenuHdr: "Promo",
        showSubRoute: false,
        submenuItems: [
          { label: "Coupons", link: "/coupons", icon:  <Icon.ShoppingCart />,showSubRoute: false, submenu: false }
        ]
      },
      {
        label: "Purchases",
        submenuOpen: true,
        submenuHdr: "Purchases",
        showSubRoute: false,
        submenuItems: [
          { label: "Purchases", link: "/purchase-list", icon:  <Icon.ShoppingBag />,showSubRoute: false,submenu: false },
          { label: "Purchase Order", link: "/purchase-order-report", icon:  <Icon.FileMinus />,showSubRoute: false ,submenu: false},
          { label: "Purchase Return", link: "/purchase-returns", icon:  <Icon.RefreshCw />,showSubRoute: false,submenu: false }
        ]
      },
    
    

    {
        label: "Finance & Accounts",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Finance & Accounts",
        submenuItems: [
          {
            label: "Expenses",
            submenu: true,
            showSubRoute: false,
            icon: <Icon.FileText />,
            submenuItems: [
              {label: "Expenses", link: "/expense-list",showSubRoute: false},
              {label: "Expense Category", link: "/expense-category",showSubRoute: false}
            ]
          }
        ]
      },

      {
        label: "People",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "People",
      
        submenuItems: [
          { label: "Customers", link: "/customers", icon:<Icon.User />,showSubRoute: false,submenu: false },
          { label: "Suppliers", link: "/suppliers", icon:  <Icon.Users />,showSubRoute: false, submenu: false },
          { label: "Stores", link: "/store-list", icon:  <Icon.Home  />,showSubRoute: false,submenu: false },
          { label: "Warehouses", link: "/warehouse", icon: <Icon.Archive />,showSubRoute: false,submenu: false },

        ]
      },

      {
        label: "Platform",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Platform",
        submenuItems: [
          { label: "Tenants", link: "/tenants", icon: <Icon.Globe />, showSubRoute: false, submenu: false },
          { label: "Business Entities", link: "/business-entities", icon: <Icon.Briefcase />, showSubRoute: false, submenu: false },
          { label: "Product Suppliers", link: "/product-suppliers", icon: <Icon.Link />, showSubRoute: false, submenu: false },
          { label: "Tenant Catalog", link: "/tenant-catalog", icon: <Icon.Package />, showSubRoute: false, submenu: false },
          { label: "B2B Connections", link: "/b2b-connections", icon: <Icon.Share2 />, showSubRoute: false, submenu: false },
          { label: "Barcodes", link: "/barcodes", icon: <Icon.Grid />, showSubRoute: false, submenu: false },
          { label: "Platform Settings", link: "/platform-settings", icon: <Icon.Settings />, showSubRoute: false, submenu: false },
          { label: "Audit Logs", link: "/audit-logs", icon: <Icon.Shield />, showSubRoute: false, submenu: false },
        ]
      },

      {
        label: "Operations",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Operations",
        submenuItems: [
          { label: "Transactions", link: "/transactions", icon: <Icon.CreditCard />, showSubRoute: false, submenu: false },
          { label: "Payments", link: "/payments", icon: <Icon.DollarSign />, showSubRoute: false, submenu: false },
          { label: "POS Sessions", link: "/pos-sessions", icon: <Icon.Monitor />, showSubRoute: false, submenu: false },
          { label: "Purchase Orders", link: "/purchase-list", icon: <Icon.ShoppingCart />, showSubRoute: false, submenu: false },
          { label: "Quotations", link: "/quotation-list", icon: <Icon.FileText />, showSubRoute: false, submenu: false },
          { label: "Stock", link: "/manage-stocks", icon: <Icon.Layers />, showSubRoute: false, submenu: false },
          { label: "Stock Transfers", link: "/stock-transfer", icon: <Icon.Repeat />, showSubRoute: false, submenu: false },
          { label: "Inventory Movements", link: "/inventory-movements", icon: <Icon.Activity />, showSubRoute: false, submenu: false },
        ]
      },

      {
        label: "Reports",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Reports",
        submenuItems: [
          { label: "Analytics", link: "/analytics", icon:  <Icon.TrendingUp /> ,showSubRoute: false},
          { label: "Sales Report", link: "/sales-report", icon:  <Icon.BarChart2 /> ,showSubRoute: false},
          { label: "Purchase Report", link: "/purchase-report", icon:  <Icon.PieChart />,showSubRoute: false },
          { label: "Inventory Report", link: "/inventory-report", icon:  <Icon.Inbox />,showSubRoute: false },
          { label: "Invoice Report", link: "/invoice-report", icon:  <Icon.File />,showSubRoute: false },
          { label: "Supplier Report", link: "/supplier-report", icon:  <Icon.UserCheck />,showSubRoute: false },
          { label: "Customer Report", link: "/customer-report", icon:  <Icon.User />,showSubRoute: false },
          { label: "Expense Report", link: "/expense-report", icon:  <Icon.FileText />,showSubRoute: false },
          { label: "Income Report", link: "/income-report", icon:  <Icon.BarChart />,showSubRoute: false },
          { label: "Tax Report", link: "/tax-report", icon:  <Icon.Database />,showSubRoute: false },
          { label: "Profit & Loss", link: "/profit-loss-report", icon:  <Icon.TrendingDown />,showSubRoute: false }
        ],
      },


      {
        label: "User Management",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "User Management",
        submenuItems: [
          { label: "Users", link: "/users", icon:  <Icon.UserCheck />,showSubRoute: false },
          { label: "Roles & Permissions", link: "/roles-permissions", icon:  <Icon.UserCheck />,showSubRoute: false },
          { label: "Active Sessions", link: "/sessions", icon:  <Icon.Monitor />,showSubRoute: false },
          { label: "Delete Account Request", link: "/delete-account", icon:  <Icon.Lock />,showSubRoute: false }
        ]
      },
      {
        label: "Pages",
        submenuOpen: true,
        showSubRoute: false,
        submenuHdr: "Pages",
        submenuItems: [
          { label: "Profile", link: "/profile", icon:  <Icon.User />,showSubRoute: false },
          {
            label: "Authentication",
            submenu: true,
            showSubRoute: false,
            icon: <Icon.Shield />,
            submenuItems: [
              {
                label: "Login",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Cover", link: "/signin",showSubRoute: false },
                  { label: "Illustration", link: "/signin-2",showSubRoute: false },
                  { label: "Basic", link: "/signin-3",showSubRoute: false }
                ]
              },
              {
                label: "Register",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Cover", link: "/register",showSubRoute: false },
                  { label: "Illustration", link: "/register-2" ,showSubRoute: false},
                  { label: "Basic", link: "/register-3" ,showSubRoute: false}
                ]
              },
              {
                label: "Forgot Password",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Cover", link: "/forgot-password",showSubRoute: false },
                  { label: "Illustration", link: "/forgot-password-2",showSubRoute: false },
                  { label: "Basic", link: "/forgot-password-3",showSubRoute: false }
                ]
              },
              {
                label: "Reset Password",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Cover", link: "/reset-password",showSubRoute: false },
                  { label: "Illustration", link: "/reset-password-2",showSubRoute: false },
                  { label: "Basic", link: "/reset-password-3",showSubRoute: false }
                ]
              },
              {
                label: "Email Verification",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Cover", link: "/email-verification",showSubRoute: false },
                  { label: "Illustration", link: "/email-verification-2",showSubRoute: false },
                  { label: "Basic", link: "/email-verification-3",showSubRoute: false }
                ]
              },
              {
                label: "2 Step Verification",
                submenu: true,
                showSubRoute: false,
                submenuItems: [
                  { label: "Cover", link: "/two-step-verification",showSubRoute: false },
                  { label: "Illustration", link: "/two-step-verification-2",showSubRoute: false },
                  { label: "Basic", link: "/two-step-verification-3",showSubRoute: false }
                ]
              },
              { label: "Lock Screen", link: "/lock-screen",showSubRoute: false }
            ]
          },
          {
            label: "Error Pages",
            submenu: true,
            showSubRoute: false,
            icon: <Icon.FileMinus />,
            submenuItems: [
              { label: "404 Error", link: "/error-404",showSubRoute: false },
              { label: "500 Error", link: "/error-500",showSubRoute: false }
            ]
          },
          // {
          //   label: "Places",
          //   submenu: true,
          //   showSubRoute: false,
          //   icon: <Icon.Map />,
          //   submenuItems: [
          //     { label: "Countries", link: "countries",showSubRoute: false },
          //     { label: "States", link: "states",showSubRoute: false }
          //   ]
          // },
          { label: "Blank Page", link: "/blank-page", icon:  <Icon.File />,showSubRoute: false },
          { label: "Coming Soon", link: "/coming-soon", icon:  <Icon.Send />,showSubRoute: false },
          { label: "Under Maintenance", link: "/under-maintenance", icon:  <Icon.AlertTriangle />,showSubRoute: false }
        ]
      },

      {
        label: "Settings",
        submenu: true,
        showSubRoute: false,
        submenuHdr: "Settings",
        submenuItems: [
          { label: "General Settings", 
          submenu: true, 
          showSubRoute: false,
          icon: <Icon.Settings/>,
          submenuItems: [
            { label: "Profile", link: "/general-settings" },
            { label: "Security", link: "/security-settings" },
            { label: "Notifications", link: "/notification" },
            { label: "Connected Apps", link: "/connected-apps" }
          ]},
          { label: "Website Settings", submenu: true, 
          showSubRoute: false,
          icon: <Icon.Globe/>,
          submenuItems: [
            { label: "System Settings", link: "/system-settings",showSubRoute: false },
            { label: "Company Settings", link: "/company-settings",showSubRoute: false },
            { label: "Localization", link: "/localization-settings",showSubRoute: false },
            { label: "Prefixes", link: "/prefixes" ,showSubRoute: false},
            { label: "Preference", link: "/preference",showSubRoute: false },
            { label: "Appearance", link: "/appearance",showSubRoute: false },
            { label: "Social Authentication", link: "/social-authentication",showSubRoute: false },
            { label: "Language", link: "/language-settings" ,showSubRoute: false}
          ]},
          { label: "App Settings", submenu: true, 

          showSubRoute: false,
          icon: <Icon.Smartphone/>,
        submenuItems: [
            { label: "Invoice", link: "/invoice-settings",showSubRoute: false },
            { label: "Printer", link: "/printer-settings",showSubRoute: false },
            { label: "POS", link: "/pos-settings",showSubRoute: false },
            { label: "Custom Fields", link: "/custom-fields",showSubRoute: false }
          ]},
          { label: "System Settings", submenu: true, 
          showSubRoute: false,
          icon: <Icon.Monitor/>,
          submenuItems: [
            { label: "Email", link: "/email-settings",showSubRoute: false },
            { label: "SMS Gateways", link: "/sms-gateway",showSubRoute: false },
            { label: "OTP", link: "/otp-settings",showSubRoute: false },
            { label: "GDPR Cookies", link: "/gdpr-settings",showSubRoute: false }
          ]},
          { label: "Financial Settings", submenu: true, 
          showSubRoute: false,
          icon: <Icon.DollarSign/>,
          submenuItems: [
            { label: "Payment Gateway", link: "/payment-gateway-settings",showSubRoute: false },
            { label: "Bank Accounts", link: "/bank-settings-grid",showSubRoute: false },
            { label: "Tax Rates", link: "/tax-rates",showSubRoute: false },
            { label: "Currencies", link: "/currency-settings",showSubRoute: false }
          ]},
          { label: "Other Settings", submenu: true, 
          showSubRoute: false,
          icon: <Icon.Hexagon/>,
          submenuItems: [
            { label: "Storage", link: "/storage-settings",showSubRoute: false },
            { label: "Ban IP Address", link: "/ban-ip-address",showSubRoute: false }
          ]},
          { label: "Logout", link: "/signin", icon:  <Icon.LogOut />,showSubRoute: false }
        ]
      },
      

      


]
