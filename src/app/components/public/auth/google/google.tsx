import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthCtx } from "../../../../contexts/auth";
import { useScript } from "../../../../hooks/script";

const clientID = process.env.REACT_APP_GOOGLE_CLIENTID;
// TODO handle env properly
if (!clientID) throw new Error("env not loaded correctly");

const redirectURI = "http://localhost:4000";


const initAuth2 = () => {

  /*
  Warning: do not call Promise.resolve() and similar with the result of 
  gapi.auth2.init(). As the GoogleAuth object returned implements the then() 
  method that resolves with itself, it will create an infinite recursion. 
  https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams
  */
  window.gapi.auth2.init({
    client_id: clientID,
    cookie_policy: 'single_host_origin',
    scope: "email",
    fetch_basic_profile: false,
    ux_mode: "popup",
    redirect_uri: redirectURI,
  });

}

export const GoogleSignIn = () => {

  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [platformLoaded, setPlatformLoaded] = useState(false);
  const { state: auth, dispatch } = useContext(AuthCtx);
  const history = useHistory();

  const onGapiLoad = () => {

    window.gapi.load("auth2", initAuth2);
    setGapiLoaded(true);

    return {};
  };

  const onPlatformLoad = () => {
    setPlatformLoaded(true);

    return { };
  }


  useScript("https://apis.google.com/js/platform.js", onPlatformLoad);
  useScript("https://apis.google.com/js/client.js", onGapiLoad);

  const onGoogleSignIn = (googleUser: gapi.auth2.GoogleUser) => {

    if(!googleUser.isSignedIn()) return;

    const token = googleUser.getAuthResponse()?.id_token;
    dispatch({type: 'login', payload: token});
    sessionStorage.setItem("jwt", token);
    history.push("/");

  }

  useEffect(() => {
    if (!gapiLoaded || !platformLoaded) return;

    window.gapi.signin2.render("google-signin", {
      width: 200,
      height: 50,
      theme: "light",
      onsuccess: onGoogleSignIn,
    });

  // eslint-disable-next-line
  }, [gapiLoaded, platformLoaded]);

  return ( <div id="google-signin"/> );

}