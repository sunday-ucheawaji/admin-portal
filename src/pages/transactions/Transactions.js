import React from "react";

import Table from "../../components/table/Table";
import useTransactions from "./useTransactions";

const Transactions = () => {
  const {
    transactionList,
    error,
    isLoading,
    isFetching,

    transactionsTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
  } = useTransactions();

  return (
    <div>
      <h2 className="page-header">Transactions</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={transactionsTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={transactionList}
                renderBody={(item, index) => renderBody(item, index)}
                dataShow={dataShow}
                setDataShow={setDataShow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
