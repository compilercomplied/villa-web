import { useCallback, useEffect, useState } from "react";
import { Optional } from "../../extensions/types";

type AsyncStatus = "idle" | "pending" | "success" | "error";
type AsyncOutput<T, E> = { 
  execute:() => Promise<void>, 
  status: AsyncStatus, 
  value: Optional<T>, 
  error: Optional<E>,  
};

export const useAsync = <T, E = string>(
    asyncCallback: (params?: any) => Promise<T>,
    immediate = true,
    params: any = undefined
  ): AsyncOutput<T, E> => {

  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [value, setValue]   = useState<Optional<T>>(undefined);
  const [error, setError]   = useState<Optional<E>>(undefined);


  const execute = useCallback(() => {

    setStatus("pending");
    setError(undefined);

    const callback = params !== undefined
      ? () => asyncCallback(params)
      : () => asyncCallback();

      return callback()
        .then((response: T) => {
          setValue(response);
          setStatus("success");
        })
        .catch((error: any) => {
          setError(error);
          setStatus("error");
        });

  }, [asyncCallback]);


  useEffect(() => {

    if (immediate) execute();

  }, [execute, immediate]);


  return { execute, status, value, error };

};