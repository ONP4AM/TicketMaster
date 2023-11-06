
import React, { useState } from 'react';
import { message , Tooltip} from 'antd';
import {CopyOutlined , RetweetOutlined , RightOutlined } from '@ant-design/icons';

const RandomJSONSelector = ({selectedJsonObject,setSelectedJsonObject }) => {


  const jsonObject = [
    {
      "rule_name": "User Enumeration Attempt",
      "alert_severity": "Medium",
      "url_domain name": "example.com",
      "url_path": "/account",
      "url_query": "username=admin",
      "url_full": "http://example.com/account?username=admin",
      "http_status_code": 401,
      "http_method type": "GET",
      "source_ip": "192.168.1.100",
      "server_ip": "10.0.0.1",
      "source_geo_location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "city": "New York",
        "country": "United States"
      },
      "event_category": "Security",
      "cloud_id": "67890",
      "cloud_region": "us-east-1",
      "timestamp": "2023-10-30T08:45:00Z",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko)",
      "target_server": "webserver-02",
      "incident_id": "2023-67890",
      "client_browser": "Google Chrome",
      "client_os": "Windows 10",
      "referer": "http://example.com/",
      "request_headers": {
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "date_time": "2023-10-30T08:45:00Z"
    },
   ,{
        "rule_name": "AWS User Added to Security-Enabled Group",
        "alert_severity": "Medium",
        "user": "awsuser",
        "action": "Group Membership Change",
        "group_name": "Security Group",
        "event_category": "Security",
        "timestamp": "2023-11-02T11:20:00Z",
        "incident_id": "2023-98765",
        "description": "A user was added to a security-enabled group in AWS IAM.",
        "source_ip": "203.0.113.50",
        "user_role": "IAM Admin",
        "target_iam_user": "jane.doe",
        "target_iam_user_arn": "arn:aws:iam::123456789012:user/jane.doe",
        "policy_name": "ReadOnlyAccessPolicy",
        "policy_arn": "arn:aws:iam::123456789012:policy/ReadOnlyAccessPolicy",
        "cloud_account_id": "123456789012",
        "cloud_region": "us-east-1",
        "source_geo_location": {
          "latitude": 40.7128,
          "longitude": -74.0060,
          "city": "New York",
          "country": "United States"
        },
        "user_agent": "AWS Management Console",
        "target_server": "AWS IAM Console",
        "resource_type": "IAM Group",
        "resource_id": "arn:aws:iam::123456789012:group/SecurityGroup",
        "related_alerts": [
          "2023-98764",
          "2023-98766"
        ]
      }
      
      ,{
      "rule_name": "User Password Set to Never Expire",
      "alert_severity": "Medium",
      "user": "jane.smith",
      "action": "Password Policy Change",
      "password_policy": "Password Never Expires",
      "event_category": "Security",
      "timestamp": "2023-11-02T15:45:00Z",
      "source_ip": "192.168.1.100",
      "subject_user_name" : "admin_user",
      "target_user_group": "IT Department",
      "policy_setter": "admin_user",
      "policy_setter_ip": "10.0.0.1",
      "target_user_arn": "arn:aws:iam::123456789012:user/jane.smith",
      "previous_policy": "Password Expires in 90 Days",
      "cloud_account_id": "123456789012",
      "cloud_region": "us-east-1",
      "user_agent": "AWS Management Console",
      "target_server": "AWS IAM Console",
      "resource_type": "IAM User",
      "resource_id": "arn:aws:iam::123456789012:user/jane.smith",
      "related_alerts": ["2023-67891", "2023-67892"],
      "severity_reason": "User requested the change",
      "request_source": "AWS IAM Console"
    },{
      "rule_name": "SQL Injection Attempt",
      "alert_severity": "High",
      "url_domain name": "example.com",
      "url_path": "/login",
      "url_query": "username=admin&password=' OR '1'='1",
      "url_full": "http://example.com/login?username=admin&password=' OR '1'='1",
      "http_status_code": 200,
      "http_method type": "POST",
      "source_ip": "114.6.31.174",
    "server_ip" : "103.190.212.179",
      "source_geo_location": {
        "latitude": 37.7749,
        "longitude": -122.4194,
        "city": "San Francisco",
        "country": "United States"
      },
      "event_category": "Security",
      "cloud_id": "12345",
      "cloud_region": "us-west-2",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "target_server": "webserver-01",
      "incident_id": "2023-12345",
      "client_browser": "Google Chrome",
      "client_os": "Windows 10",
      "referer": "http://example.com/",
      "request_headers": {
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "date_time": "2023-10-29T15:30:00Z"
    },{
      "rule_name": "Directory Traversal Attempt",
      "alert_severity": "High",
      "file_path": "/etc/passwd",
      "action_taken": "Access Attempt Detected",
      "file_owner": "root",
      "user_attempting_access": "hacker123",
      "access_timestamp": "2023-10-29T16:45:00Z",
      "event_category": "Security",
      "cloud_id": "67890",
      "cloud_region": "us-east-1",
      "server_ip": "203.0.113.42",
      "source_ip": "88.99.176.54",
      "source_geo_location": {
        "latitude": 52.5200,
        "longitude": 13.4050,
        "city": "Berlin",
        "country": "Germany"
      },
      "target_server": "fileserver-01",
      "incident_id": "2023-67890",
      "request_headers": {
        "User-Agent": "curl/7.68.0",
        "Connection": "keep-alive"
      },
      "date_time": "2023-10-29T16:45:00Z"
    }
    
    
  ];

  const selectRandomJsonObject = () => {
    if (jsonObject.length > 0) {
      const randomIndex = Math.floor(Math.random() * jsonObject.length);
      setSelectedJsonObject(jsonObject[randomIndex]);
    }
  };

  const copyJSONToClipboard = () => {
    if (selectedJsonObject) {
      const jsonString = JSON.stringify(selectedJsonObject, null, 2);
      navigator.clipboard.writeText(jsonString)
        .then(() => message.info('JSON copied to clipboard')) 
        .catch(err => console.error('Copy failed: ', err));
    }
  };
  return (
    <div>
      

      <Tooltip title="Generate Random JSON Object" placement="top">
  <RetweetOutlined style={{ height: "30px", width: "30px" }} onClick={selectRandomJsonObject} />
</Tooltip>

<Tooltip title="Copy JSON" placement="top">
  <CopyOutlined style={{ marginRight: "30px", height: "30px", width: "30px" }} onClick={copyJSONToClipboard} />
</Tooltip>
      <pre>
        {selectedJsonObject ? JSON.stringify(selectedJsonObject, null, 2) : 'No JSON selected'}
      </pre>
    </div>
  );
};

export default RandomJSONSelector;