import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = ({ chartData, weekly }) => {
  const minChartTemp = Math.min(
    ...chartData.map((item) => item["Forecast temperature"])
  );
  const maxChartTemp = Math.max(
    ...chartData.map((item) => item["Forecast temperature"])
  );

  return (
    <LineChart width={weekly ? 1000 : 500} height={500} data={chartData}>
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis
        domain={[
          minChartTemp < 8 ? minChartTemp : 7,
          maxChartTemp > 8 ? maxChartTemp : 9,
        ]}
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Limit temperature"
        stroke="#FF5733"
        activeDot={{ r: 4 }}
      />
      <Line type="monotone" dataKey="Forecast temperature" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;
