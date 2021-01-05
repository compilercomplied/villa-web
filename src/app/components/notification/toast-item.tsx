import { Toastable, ToastFlavour } from "../../domain/notification-bubble/ABC";


export const FlashItem = (toast: Toastable) => {

  let flavour;

  switch(toast.flavour) {
    case(ToastFlavour.error):
      flavour = "toast-error"; break;
    case(ToastFlavour.notify):
      flavour = "toast-notify"; break;
    default:
      flavour = "toast-alert";
  }


  return (
    <li>
      <div className={"toast-container " + flavour}>
        <div className="toast-message">
        {toast.message}
        </div>
      </div>
    </li>
  );

}