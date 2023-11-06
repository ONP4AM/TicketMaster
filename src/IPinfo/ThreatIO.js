import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Progress, Row, Col } from 'antd';
import { Divider } from 'antd';
import { Descriptions, Button, Space } from 'antd';
const ThreatIO = ({ selectedIP, setDataThreat, dataThreat,error, setError}) => {


  useEffect(() => {
    
    if(selectedIP && selectedIP.length > 0){
    const ipAddress = selectedIP;

    const apiKey = process.env.REACT_APP_THREATBOOK_API_KEY;
    const proxyUrl = 'http://localhost:8080'; // Adjust to match your proxy server address
    const apiUrl = `https://api.threatbook.io/v1/community/ip?apikey=${apiKey}&resource=${ipAddress}`;

    const config = {
      method: 'GET',
      url: `${proxyUrl}/${apiUrl}`,
      headers: {
        accept: 'application/json',
      },
    };

    axios
      .request(config)
      .then(function (response) {
        console.log(response.data, "Threat");
        // You can update your component's state with the data if needed.
        setDataThreat(response.data)
        setError(null)
      })
      .catch(function (error) {
        console.error(error);
      });

    }
  }, [selectedIP]);



  let judgments = null;

  if (dataThreat && dataThreat.data && dataThreat.data.summary) {
     judgments = dataThreat.data.summary.judgments;
  
   };

  
   let items = 0;

if(dataThreat && dataThreat.data && dataThreat.data ){

  items = dataThreat.data.summary
  ? [
    {
      key: '1',
      label: 'First Seen ',
      children: dataThreat.data.summary.first_seen,
    },
    {
      key: '2',
      label: 'Last Seen',
      children: dataThreat.data.summary.first_seen,
    },
    
    ]
  : [];

  }

let summaryW = null;

  if (dataThreat && dataThreat.data && dataThreat.data.summary && dataThreat.data.summary.whitelist) {
    summaryW = dataThreat.data.summary.whitelist
  
  };


  function openThreatbook() {

    if(selectedIP){

    const ip =  selectedIP
  
  
    const url = `https://threatbook.io/ip/${ip}`;
  

    window.open(url, '_blank');
    }
  }
  return (
<div >

  {error ? (
        <div>Error: {error}</div>
      ) : dataThreat ? (
        <div>
        
        </div>
      ) : (
        <div></div>
      )}
     
        
        <div >
          
         {dataThreat && dataThreat.data && dataThreat.data.summary ? (
          <div>
          <h1 onClick ={openThreatbook} className="ThreatThreatBook_logo">ThreatBook</h1> 
      
          <Space direction="horizontal" size="middle">
      {judgments.map((judgment, index) => (
            <Button
              type="primary"
              key={index}
              style={{ backgroundColor: '#cc0000', boxShadow :"none", border: 'none', borderRadius: '0',fontSize: '16px', margin :"20px" }}
            >
              {judgment}
            </Button>
          ))}
        </Space>

        {summaryW && (
        <Button
          type="primary"
          style={{ backgroundColor: '#4CBB17', borderColor: '#4CBB17	', fontSize: '16px', margin: '20px', textAlign:"centerb",  border: 'none',borderRadius: '0', }}
        >
          Whitelist
        </Button>
      )}
          <Descriptions bordered items={items} />
        </div>

         ):(
            <div></div>
         )} 

        </div>
        <Divider dashed />
    </div> 
  );
};

export default ThreatIO;












