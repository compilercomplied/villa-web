import React from "react";
import { ReactComponent as Placeholder } from "../../../../assets/icons/categories/placeholder.svg";
import { Transaction } from "../../../domain/transaction";

export const TransactionItem = (value: Transaction) => {

  return (
    <li>
      <div className="card-container">
        <div className="card-tag">
          <Placeholder/>
        </div>
        <div className="card-info">
          {value.description} - {value.date}
        </div>
      </div>
    </li>
  );
}