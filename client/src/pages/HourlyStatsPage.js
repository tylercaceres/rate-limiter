import React from "react";
import InfoWrapper from "../components/InfoWrapper";
import { hourlyStats } from "../data/data";
import { getHourlyStats } from "../API/api";

const HourlyStatsPage = () => {
  React.useEffect(() => {
    getHourlyStats().then((data) => setTableData(data));
  }, []);

  const [tableData, setTableData] = React.useState([]);

  return (
    <div>
      {tableData.length > 0 && (
        <InfoWrapper
          tableData={tableData}
          headerRow={hourlyStats.headerRow}
          renderBodyRow={hourlyStats.renderBodyRow}
          chartTransform={hourlyStats.chartTransform}
        />
      )}
    </div>
  );
};

export default HourlyStatsPage;
