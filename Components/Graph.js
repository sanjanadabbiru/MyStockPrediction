import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';
import datacsv from './data.csv';
import { VictoryBar, VictoryChart, VictoryLine ,VictoryTheme} from 'victory';


const row = d => {
  d.Date = +d.Date;
  return d;
};
 
function Graph() {
   
  const [data, setData] = useState([]);
  
  useEffect(() => {
    csv(datacsv,row).then(setData);
  }, []);
  
  return (
    <VictoryChart
    theme={VictoryTheme.material}
    >
      <VictoryLine data={data} x="22" y="High" />
    </VictoryChart>
  );
  }

  export default Graph;