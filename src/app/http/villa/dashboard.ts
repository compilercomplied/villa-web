import { APIParams, HttpVerb } from "../../constants/http";
import { Transaction } from "../../domain/transaction";
import { useAPI } from "../../hooks/api";
import { useMegaphone } from "../../hooks/megaphone";
import { VillaAPIPath, VillaAPIRoot } from "./constants";

// --- Dashboard ---------------------------------------------------------------
export type DashboardResponse = {

  transactions: Transaction[];

}

export const useBaseDashboard = (): DashboardResponse => {

  const params = buildBaseConfig("/dashboard", "GET");

  const { response, error } = useAPI<DashboardResponse>(params);
  useMegaphone(error);

  return response;

};


export const useTransactionsRefresh = 
(skipCount: number, onHit: boolean): Transaction[] => {

  const params = buildBaseConfig("/dashboard/transactions", "POST");
  params.body = { skipCount: skipCount };

  const { response, error } = useAPI<Transaction[]>(params, onHit);
  useMegaphone(error);

  return response;

};

// --- Helpers -----------------------------------------------------------------
function buildBaseConfig(path: VillaAPIPath, verb: HttpVerb): APIParams {

  return {
    verb: verb,
    path: path,
    root: VillaAPIRoot,
    headers: { auth: `${sessionStorage.getItem("jwt")}`},
  };

}