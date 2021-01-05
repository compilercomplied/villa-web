import { createContext, Dispatch, useReducer } from "react";
import { Toastable } from "../domain/notification-bubble/ABC";

// --- Definitions -------------------------------------------------------------
export type ToastState = Toastable[];

// Actions
type AddAction = {

  type: "add",
  payload: Toastable,

};

type DelAction = {

  type: "del",

};

export type Action = AddAction | DelAction;


// --- Context -----------------------------------------------------------------
const initialState: ToastState = [] as Toastable[];
const initialCtxState : { state: ToastState, dispatch: Dispatch<Action> } = {
  state:  initialState,
  dispatch: () => { }
};

export const ToastCtxt = createContext(initialCtxState);


// --- Reducers ----------------------------------------------------------------
const reducer = (state: ToastState, action: Action) => {

  switch (action.type) {

    case "add":
      state = state.concat([action.payload]);
      return state;

    case "del":
      state = state.slice(1);
      return state;

    default: throw new Error(`unexpected reducer argument: ${action}`);

  }

};


// --- Provider ----------------------------------------------------------------

export const ToastProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ToastCtxt.Provider value={{state, dispatch}}>
      {props.children}
    </ToastCtxt.Provider>
  );

}