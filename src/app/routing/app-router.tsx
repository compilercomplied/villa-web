import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { SigninButton } from "../components/public/auth/login";
import { WalledRoute } from "./walled-route";



export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login"><SigninButton/></Route>
        <Route path="/*"><WalledRoute/></Route>
      </Switch>
    </Router>
  );
}
