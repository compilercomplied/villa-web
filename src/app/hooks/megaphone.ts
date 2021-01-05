import { useContext, useEffect } from "react";
import { ToastCtxt } from "../contexts/toast";
import { Toastable } from "../domain/notification-bubble/ABC";
import { Optional } from "../extensions/types";


export const useMegaphone = (toast: Optional<Toastable>): void => {

  const { dispatch } = useContext(ToastCtxt);

  useEffect(() => {

    if(!toast) return;

    dispatch({ type: "add",  payload: toast });

  // eslint-disable-next-line
  }, [ toast ]);

}