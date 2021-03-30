import React, { useEffect, useState } from "react";
import { Toastable } from "../../../domain/notification-bubble/ABC";
import { WarningToast } from "../../../domain/notification-bubble/warning";
import { Transaction } from "../../../domain/transaction";
import { SetState } from "../../../extensions/react-wrap";
import { Optional } from "../../../extensions/types";
import { useMegaphone } from "../../../hooks/megaphone";
import { usePageBottom } from "../../../hooks/page-bottom";
import { useTransactionsRefresh } from "../../../http/villa/dashboard";
import { TransactionItem } from "./transaction-item";

type TListInput = {

  tran: Transaction[],
  setTran: SetState<Transaction[]>,

};

export const TransactionList = (args: TListInput) => {

  const { tran, setTran } = args;
  const [ clicked, setClicked ] = useState(false);
  const [ toast, setToast ] = useState<Optional<Toastable>>(undefined);
  const [ pastFirstLoad, setPastFirstLoad ] = useState(false);


  const isPageBottom = usePageBottom();
  useMegaphone(toast);

  const tranRefresh = useTransactionsRefresh(
    tran.length, (isPageBottom || clicked)
  );


  useEffect(() => {

    if ((tranRefresh?.length ?? -1) <= 0) {
      if (pastFirstLoad && (tran?.length ?? 0) > 0) {
        // TODO  do not hit the API anymore after reaching this point.
        setToast(new WarningToast("No more transactions left to be shown"));

      }
      else { setPastFirstLoad(true); }
      
    } else {
      setTran(t => t.concat(tranRefresh));

    }

  }, [tranRefresh])

  // Bounce back trigger effect. Not liking this one that much, so I hope
  // it's temporary (hello 2023 me).
  useEffect(() => setClicked(false), [clicked] );

  return (
    <div className="tran-container">
      <ul>
        {args.tran.map((t) => <TransactionItem {...t}/>)}
      </ul>
      <button onClick={(e) => setClicked(true)}/>
    </div>
  );

};