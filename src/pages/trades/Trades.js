import React from "react";
import Table from "../../components/table/Table";
import useTrades from "./useTrades";

const Trades = () => {
  const {
    tradesList,
    error,
    isLoading,
    isFetching,

    tradesTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
  } = useTrades();

  return (
    <div>
      <h2 className="page-header">Trades</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={tradesTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={tradesList}
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

export default Trades;
