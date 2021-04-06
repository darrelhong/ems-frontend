import React from 'react';
import NVD3Chart from 'react-nvd3';

// class PieBasicChart extends React.Component {
//   render(categoryRankList) {
function getUniqueColor(n) {
  let color = [
    '156064',
    'F8E16C',
    '00C49A',
    'FFC2B4',
    'FB8F67',
    'FCD290',
    'A3C3D9',
    'E9ECF5',
    '993955',
    'C2E812',
  ];

  return color[n];
}
const PieBasicChart = (categoryRankList) => {
  let datum = [];
  var result = Object.keys(categoryRankList).map((key) => [
    categoryRankList[key],
  ]);
  //object
  console.log(result[0][0]);
  console.log(Object.keys(result[0][0])[1]);
  console.log(Object.keys(result[0][0]).length);
  console.log(Object.values(result[0][0]));

  for (var i = 0; i < Object.keys(result[0][0]).length; i++) {
    let categoryPair = {};
    categoryPair = {
      key: Object.keys(result[0][0])[i],
      y: Object.values(result[0][0])[i].toFixed(0),
      // color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
      color: '#' + getUniqueColor(i),
    };
    console.log(categoryPair);
    datum.push(categoryPair);
  }
  console.log(datum);

  // datum = [
  //   {
  //     key: 'Computers',
  //     y: result[0][0]['Computers'],
  //     color: '#ff8a65',
  //   },
  //   {
  //     key: 'Business Support & Supplies',
  //     y: result[0][0]['Business Support & Supplies'],
  //     color: '#f4c22b',
  //   },
  //   {
  //     key: 'Construction & Contractor',
  //     y: result[0][0]['Construction & Contractor'],
  //     color: '#04a9f5',
  //   },
  //   {
  //     key: 'Computers & Electronics',
  //     y: result[0][0]['Computers & Electronics'],
  //     color: '#3ebfea',
  //   },
  //   {
  //     key: 'Automotive',
  //     y: result[0][0]['Automotive'],
  //     color: '#4F5467',
  //   },
  // ];
  // console.log(datum);
  return (
    <NVD3Chart
      id="chart"
      height={300}
      type="pieChart"
      datum={datum}
      x="key"
      y="y"
      showLabels={false}
      showLegend={false}
    />
  );
};

export default PieBasicChart;
