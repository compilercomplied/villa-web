import React, { useEffect, useState } from "react";
import "./dashboard.css"
import { ReactComponent as Placeholder } from "../../../assets/icons/categories/placeholder.svg";
import { Transaction } from "../../domain/transaction";
import { fetchDashboard, refreshDashboardTransactions } from "../../http/villa/dashboard";
import { SetState } from "../../extensions.ts/react-wrap";
import { usePageBottom } from "../../hooks/page-bottom";

const tranItemEL = (ts: Transaction[]) => ts.map((t) =>
  <li key={t.id}>
    <div className="card-container">
      <div className="card-tag">
        <Placeholder></Placeholder>
      </div>
      <div className="card-info">
        {t.description}
      </div>
    </div>
  </li>
);

export const Dashboard = () => {

  const [tran, setTran] = useState([] as Transaction[]);
  const isPageBottom = usePageBottom();
  

  useEffect(() => {

    (async (setTran: SetState<Transaction[]>) => {
      const response = await fetchDashboard();
      setTran(t => t.concat(response.transactions));
    })(setTran);

  }, []);


  useEffect(() => {

    if (!isPageBottom) return;
    appendTransactions(tran, setTran);

  }, [isPageBottom])


  return (
    <div
      className="tran-container">
      <ul>{tranItemEL(tran)}</ul>
      <button onClick={(e) => clickHandler(tran, setTran)}></button>
    </div>
  );

}

const appendTransactions = 
async (tran: Transaction[], setTran: SetState<Transaction[]>) => {

  const response = await refreshDashboardTransactions(
    { skipCount: tran.length }
  );

  setTran(t => t.concat(response));
  
}

const clickHandler = (data: Transaction[], callback: (_: Transaction[]) => void) => {

  refreshDashboardTransactions({ skipCount: data.length })
    .then(payload => callback(data.concat(payload)));

}