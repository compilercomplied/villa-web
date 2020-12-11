import { Optional } from "./types";


export function persistInLS<T>(key: string, value:T) {

  const raw = JSON.stringify(value);
  localStorage.setItem(key, raw);

}

export function retrieveFromLS<T>(key: string): Optional<T> {

  const raw = localStorage.getItem(key);
  if(!raw) return undefined;


  try       { return <T>JSON.parse(raw);  } 
  catch(e)  { return undefined;           }

}