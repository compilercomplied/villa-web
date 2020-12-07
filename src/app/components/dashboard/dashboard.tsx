import React, { useEffect, useState } from "react";
import "./dashboard.css"
import { Transaction } from "../../domain/transaction";
import { fetchDashboard } from "../../http/villa/dashboard";
import { SetState } from "../../extensions.ts/react-wrap";
import { TransactionList } from "./transaction-list/transaction-list";

export const Dashboard = () => {

  const [tran, setTran] = useState([] as Transaction[]);
  

  useEffect(() => {

    (async (setTran: SetState<Transaction[]>) => {
      const response = await fetchDashboard();
      setTran(t => t.concat(response.transactions));
    })(setTran);

  }, []);



  return (
    <div className="dashboard-root">
      <TransactionList tran={tran} setTran={setTran} />
    </div>
  );

}