import React, { useEffect, useState } from "react";
import "./dashboard.css"
import { ReactComponent as Placeholder } from "../../assets/icons/categories/placeholder.svg";
import { Transaction } from "../../domain/transaction";
import { fetchDashboard, refreshDashboardTransactions } from "../../http/villa/dashboard";

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

const useScrollPos = 
  (tran: Transaction[], setTran: (data: Transaction[])=> void) => {

  useEffect(() =>{
    
    const onScroll = 
      (e:any, tran: Transaction[], setTran: (data: Transaction[])=> void) => {

      const node = e.target.scrollingElement;

      const bottomScroll = (node.scrollHeight - node.scrollTop) 
        === node.clientHeight;

      if (bottomScroll) clickListener(tran, setTran);

    };

    document.addEventListener("scroll", (e) => onScroll(e, tran, setTran))

    return () => document.removeEventListener("scroll", (e)=> onScroll(e, tran, setTran));

  })

}

export const Dashboard = () => {

  const [tran, setTran] = useState([] as Transaction[]);


  useEffect(() => {
    fetchDashboard()
      .then(payload => setTran(t => t.concat(payload.transactions)));
  }, []);


  useScrollPos(tran, setTran);


  return ( 
    <div>
    <ul>{tranItemEL(tran)}</ul> 
    <button onClick={(e) => clickListener(tran, setTran)}></button>
    </div>
  );


}

// --- api ------------------------------------------------------------------------------------

const clickListener = (data:Transaction[], callback: (_: Transaction[])=> void) => {

  refreshDashboardTransactions({ skipCount: data.length })
    .then(payload => callback(data.concat(payload)));

}