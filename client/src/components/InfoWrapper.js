import React from "react";
import moment from "moment";
import DefaultTable from "./DefaultTable";
import DefaultChart from "./DefaultChart";
import Mark from "mark.js";
import DefaultGeoGraph from "./DefaultGeoGraph";
import { Segment, Input } from "semantic-ui-react";

import "./InfoWrapper.css";

const InfoWrapper = ({
  tableData,
  markerData,
  headerRow,
  renderBodyRow,
  chartTransform,
  createGeoGraph = false,
  createTable = true,
  createChart = true,
  ...props
}) => {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [currentData, setCurrentData] = React.useState(tableData);

  const instance = new Mark("div.context");
  instance.unmark(globalFilter);
  instance.mark(globalFilter, { className: "highlight" });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(currentData.length / rowsPerPage);

  const filterData = (searchTerm) => {
    if (searchTerm === "") {
      return tableData;
    }
    let foundData = tableData.filter((row) => {
      for (const field in row) {
        if (field === "date") {
          if (
            moment(row[field])
              .format("DDD MMMM YYYY")
              .includes(searchTerm)
          ) {
            return row;
          }
        } else {
          let stringObj = new String(row[field]);
          let stringObjString = stringObj.toString();
          if (stringObjString.includes(searchTerm)) {
            return row;
          }
        }
      }
    });
    return foundData;
  };

  const handleFilterChange = (e) => {
    setGlobalFilter(e.target.value);
    setCurrentData(filterData(e.target.value));
  };

  return (
    <div>
      {createTable && (
        <>
          <Segment inverted>
            <Input
              style={{ display: "flex", width: "25%" }}
              value={globalFilter}
              onChange={handleFilterChange}
              inverted
              placeholder="Global Filter..."
            />
          </Segment>
          {/* <input placeholder="Global Filter" value={globalFilter} onChange={handleFilterChange} /> */}
          <div className="context">
            <DefaultTable
              headerRow={headerRow}
              renderBodyRow={renderBodyRow}
              currentData={currentData}
            />
          </div>
        </>
      )}
      {createChart && <DefaultChart data={currentData} chartTransform={chartTransform} />}
      {createGeoGraph && currentData.length > 0 && (
        <DefaultGeoGraph data={currentData} markerData={markerData} />
      )}
    </div>
  );
};

export default InfoWrapper;
