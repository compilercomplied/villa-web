import { ToastFlavour } from "../ABC";
import { BaseError } from "./ABC";


export class APIError extends BaseError {

  constructor(message: string, httpcode: number) {

    const msg = (httpcode === 0) ? message : `${httpcode} - ${message}`;
    super(msg, ToastFlavour.error);

  }

}