import { useEffect } from "react";

type OnLoad = ((this: GlobalEventHandlers, ev: Event) => any);

export const useScript = (uri: string, onload?: OnLoad) => {

  useEffect(() => {
    const script = document.createElement("script");

    script.src = uri;
    script.async = true;
    script.defer = true;
    if(onload) script.onload = onload;

    document.body.appendChild(script);


    return () => { 
      document.body.removeChild(script); 
    };

  }, []);

}