import { IDENTITY } from "../../../../constants/local-storage";
import { Identity } from "../../../../contexts/identity";
import { persistInLS } from "../../../../extensions/local-storage";

export const onGoogleSignIn = (googleUser: gapi.auth2.GoogleUser) => {

  const auth = googleUser.getAuthResponse();
  if (!auth) {
    console.log("GOOGLE AUTH ERROR");
    return;
  }

  const identity = new Identity();
  identity.providerOAuth = {
    provider: "Google",
    accessToken: auth.access_token,
    expiresAt: new Date(auth.expires_at),
  }

  persistInLS(IDENTITY, identity);

}