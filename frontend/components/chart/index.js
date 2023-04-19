/**
 * Chart component
 * 
 *
 * @module components/chart
 * @requires react
 * @requires react-chartjs-2
 * @requires chart.js
 */



import React from 'react';

import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, ArcElement);

const graphColours = ['#569DAA', '#B9EDDD', 'red'];

const Incidentsdata = [
  // Data for January
  [99, 32, 3],
  // Data for February
  [79, 94, 8],
  // Data for March
  [23, 12, 1],
  // Data for April
  [50, 43, 4],
  // Data for May
  [12, 23, 2],
  // Data for June
  [33, 109, 5],
  // Data for July
  [44, 12, 0],
  // Data for August
  [5, 43, 10],
  // Data for September
  [38, 23, 6],
  // Data for October
  [19, 109, 7],
  // Data for November
  [10, 12, 9],
  // Data for December
  [99, 43, 11]
];

const generateData = (incoming, resolved, overdue) => {
  return {
    labels: [
      'Number of incoming Incidents',
      'Number of resolved Incidents',
      'Number of overdue Incidents'
    ],
    datasets: [
      {
        data: [incoming, resolved, overdue],
        backgroundColor: graphColours,
        borderWidth: 1,
        hoverOffset: 4,
      }
    ]
  };
};

export default () => (
  <div>

    <h2>History</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {Incidentsdata.map((data, index) => (
        <div key={index} style={{ flexBasis: '31%', marginBottom: '20px' }}>
          <h3>{index + 1}. {data[0]} Incidents in {index + 1}:</h3>
          <Pie
            data={generateData(...data)}
            height={80}
            width={160}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                }
              }
            }}
          />
        </div>
      ))}
    </div>

  </div>
);

