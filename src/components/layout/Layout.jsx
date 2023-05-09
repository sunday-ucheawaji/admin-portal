import React from "react";
import "./layout.css";

import { BrowserRouter, Route } from "react-router-dom";

import ThemeAction from "../../redux/actions/ThemeAction";
const Login = React.lazy(() => import("../../pages/login/Login"));
const RequiredAuth = React.lazy(() => import("../Auth/RequiredAuth"));
const DefaultLayout = React.lazy(() => import("../../layout/DefaultLayout"));

const Layout = () => {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Route
          exact
          path="/login"
          name="Login Page"
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/"
          name="Home"
          render={(props) => (
            <RequiredAuth>
              <DefaultLayout {...props} />
            </RequiredAuth>
          )}
        />
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Layout;
