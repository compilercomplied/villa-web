import React, { useEffect } from "react";
import { Transaction } from "../../../domain/transaction";
import { SetState } from "../../../extensions/react-wrap";
import { usePageBottom } from "../../../hooks/page-bottom";
import { refreshDashboardTransactions } from "../../../http/villa/dashboard";
import { TransactionItem } from "./transaction-item";

type TListInput = {

  tran: Transaction[],
  setTran: SetState<Transaction[]>,

};

export const TransactionList = (args: TListInput) => {

  const isPageBottom = usePageBottom();

  useEffect(() => {

    if (!isPageBottom) return;
    appendTransactions(args.tran, args.setTran);

  }, [isPageBottom])

  return (
    <div className="tran-container">
      <ul>
        {args.tran
          .map((t) => <TransactionItem {...t}/>
        )}</ul>
      <button onClick={(e) => clickHandler(args.tran, args.setTran)}></button>
    </div>
  );

};

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