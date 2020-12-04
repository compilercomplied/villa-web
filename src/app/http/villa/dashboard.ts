import Axios, { AxiosResponse } from "axios";
import { Transaction } from "../../domain/transaction";

const baseUri = "https://localhost:3001/api";


// --- Dashboard ---------------------------------------------------------------
export type DashboardResponse = {

  transactions: Transaction[];

}

export const fetchDashboard = async (): Promise<DashboardResponse> => {

  return await Axios.get(baseUri + "/dashboard").then(
    (response: AxiosResponse<DashboardResponse>) => response.data
  );

};

type refreshTransactionsQuery = {
  skipCount: number,
};
export const refreshDashboardTransactions = 
  async (body: refreshTransactionsQuery): Promise<Transaction[]> => {

  return await Axios.post(baseUri + "/dashboard/transactions", body).then(
    (response: AxiosResponse<Transaction[]>) => response.data
  );

};