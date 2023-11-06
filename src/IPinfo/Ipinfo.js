import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Descriptions, Spin, Alert, Row, Col } from 'antd'; // Import Descriptions, Spin, Alert, Row, and Col from Ant Design

import IPaddress from '../Components/IPaddress';

function Ipinfo({ dataIpInfo, setDataIpInfo, selectedIP, setLoading, loading, setError, error }) {
  useEffect(() => {
    if (selectedIP) {
      const IpAddress = selectedIP;
      const API_TOKEN = '';
      axios
        .get(`https://ipinfo.io/${IpAddress}/json?token=${API_TOKEN}`)
        .then((response) => {
          setDataIpInfo(response.data);
        })
        .catch((err) => {
          console.error('Error fetching IP information:', err);
        });
    }
  }, [selectedIP]);

  const svgStyle = {
  // Invert the colors to make it black
    width: "250px",
    height: "60px",
    marginLeft :'-20px',
    marginBottom : "20px",
    marginTop: '20px',
  
  };

  return (
    <div>
        <div>
      <img src="https://cdn.ipinfo.io/static/images/layout/logo.svg" alt="Your SVG Image" style={svgStyle} />
    </div>
      <Row gutter={[16, 16]}>
     
      <Col {...{ xs: 24, sm: 12, md: 16, lg: 18, xl: 18, xxl: 18 }}>
   
        {dataIpInfo ? (
          <Descriptions bordered>
            <Descriptions.Item label="Hostname">{dataIpInfo.hostname}</Descriptions.Item>
          </Descriptions>
        ) : null}
      </Col>
        

      <Col {...{ xs: 24, sm: 12, md: 16, lg: 18, xl: 18, xxl: 18 }}>
      
        {dataIpInfo ? (
          <Descriptions  bordered>
            <Descriptions.Item label="IP Address">{dataIpInfo.ip}</Descriptions.Item>
          </Descriptions>
        ) : null}
      </Col>

        {dataIpInfo ? (
          <Descriptions title="IP Details" bordered>
        
             
          
            <Descriptions.Item label="City">{dataIpInfo.city}</Descriptions.Item>
            <Descriptions.Item label="Region">{dataIpInfo.region}</Descriptions.Item>
            <Descriptions.Item label="Country">{dataIpInfo.country}</Descriptions.Item>
            <Descriptions.Item label="Location">{dataIpInfo.loc}</Descriptions.Item>
            <Descriptions.Item label="Organization">{dataIpInfo.org}</Descriptions.Item>
          </Descriptions>
        ) : loading ? (
          <Spin size="large" />
        ) : (
          <Alert message="Error" description={error} type="error" />
        )}
    
    </Row>
    </div>
  );
}

export default Ipinfo;



