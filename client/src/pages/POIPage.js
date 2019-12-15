import React from "react";
import InfoWrapper from "../components/InfoWrapper";
import { getPOI,getPOIData } from "../API/api";
import {Redirect} from 'react-router-dom'

const POIPage = () => {
  React.useEffect(() => {
    getPOI().then((data) => setMarkerData(data));
    getPOIData().then(data=>setTableData(data));
  }, []);

  const [tableData, setTableData] = React.useState([]);
  const [markerData,setMarkerData] = React.useState([]);

  console.log(tableData);
  console.log(markerData);

  return (
    <div>
      {tableData.length > 0 && (
        <InfoWrapper
          tableData={tableData}
          markerData={markerData}
          // headerRow={poi.headerRow}
          // renderBodyRow={poi.renderBodyRow}
          // chartTransform={poi.chartTransform}
          createGeoGraph={true}
          createTable={false}
          createChart={false}
        />
      )}
    </div>
  );
};

export default POIPage;
