import React from "react";
import { GoogleSignIn } from "./google/google";
import "./login.css";



export const SigninComponent = () => {

  return (
      <div>
        <h1>login component</h1>
        <GoogleSignIn/>
      </div>
  );

}