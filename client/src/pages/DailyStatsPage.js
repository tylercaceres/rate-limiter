import React from "react";
import InfoWrapper from "../components/InfoWrapper";
import { dailyStats } from "../data/data";
import { getDailyStats } from "../API/api";

const DailyStatsPage = () => {
  React.useEffect(() => {
    getDailyStats().then((data) => setTableData(data));
  }, []);

  const [tableData, setTableData] = React.useState([]);

  return (
    <div>
      {tableData.length > 0 && (
        <InfoWrapper
          tableData={tableData}
          headerRow={dailyStats.headerRow}
          renderBodyRow={dailyStats.renderBodyRow}
          chartTransform={dailyStats.chartTransform}
        />
      )}
    </div>
  );
};

export default DailyStatsPage;
