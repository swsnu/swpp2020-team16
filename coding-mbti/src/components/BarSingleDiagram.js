/* eslint-disable no-unused-vars */
/* currently unused variables are `setSeries`, `setOptions` */

import React, { useState } from 'react';

import ReactApexCharts from 'react-apexcharts';
import PropTypes from 'prop-types';

export default function BarSingleDiagram(props) {
  const { one, another } = props;
  const [series, setSeries] = useState([{
    name: one,
    data: [44, 55, 41, 37, 22, 43, 21],
  }, {
    name: another,
    data: [53, 32, 33, 52, 13, 43, 32],
  }]);

  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: '',
    },
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
    },
    tooltip: {
      y: {
        formatter(val) {
          return `${val}K`;
        },
      },
    },
    fill: {
      opacity: 1,

    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  });

  return (
    <>
      <div id="chart">
        <ReactApexCharts
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
}

BarSingleDiagram.propTypes = {
  one: PropTypes.string.isRequired,
  another: PropTypes.string.isRequired,
};
