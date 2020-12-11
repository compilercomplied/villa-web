import React from "react";
import { IDENTITY } from "../constants/local-storage";
import { retrieveFromLS } from "../extensions/local-storage";

type OAuthProvider = "Google";

type OAuthCreds = {

  provider: OAuthProvider,
  accessToken: string,
  expiresAt: Date,

}

export class Identity {

  providerOAuth?: OAuthCreds = undefined;

  constructor() { }

  public isAuthenticated = (): boolean => this.providerOAuth !== undefined;
  

}

const fromLocalStorage: Identity = retrieveFromLS(IDENTITY) ?? new Identity();

export const IdentityContext = React.createContext(fromLocalStorage);