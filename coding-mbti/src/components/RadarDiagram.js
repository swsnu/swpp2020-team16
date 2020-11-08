/* eslint-disable no-unused-vars */
/* currently unused variables are `setSeries`, `setOptions` */
import React, { useState } from 'react';

import ReactApexCharts from 'react-apexcharts';

export default function RadarDiagram() {
  const [series, setSeries] = useState([{
    name: 'User Analysis',
    data: [80, 50, 30, 40, 100, 10, 30, 40],
  }]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'radar',
      toolbar: {
        show: false,
      },
    },
    title: {
      text: 'Radar Analysis',
    },
    xaxis: {
      categories: [
        'User Friendly', 'Carefully type', 'Time Complexity', 'Formatted Style',
        'Machine Efficiency', 'Just type', 'Intutive Code', 'Easy Style',
      ],
    },
  });
  return (
    <>
      <div id="chart">
        <ReactApexCharts
          options={options}
          series={series}
          type="radar"
          height={350}
        />
      </div>
    </>
  );
}
