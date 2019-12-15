import React from "react";
import { Line } from "react-chartjs-2";

const DefaultChart = ({ data, chartTransform, ...props }) => {
  const transformedData = chartTransform(data);
  const { datasets: chartData, options: chartOptions } = transformedData;

  return data.length > 0 && <Line data={chartData} options={chartOptions} />;
};

export default DefaultChart;
