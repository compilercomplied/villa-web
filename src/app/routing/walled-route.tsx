import React, { useContext } from "react"
import { Redirect, RouteProps } from "react-router-dom"
import { Dashboard } from "../components/dashboard/dashboard"
import { IdentityContext } from "../contexts/identity"


export const WalledRoute = (props: RouteProps) => {

  const identity = useContext(IdentityContext);

  if (!identity?.isAuthenticated() ?? false) 
    return ( <Redirect to="/login" /> );


  return ( <Dashboard/> );

}