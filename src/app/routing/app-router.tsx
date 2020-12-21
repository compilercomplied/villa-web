import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { SigninComponent } from "../components/public/auth/login";
import { WalledRoute } from "./walled-route";



export default function AppRouter() {
  console.log("router loaded");
  return (
    <Router>
      <Switch>
        <Route path="/login"><SigninComponent/></Route>
        <Route path="/*"><WalledRoute/></Route>
      </Switch>
    </Router>
  );
}
