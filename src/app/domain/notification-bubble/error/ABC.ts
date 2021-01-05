import { Toastable, ToastFlavour } from "../ABC";

export abstract class BaseError extends Toastable { 

  protected constructor(message: string, flavour: ToastFlavour) { 
    super(message, flavour); 
  }

}