import React, { useState, useEffect } from "react";

import "./table.css";

const Table = (props) => {
  let pages = 1;
  let range = [];

  if (
    props.limit !== undefined &&
    Number(props.limit) > 0 &&
    props.bodyData?.length > 0
  ) {
    const page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    props.setDataShow(props.bodyData.slice(start, end));

    setCurrPage(page);
  };

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index)
                )}
              </tr>
            </thead>
          ) : null}

          {Array.isArray(props.dataShow) && props?.renderBody ? (
            <tbody>
              {props?.dataShow?.map((item, index) =>
                props?.renderBody(item, index)
              )}
            </tbody>
          ) : null}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
