import React from 'react';
import { Table } from 'antd';
import { keyTranslations } from '../Functions/Functions'; // Import your utility function

const styleKey = {
  flexBasis: '20%',
  marginRight: '10px',
  fontWeight: 'bold',
};

const styleValue = {
  flexBasis: '50%',
};
const widthsize = {
    width :"40%",
  };
  
const styleValueObject = {
  fontWeight: 'normal',
  marginLeft: '90px',
};

function transformKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
}

const renderJSONData = (data) => {
  return Object.keys(data).map((key) => {
    const value = data[key];
    const transformedKey = transformKey(key);

    if (typeof value === 'object') {
      return (
        <div style={{width :"50%"}}>
        <div key={key}>
          <div style={styleKey}>
            {keyTranslations[key] ? keyTranslations[key] : transformedKey}:
            <div style={styleValueObject}>{renderJSONData(value)}</div>
          </div>
        </div>
        </div>
      );
    } else {
      return (
        <div style={{width :"50%"}}>
        <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={styleKey}>
            {keyTranslations[key] ? keyTranslations[key] : transformedKey}:
          </div>
          <div style={styleValue}>{value}</div>
        </div>
</div>
      );
    }
  });
};

const MyAntDesign = ({ data }) => {
    const columns = [
        {
          title: 'Key',
          dataIndex: 'key',
          render: (text) => keyTranslations(text), // Apply keyTranslations to capitalize the first letter of each word
          style: { fontSize: '14px' },
          width: '30%',
        },
        {
          title: 'Value',
          dataIndex: 'value',
        },
      ];
      
      

const dataSource = createDataSource(data);

function createDataSource(data, parentKey = '') {
  return Object.keys(data).map((key) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    const value = data[key];

    if (typeof value === 'object' && !Array.isArray(value)) {
      return createDataSource(value, currentKey); // Recursively create key-value pairs
    }

    return {
      key: currentKey,
      value: JSON.stringify(value).replace(/"/g, ''), // Remove double quotes
    };
  }).flat(); // Flatten the array to handle nested objects
}
  return (
    
    <Table columns={columns} dataSource={dataSource} scroll={{ x: '50%' }} />
  );
};

export default MyAntDesign;
