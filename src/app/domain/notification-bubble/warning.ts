import { Toastable, ToastFlavour } from "./ABC";

export class WarningToast extends Toastable {

  constructor(message:string) {
    super(message, ToastFlavour.alert);
  }

}