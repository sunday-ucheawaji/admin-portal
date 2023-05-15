import React from "react";
import Table from "../../../components/table/Table";
import useTradeUsers from "./useTradeUsers";

const TradeUsers = () => {
  const {
    tradeUsersList,
    error,
    isLoading,
    isFetching,

    tradeUsersTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
  } = useTradeUsers();

  return (
    <div>
      <h2 className="page-header">Trade Users</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={tradeUsersTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={tradeUsersList}
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

export default TradeUsers;
