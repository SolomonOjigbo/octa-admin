
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { base_path } from "./environment";
import '../src/style/css/feather.css'
import '../src/style/css/line-awesome.min.css'
import "../src/style/scss/main.scss";
import '../src/style/icons/fontawesome/css/fontawesome.min.css'
import '../src/style/icons/fontawesome/css/all.min.css'


import { Provider } from "react-redux";
import store from "./core/redux/store";
import AllRoutes from "./Router/router";

const rootElement = document.getElementById('root');



if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter basename={base_path}>
      <AllRoutes />

      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}
