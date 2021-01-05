import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { APIParams, HttpHeader } from "../constants/http";
import { APIError } from "../domain/notification-bubble/error/api-error";
import { VillaError } from "../domain/villa/error-response";
import { SetState } from "../extensions/react-wrap";
import { Optional } from "../extensions/types"
import { useMegaphone } from "./megaphone";


// --- Helpers -----------------------------------------------------------------
const buildUri = 
  (root: string, path: string, queryParams: Optional<string>) => {

  if (queryParams)  return `${root}${path}${queryParams}`;
  else              return `${root}${path}`;

}

const buildAxiosConfig = 
  (headers: Optional<HttpHeader>): AxiosRequestConfig => {

  if (!headers) return { } as AxiosRequestConfig;


  return {
    headers: { Authorization: `Bearer ${headers.auth}` }
  };

}

const handleAxiosError = (e: AxiosError): APIError => {

  if (e.message === "Network Error") {
    return new APIError(`Unable to reach host at ${e.config}`, 0);

  }
  else if (e.response?.data) {
    const apiError = e.response.data as VillaError;
    return new APIError(apiError.message, e.response?.status ?? 0);

  }
  else {
    return new APIError(e.message, 0);

  }

}

const handleAPIResponse = <T>(
    apiResponse: (AxiosResponse<T> | APIError | AxiosResponse<VillaError>),
    setResp: SetState<T>,
    setError: SetState<Optional<APIError>>
  ): void => {

  if (apiResponse instanceof APIError){
    setError(apiResponse);

  }
  else if ((<AxiosResponse<T>>apiResponse)!?.status === 200) {
    setResp((<AxiosResponse<T>>apiResponse).data);

  }
  else {
    const apiError = (<AxiosResponse<VillaError>>apiResponse);
    setError(new APIError(apiError.data.message, apiError?.status ?? 0));

  }

};


// --- Verbs -------------------------------------------------------------------
const get = async <T>(uri: string, config: AxiosRequestConfig)
  : Promise<AxiosResponse<T> | APIError> => {

  return await Axios.get(uri, config)
    .then((response: AxiosResponse<T>) => response)
    .catch((e) => handleAxiosError(e));

}

const post = 
  async <T>(uri: string, body:Optional<{}>, config: AxiosRequestConfig)
    : Promise<AxiosResponse<T> | APIError> => {

  if(body) {
    return await Axios.post(uri, body, config)
      .then((response: AxiosResponse<T>) => response)
      .catch((e) => handleAxiosError(e));

  } else {
    return await Axios.post(uri, config)
      .then((response: AxiosResponse<T>) => response)
      .catch((e) => handleAxiosError(e));
  }

}


// -----------------------------------------------------------------------------
type APIHookOut<T> = { 
  response: T, 
  error: Optional<APIError>, 
  isLoading: boolean 
};

export const useAPI = 
<T>(params: APIParams, trigger: boolean = true): APIHookOut<T>  => {

  const [ response, setResponse ] = useState({} as T);
  const [ error, setError ] = useState(undefined as Optional<APIError>);
  const [ isLoading, setLoading ] = useState(false);

  useMegaphone(error);

  const { root, path, queryParams, headers, body } = params;


  const uri = buildUri(root, path, queryParams);
  const config = buildAxiosConfig(headers);


  useEffect(() => {

    if (!trigger) return;

    setLoading(true);

    switch (params.verb) {
      case "GET": 
        (async () => {
          const resp = await get<T>(uri, config); 
          handleAPIResponse(resp, setResponse, setError);

        })();
        break;
      case "POST": 
        (async () => {
          const resp = await post<T>(uri, body, config); 
          handleAPIResponse(resp, setResponse, setError);
        })();
        break;

      default: throw Error(`useAPI malformed execution ${params}`);

    }

    setLoading(false);

  // eslint-disable-next-line
  }, [ trigger ]);

  return { response, error, isLoading };

}
