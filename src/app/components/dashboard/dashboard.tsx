import React, { useEffect, useState } from "react";
import "./dashboard.css"
import { Transaction } from "../../domain/transaction";
import { useBaseDashboard } from "../../http/villa/dashboard";
import { TransactionList } from "./transaction-list/transaction-list";

export const Dashboard = () => {

  const [tran, setTran] = useState([] as Transaction[]);

  const dashboard = useBaseDashboard();


  useEffect(() => {

    if ((dashboard?.transactions?.length ?? -1) <= 0) return;
    setTran(t => t.concat(dashboard.transactions));

  }, [dashboard]);



  return (
    <div className="dashboard-root">
      <TransactionList tran={tran} setTran={setTran} />
    </div>
  );

}