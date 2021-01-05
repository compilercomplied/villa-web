import { useContext, useEffect, useState } from "react";
import { ToastCtxt } from "../../contexts/toast";
import { Toastable, ToastFlavour } from "../../domain/notification-bubble/ABC";
import { FlashItem } from "./toast-item";
import "./toast.css"

export const ToastBucket = () => {

  const [ toasts, setToasts ] = useState([] as Toastable[]);
  const { state: appErrors } = useContext(ToastCtxt);
  const { dispatch } = useContext(ToastCtxt);


  const cleanUp = () => {

    if (toasts.length >= 0) {
      dispatch({ type:"del" });
      setToasts(toast => toast.slice(1));
    }

  };

  useEffect(() => {

    const notification = appErrors[appErrors.length - 1];
    if (!notification) return;


    const toastBubble = { 
      message: notification.message,
      flavour: ToastFlavour.error
    };

    setToasts((f) => f.concat(toastBubble));
    setTimeout(() => cleanUp(), 2000);

  }, [ appErrors ]);


  return (
    <div className="notify-root">
      <ul>
        {toasts.map((f) => <FlashItem {...f}/>)}
      </ul>
    </div>
  );

}