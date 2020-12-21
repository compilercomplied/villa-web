import React, { useContext } from "react";
import { Redirect, RouteProps } from "react-router-dom"
import { Dashboard } from "../components/dashboard/dashboard";
import { AuthCtx } from "../contexts/auth";


export const WalledRoute = (props: RouteProps) => {

  const { state: auth } = useContext(AuthCtx);

  console.log("walled route");
  if (!auth.isSignedIn) return ( <Redirect to="/login" /> );

  return ( <Dashboard/> );

}