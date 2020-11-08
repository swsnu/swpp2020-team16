/* eslint-disable no-unused-vars */
/* currently unused variables are `setSeries`, `setOptions` */

import React, { useState } from 'react';

import ReactApexCharts from 'react-apexcharts';
import PropTypes from 'prop-types';

const colorPalette = [
  ['#81B622', '#3D550C'],
  ['#3D5B59', '#FCB5AC'],
  ['#189AB4', '#75E6DA'],
  ['#21B6A8', '#A3EBB1'],
];

export default function BarSingleDiagram(props) {
  const { measures, color } = props;
  const [series, setSeries] = useState([{
    name: measures.one,
    data: [44, 55, 41, 37, 22, 43, 21],
  }, {
    name: measures.another,
    data: [53, 32, 33, 52, 13, 43, 32],
  }]);

  const [options, setOptions] = useState({
    colors: colorPalette[color],
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
  measures: PropTypes.objectOf(PropTypes.string).isRequired,
  color: PropTypes.number.isRequired,
};
