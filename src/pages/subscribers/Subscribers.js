import React from "react";
import Table from "../../components/table/Table";
import useSubscribers from "./useSubscribers";

const Subscribers = () => {
  const {
    subscribersList,
    error,
    isLoading,
    isFetching,

    subscribersTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  } = useSubscribers();

  return (
    <div>
      <h2 className="page-header">Subscribers</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={subscribersTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={subscribersList}
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

export default Subscribers;
