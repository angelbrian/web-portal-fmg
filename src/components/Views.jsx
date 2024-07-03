// src/components/DataView.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Level0 } from './Level0';
import LoadingScreen from './LoadingScreen';
import JoyrideTutorial from './JoyrideTutorial';
import ColorFilter from './Filter';
import { Box } from '@mui/material';
import { colors } from '../../public/styles/colors';

const monthsCurrent = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

const DataView = () => {
  const [dataInfo, setDataInfo] = useState(null);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleSelectedColors = ( colors, obj ) => {
    const data = obj['data'];

    let obv = {};
    for (const key in data) {

      let tempData = {};
      for (const i in data[key]) {
        if( colors.includes( i ) ) {
          tempData[i] = data[key][i];
        }
      }
      // if ( Object.keys( tempData ).length === 0 )
        obv[key] = tempData;
      
    }
    obj = {
      ...obj,
      data: obv,
      companies: colors,
    }
    
    return obj;

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://ws.katalabs.mx/api/data');
        const responseData = response.data;
        console.log({
          data: responseData
        });
        
        setSelectedColors(Object.entries( colors() ).map( key =>  ( key[0] ) ));
        // handleSelectedColors( Object.entries( colors() ).map( key =>  ( key[0] ) ), responseData.data );
        handleSelectedColors( Object.entries( colors() ).map( key =>  ( key[0] ) ), responseData );

        setDataInfo(responseData);
        setMonths(responseData.months);
        
        if(!localStorage.getItem('tour')) {
          setTutorialOpen(true);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleFilterChange = (colorKey, isChecked) => {
    setSelectedColors((prevSelectedColors) => {
      if (isChecked) {
        return [colorKey, ...prevSelectedColors];
      } else {
        return prevSelectedColors.filter((key) => key !== colorKey);
      }
    });
  };
  
  const filteredDataInfo = selectedColors.length
    ? handleSelectedColors( selectedColors, dataInfo )
    : null;

  return (
    <>
      <Box display="flex" justifyContent="center" mb={2}>
        <ColorFilter selectedColors={ selectedColors } onChange={ handleFilterChange } colors={ colors() } />
      </Box>
      <table>
        <thead>
          <tr>
            <td className='padding-custom' style={{ backgroundColor: 'gray', width: '50%', textAlign: 'left', fontWeight: 'bold', color: 'white', fontSize: '18px' }}>AGRUPACIÓN POR</td>
            {months && months.map((e, index) => (
              <td className='t-r padding-custom' style={{ backgroundColor: 'gray', fontWeight: 'bold', color: 'white', fontSize: '18px' }} key={index}>{e.toUpperCase()}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {dataInfo && <Level0 data={dataInfo} />} */}
          {filteredDataInfo && <Level0 dataInit={dataInfo} data={filteredDataInfo} filter={ selectedColors } />}
        </tbody>
      </table>
      <JoyrideTutorial
        run={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />
    </>
  );
};

export default DataView;
