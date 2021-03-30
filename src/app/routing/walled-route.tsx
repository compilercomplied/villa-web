import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Redirect, RouteProps } from "react-router-dom"
import { Dashboard } from "../components/dashboard/dashboard";


export const WalledRoute = (props: RouteProps) => {

  const { isAuthenticated, isLoading } = useAuth0();


  if (isLoading)              return ( <div>L O A D I N G</div> );
  else if (!isAuthenticated)  return ( <Redirect to="/login" /> );


  return ( <Dashboard/> );

}