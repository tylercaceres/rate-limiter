import React from "react";
import InfoWrapper from "../components/InfoWrapper";
import { dailyEvents } from "../data/data";
import { getDailyEvents } from "../API/api";

const DailyEventsPage = () => {
  React.useEffect(() => {
    getDailyEvents().then((data) => setTableData(data));
  }, []);

  const [tableData, setTableData] = React.useState([]);

  return (
    <div>
      {tableData.length > 0 && (
        <InfoWrapper
          tableData={tableData}
          headerRow={dailyEvents.headerRow}
          renderBodyRow={dailyEvents.renderBodyRow}
          chartTransform={dailyEvents.chartTransform}
        />
      )}
    </div>
  );
};

export default DailyEventsPage;
