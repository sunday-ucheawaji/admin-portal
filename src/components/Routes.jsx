import React from "react";
import { Route, Switch } from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Customers = React.lazy(() => import("../pages/Customers"));
const Admin = React.lazy(() => import("../pages/admin/Admin"));
const Roles = React.lazy(() => import("../pages/roles/Roles"));
const Configurations = React.lazy(() =>
  import("../pages/configurations/Configurations")
);
const Transactions = React.lazy(() =>
  import("../pages/transactions/Transactions")
);
const Subscribers = React.lazy(() =>
  import("../pages/subscribers/Subscribers")
);

const Users = React.lazy(() => import("../pages/users/Users"));
const Trades = React.lazy(() => import("../pages/trades/Trades"));
const TradeUsers = React.lazy(() => import("../pages/trades/tradeUsers/TradeUsers"));

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
      <Route path="/roles" component={Roles} />
      <Route path="/configurations" component={Configurations} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/subscribers" component={Subscribers} />
      <Route path="/users" component={Users} />
      <Route path="/trades" component={Trades} exact />
      <Route path="/trades/user/:id" component={TradeUsers} />
    </Switch>
  );
};

export default Routes;
