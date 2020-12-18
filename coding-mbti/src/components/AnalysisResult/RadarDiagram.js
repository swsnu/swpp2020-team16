/* eslint-disable no-unused-vars */
/* currently unused variables are `setSeries`, `setOptions` */
import React, { useState } from 'react';

import ReactApexCharts from 'react-apexcharts';
import PropTypes from 'prop-types';

export default function RadarDiagram(props) {
  const { analysisData } = props;
  const [series, setSeries] = useState([
    {
      name: 'User Analysis',
      data: analysisData,
    },
  ]);

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
      align: 'center',
    },
    xaxis: {
      categories: [
        'User Friendly',
        'Carefully type',
        'Time Complexity',
        'Rabbit',
        'Machine Efficiency',
        'Just type',
        'Intutive Code',
        'Turtle',
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

RadarDiagram.propTypes = {
  analysisData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};
