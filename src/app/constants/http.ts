import { Optional } from "../extensions/types";


export type HttpVerb = "GET" | "POST" |  "PUT" | "DEL";


export type HttpHeader = {
  auth: string,
}

export type APIParams = {

  root: string,
  path: string,
  verb: HttpVerb,
  queryParams?: Optional<string>,
  body?: Optional<{}>,
  headers?: Optional<HttpHeader>,

}