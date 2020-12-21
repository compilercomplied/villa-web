import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Transaction } from "../../domain/transaction";

// TODO api constants
const baseUri = "https://localhost:3001/api";

// TODO error handling

// --- Dashboard ---------------------------------------------------------------
export type DashboardResponse = {

  transactions: Transaction[];

}

export const fetchDashboard = async (): Promise<DashboardResponse> => {

  const config: AxiosRequestConfig = buildBaseConfig();

  return await Axios.get(baseUri + "/dashboard", config).then(
    (response: AxiosResponse<DashboardResponse>) => response.data
  );

};

type refreshTransactionsQuery = {
  skipCount: number,
};
export const refreshDashboardTransactions = 
  async (body: refreshTransactionsQuery): Promise<Transaction[]> => {

  const config: AxiosRequestConfig = buildBaseConfig();

  return await Axios.post(baseUri + "/dashboard/transactions", body, config).then(
    (response: AxiosResponse<Transaction[]>) => response.data
  );

};

// --- Helpers -----------------------------------------------------------------

function buildBaseConfig(): AxiosRequestConfig {

  const jwt = window.sessionStorage.getItem("jwt");

  return {
    headers: { Authorization: `Bearer ${jwt}` }
  };

}
