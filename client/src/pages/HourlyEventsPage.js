import React from "react";
import InfoWrapper from "../components/InfoWrapper";
import { hourlyEvents } from "../data/data";
import { getHourlyEvents } from "../API/api";

const HourlyEventsPage = () => {
  React.useEffect(() => {
    getHourlyEvents().then((data) => setTableData(data));
  }, []);

  const [tableData, setTableData] = React.useState([]);
  console.log(hourlyEvents.chartTransform);

  return (
    <div>
      {tableData.length > 0 && (
        <InfoWrapper
          tableData={tableData}
          headerRow={hourlyEvents.headerRow}
          renderBodyRow={hourlyEvents.renderBodyRow}
          chartTransform={hourlyEvents.chartTransform}
        />
      )}
    </div>
  );
};

export default HourlyEventsPage;
