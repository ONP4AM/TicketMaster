import React, { useEffect, useState } from 'react'
import { Progress, Row, Col } from 'antd';

import { Divider } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card,Statistic } from 'antd';
const CriminalIp = ({ selectedIP, setData, dataCriminal ,setDataCriminal,error , setError}) => {


  const [dummy ,setDummy] = useState("dummy");
  useEffect(() => {

    if(selectedIP && selectedIP != null){
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_CRIMINAL_API_KEY; 
        const ipAddress = selectedIP; 
        const proxyUrl = 'http://localhost:8080';


        const apiUrl = `https://api.criminalip.io/v1/feature/ip/suspicious-info?ip=${ipAddress}`;
 

      
        const url = `${proxyUrl}/${apiUrl}`;

        const response = await fetch(url, {
                      headers: {
                      'x-api-key': apiKey,
                 },
                   });

        if (response.ok) {
          const responseData = await response.json();
          setDataCriminal(responseData);
          setError(null)
          console.log(responseData)
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }

  }, [selectedIP]);

  const scoreMapColor = {
    Safe: '#3d85c6',
    Low: '#6aa84f',
    Moderate: '#f1c232',
    Dangerous: '#e69138',
    Critical: '#cc0000',
  };

  const scoreMap = {
    Safe: 0,
    Low: 25,
    Moderate: 50,
    Dangerous: 75,
    Critical: 100,
  };

  let issues; 

if (dataCriminal && dataCriminal.issues) {
  issues = dataCriminal.issues;
} else {
  issues = []; 
}

let dynamicColorInbound = '#000'

if (dataCriminal) {
  dynamicColorInbound = scoreMapColor[dataCriminal.score.inbound] || '#000';

}
let dynamicColorOutbound = '#000'

if (dataCriminal) {
  dynamicColorOutbound = scoreMapColor[dataCriminal.score.outbound] || '#000';

}
  
  const renderTrueIssues = (issues) => {
    const elements = [];
    for (const key in issues) {
      if (issues[key] === true) {
        const transformedKey = transformKey(key);
        // Split the transformed key by whitespace and remove the first word
        const [, ...words] = transformedKey.split(' ');
  
        elements.push(
          <div key={key}>
            <h3>{words.join(' ')}</h3>
          </div>
        );
      }
    }
    return elements;
  };


  function transformKey(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  }

  return (
    <div >
     
      {error ? (
        <div>Error: {error}</div>
      ) : dataCriminal ?(
        <div>

<div className ="criminal_logo" ></div>
 <Row gutter={16} style={{ width: "100%" }}>
  <Col span={12}>
    <Card bordered={false}>
      <Statistic
        title="outbound"
        value={scoreMap[dataCriminal.score.outbound]}
        precision={0}
        valueStyle={{
          color : dynamicColorOutbound
        }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  </Col>
  <Col span={12}>
    <Card bordered={false}>
      <Statistic
        title="inbound"
        value={scoreMap[dataCriminal.score.inbound]}
        precision={0}
        valueStyle={{
          color : dynamicColorInbound
        }}
        prefix={<ArrowDownOutlined />}
        suffix="%"
      />
    </Card>
  </Col>
</Row>

    
      {dataCriminal.representative_domain ?(
        <div>
            <h2>Representative Domain</h2>

            <h3>{dataCriminal.representative_domain}</h3>
        </div>
      ):(
        <div></div>
      )
      }
      
        </div>
        
      ) : (
        <div></div>
      )}
   <Divider dashed />
    </div>
    
  );
};

export default CriminalIp;




