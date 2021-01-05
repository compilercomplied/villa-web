import React, { Dispatch, useReducer } from "react";
import { createContext } from "react";


// --- Definitions -------------------------------------------------------------
export type State = {

  isSignedIn: boolean,
  jwt: string,

};

export type Action = {

  type: "login",
  payload: string

};


// --- Context -----------------------------------------------------------------
const initialState: State = { isSignedIn: false, jwt: "" };
const initialCtxState : { state: State, dispatch: Dispatch<Action> } = {
  state:  initialState,
  dispatch: () => { }
};

export const AuthCtx = createContext(initialCtxState);


// --- Reducers ----------------------------------------------------------------
const reducer = (state: State, action: Action) => {

  switch (action.type) {

    case "login":
      return { isSignedIn: true, jwt: action.payload };

    default: throw new Error(`unexpected reducer argument: ${action}`);

  }

};


// --- Provider ----------------------------------------------------------------

export const AuthProvider = (props:any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthCtx.Provider value={{state, dispatch}}>
      {props.children}
    </AuthCtx.Provider>
  );

}