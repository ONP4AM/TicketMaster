import React, { useEffect, useState } from 'react';
import { Progress, Row, Col } from 'antd';
import { Badge, Descriptions } from 'antd';
import { Divider } from 'antd';
const AbuseIpdb = ({ apiKey, selectedIP, dataAbuseIpdb, setdataAbuseIpdb ,error,setError}) => {

  let percent = 0;
let items = 0;
let timeDifference = null;
 
  if (dataAbuseIpdb && dataAbuseIpdb.data && dataAbuseIpdb.data.abuseConfidenceScore) {
    percent = dataAbuseIpdb.data.abuseConfidenceScore;
   }
   if (dataAbuseIpdb && dataAbuseIpdb.data &&dataAbuseIpdb.data.lastReportedAt) {
    timeDifference = getTimeDifference(dataAbuseIpdb.data.lastReportedAt);
  }
  

  useEffect(() => {
    if(selectedIP && selectedIP != null){
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_ABUSEIPDB_API_KEY;
      const proxyUrl = 'http://localhost:8080';
      const apiUrl = 'https://api.abuseipdb.com/api/v2/check';
      const url = `${proxyUrl}/${apiUrl}`;
      const querystring = new URLSearchParams({
        ipAddress: selectedIP,
        maxAgeInDays: "30",
      });

      try {
        const response = await fetch(`${url}?${querystring.toString()}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Key: apiKey, 
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setdataAbuseIpdb(responseData);
          console.log(responseData)
          setError(null)
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        setError(`An error occurred: ${error}`);
      }
    };
    
    fetchData();

}
  }, [selectedIP]);

  function getTimeDifference(timestamp) {
    const currentDate = new Date();
    const reportedDate = new Date(timestamp);
    
    const timeDifference = currentDate - reportedDate;
    const minutesDifference = Math.floor(timeDifference / 1000 / 60);
    
    if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    } else if (minutesDifference < 1440) {
      const hours = Math.floor(minutesDifference / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(minutesDifference / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }
  
  
  
  function openAbuseIPDB() {

    if(dataAbuseIpdb && dataAbuseIpdb.data ){

    const ip =  dataAbuseIpdb.data.ipAddress
  
   
    const url = `https://www.abuseipdb.com/check/${ip}`;
  
   
    window.open(url, '_blank');
    }
  }
  

if(dataAbuseIpdb && dataAbuseIpdb.data ){

  items = dataAbuseIpdb.data
  ? [
      {
        key: '1',
        label: 'IP Address',
        children: dataAbuseIpdb.data.ipAddress,
      },
      {
        key: '2',
        label: 'Is Public',
        children: dataAbuseIpdb.data.isPublic ? 'Yes' : 'No',
      },
      {
        key: '3',
        label: 'IP Domain',
        children: dataAbuseIpdb.data.domain,
      },
      {
        key: '4',
        label: 'Is Whitelisted',
        children: dataAbuseIpdb.data.isWhitelisted ? 'Yes' : 'No',
      },
    
      {
        key: '5',
        label: 'distinct Sources',
        children: dataAbuseIpdb.data.numDistinctUsers,
      },
      {
        key: '7',
        label: 'Recent report',
        children: timeDifference,
      },
    
    ]
  : [];

  }
  return (
    <div > 
      
      {error ? (
        <div>Error: {error}</div>
      ) : dataAbuseIpdb ? (
        <div>
          {/* <pre>{JSON.stringify(dataAbuseIpdb, null, 2)}</pre> */}
        </div>
      ) : (
        <div></div>
      )}

     {dataAbuseIpdb && dataAbuseIpdb.data ? (
      
          <div >
           
            {/* <img src="https://www.abuseipdb.com/img/abuseipdb.png.pagespeed.ce.CI8T6WsXU7.png" width="260px"alt="#"/>
           */}
<h1 onClick={openAbuseIPDB} >AbuseIPDB</h1>
          <Col span={25} style={{ backgroundColor: "white"  }}>
                  <h3>This IP was reported {dataAbuseIpdb.data.totalReports} times. Confidence of Abuse is : {dataAbuseIpdb.data.abuseConfidenceScore} </h3>
                  <Progress percent={percent} showInfo={false} strokeColor={ '#cc0000'} />
                  <Descriptions layout="vertical" bordered items={items} className="custom-descriptions" />
          </Col>

          </div>
        

     ):(
      <div></div>
     )
     }
        
        <Divider dashed />
    </div>
  );
};

export default AbuseIpdb;
