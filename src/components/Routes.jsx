import React from "react";
import { Route, Switch } from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Customers = React.lazy(() => import("../pages/Customers"));
const Admin = React.lazy(() => import("../pages/admin/Admin"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/admins" component={Admin} />
    </Switch>
  );
};

export default Routes;
