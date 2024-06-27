// src/components/DataView.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Level0 } from './Level0';

const monthsCurrent = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo' ];

const DataView = () => {
  const [dataInfo, setDataInfo] = useState(null);
  const [months, setMonths] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/data');
        const responseData = response.data;
        console.log({
          data: responseData
        })
        setDataInfo( responseData );
        setMonths( responseData.months );
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <td>Agrupación por</td>
          {months && months.map((e, index) => (
            <td style={{ /*textAlign: 'right'*/ }} key={index}>{ e }</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          dataInfo &&
          <Level0 data={ dataInfo } />
        }
      </tbody>
    </table>
  );
};

export default DataView;