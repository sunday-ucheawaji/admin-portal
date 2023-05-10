import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

import customerList from "../assets/JsonData/customers-list.json";

const customerTableHead = [
  "",
  "name",
  "email",
  "phone",
  "total orders",
  "total spend",
  "location",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr onClick={() => console.log(item)} key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.total_orders}</td>
    <td>{item.total_spend}</td>
    <td>{item.location}</td>
  </tr>
);

const Customers = () => {
  const limit = "10";
  const [dataShow, setDataShow] = useState([]);
  useEffect(() => {
    const initDataShow =
      limit && customerList
        ? customerList.slice(0, Number(limit))
        : customerList;

    setDataShow(initDataShow || []);
  }, [limit, customerList]);
  return (
    <div>
      <h2 className="page-header">customers</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit={limit}
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={customerList}
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

export default Customers;
