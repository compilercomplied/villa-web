import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Optional } from "../../extensions/types";
import { useAsync } from "./async";


type JWTOutput = { token: Optional<string>, error: Optional<string>};

export const useJWT = (): JWTOutput => {

  const [ token, setToken ] = useState<Optional<string>>(undefined);
  const [ error, setError ] = useState<Optional<string>>(undefined);


  const { 
    getAccessTokenSilently, 
    isLoading: isAuthLoading, 
    isAuthenticated 
  } = useAuth0();

  const callbackArgs = <GetTokenSilentlyOptions>{
      audience: "pfm.gdario.dev"
  };

  const { 
    execute : jwtExecute, 
    value   : jwtValue, 
    error   : jwtError
  } = useAsync<string>(getAccessTokenSilently, false, callbackArgs);


  useEffect(() => {

    if (isAuthLoading) return;

    if(!isAuthenticated) {
      setError("Not authenticated");  // TODO resources
      return;
    }

    jwtExecute();
    
  }, [ isAuthenticated, isAuthLoading, jwtExecute ])


  useEffect(() => {

    if (jwtValue) {
      setToken(jwtValue);
      return;
    }
    else if (jwtError) {
      setError(jwtError);
      return;
    }

    jwtExecute();
    
  }, [ jwtValue, jwtError, jwtExecute ])


  
  return { token, error };

}