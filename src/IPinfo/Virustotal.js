import React, { useEffect } from 'react';
import axios from 'axios';
import { Progress, Row, Col } from 'antd';
import { Divider } from 'antd';
const VirusTotal = ({ selectedIP, setData, data ,  setError, error}) => {
  let lastAnalysisStats = null;
  let maliciousValue = 0;
  let totalValue = 0;
  let percent = 0;

  if (data && data.data && data.data.attributes && data.data.attributes.last_analysis_stats) {
    lastAnalysisStats = data.data.attributes.last_analysis_stats;
    maliciousValue = lastAnalysisStats.malicious;
    totalValue = Object.values(lastAnalysisStats).reduce((acc, val) => acc + val, 0);
    percent = Math.round((maliciousValue / totalValue) * 100); // Use Math.round to round the percentage to an integer

  }



  useEffect(() => {

    if(selectedIP && selectedIP.length > 0){
    const ipAddress = selectedIP;

    const apiKey = process.env.REACT_APP_VIRUSTOTAL_API_KEY;
    const proxyUrl = 'http://localhost:8080'; // Adjust to match your proxy server address
    const apiUrl = `https://www.virustotal.com/api/v3/ip_addresses/${ipAddress}`;

    const config = {
      method: 'GET',
      url: `${proxyUrl}/${apiUrl}`,
      headers: {
        accept: 'application/json',
        'x-apikey': apiKey,
      },
    };

    axios
      .request(config)
      .then(function (response) {
        console.log(response.data, "virustotal");
        // You can update your component's state with the data if needed.
        setData(response.data)
        setError(null)
      })
      .catch(function (error) {
        console.error(error);
      });

    }
  }, [selectedIP]);


   
  function openVirusTotal() {

    if(selectedIP){

    const ip =  selectedIP
  
    // Construct the URL with the IP variable.
    const url = `https://www.virustotal.com/gui/ip-address/${ip}`;
  
    // Open a new window with the constructed URL.
    window.open(url, '_blank');
    }
  }
 



  
  return (
<div >

  {error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <div>
           {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
        </div>
      ) : (
        <div></div>
      )}
      {data ? (
        <div > 
        <div >
          <div onClick={openVirusTotal} style={{width:"270px" ,height:"100px"}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 564.3 109" fill="currentColor">
          <path d="m158.6 78.7-17.1-48.6h8.9c10.5 30.5 11.9 34.8 13 38.6 1-3.5 2.6-8.2 13.5-38.6h8.9l-17.9 48.6h-9.3zM194.2 78.7V30.2h8.3v48.5zM299.6 58.3c0 6.6-.6 10.8-2.4 13.9-2.8 4.9-8.7 7.6-17.3 7.6-8.1 0-14.1-2.4-16.9-7.8-1.7-3.1-2.3-7.7-2.3-13.2V30.2h8.3v28.4c0 4 .3 6.8 1 8.6 1.2 3.1 4.2 5.5 10.3 5.5 5.3 0 8.5-1.8 10.1-5.1.8-1.7 1.6-4.9 1.6-8.9V30.2h7.6v28.1zM310.1 69.4c3.7 1.7 8.5 3.3 14.1 3.3 6.6 0 10-2.4 10-6.7 0-3.3-1.2-5.1-7.6-7.3l-6.8-2.3c-7.1-2.4-10.4-6.6-10.4-13.5 0-7.4 5.8-13.9 18.3-13.9 4.9 0 9.7.8 13.6 2.2l-1.8 6.9c-4-1.3-8.8-2.2-12.8-2.2-6.7 0-8.6 3.5-8.6 6.4 0 2.9.9 4.9 6.5 6.7l6.8 2.4c8.3 2.8 11.2 7.2 11.2 13.5 0 7.7-5.3 14.6-18.4 14.6-6.1 0-12-1.4-16.2-3.4l2.1-6.7zM365.5 78.7V37.8H351v-7.6h37.4v7.6h-14.5v40.9zM452.2 78.7V37.8h-14.5v-7.6h37.4v7.6h-14.5v40.9zM412 79.7c-14.1 0-23-11.8-23-25.8 0-15.4 9-24.8 24.2-24.8 14.6 0 22.2 11.3 22.3 24.8.1 13.9-8.7 25.8-23.5 25.8zm.6-43.6c-9.6 0-14.8 6-14.8 17.9 0 14.5 6.3 18.7 14.6 18.7 8.6 0 14.4-5.3 14.4-18.3.2-11.5-3.1-18.3-14.2-18.3zM473.4 78.7l18.7-48.6h9.6l18.2 48.6H511L506.1 66h-18.9l-5 12.8h-8.8zm30.5-19.8c-4.5-12.5-6-16.5-7-19.9-1.1 3.3-2.4 7.1-7.4 19.9h14.4zM527.9 78.7V30.2h9v41.2l24.2-.3.1 7.6zM0 5.9l48.7 48.6L0 103h107.5V5.9H0zm97.1 86.7H24.5l38.4-38.1-38.4-38.2h72.6v76.3zM240.8 57.7c7.2-2.4 10-7.5 10-13.7 0-6.7-3.5-10.9-8.6-12.5-3-.9-7.3-1.3-11.5-1.3h-15v48.6h8.3V58.9l2.8-.2c3.7 0 5.5.4 6.3.3L244 78.7h9.2l-12.4-21zm-2.2-6.6c-2 1.1-4.9 1.4-8.4 1.4H224V37.1h6.3c3.3 0 5.8.1 7.7.8 2.6 1 4 3.3 4 6.6-.1 3-1.2 5.4-3.4 6.6z" class="st0"></path>
          </svg>
          </div>
        

         
  
           <p> Flagged: {maliciousValue}/{totalValue}</p>
           <Col span={25}>
        <Progress percent={percent}  strokeColor={ '#cc0000'}  />
        </Col>
        
        </div>
        </div>
      ) : (
        <p></p>
      )}
      
    </div> 
  );
};

export default VirusTotal;












