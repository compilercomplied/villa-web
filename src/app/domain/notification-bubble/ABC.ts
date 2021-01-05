
export enum ToastFlavour {

  notify = 0,
  alert = 1,
  error = 2,

}

export abstract class Toastable {

  protected constructor(
    public message:string, 
    public flavour: ToastFlavour) { 

    }

}