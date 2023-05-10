import React from "react";

import Table from "../../components/table/Table";
import useConfigurations from "./useConfigurations";

const Configurations = () => {
  const {
    configurationsList,
    error,
    isLoading,
    isFetching,

    configurationsTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  } = useConfigurations();

  return (
    <div>
      <h2 className="page-header">Configurations</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={configurationsTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={configurationsList}
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

export default Configurations;
