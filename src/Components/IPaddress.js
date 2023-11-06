import React from 'react';
import { Divider, List, Button } from 'antd'; // Import a CSS file for custom styling

const IPaddress = ({ ipAddress, setSelectedIP, setSelectionType, selectionType }) => {
  const handleIPSelection = (index) => {
    setSelectionType(index);
    setSelectedIP(ipAddress[index]);
  };

  return (
    <div style={{ marginTop:"50px" , borderTop: "1px solid #c3c3c3"}}>
    

      <List
        dataSource={ipAddress}
        renderItem={(ip, index) => (
          <List.Item
            key={index}
            onClick={() => handleIPSelection(index)}
            style={{ cursor: 'pointer' }}
          >
            <Button type= "primary" style={{ borderRadius: '0', height: '50px', backgroundColor: '#231f20', color: 'white', border: 'none' , width : "150px"}}
              className={selectionType === index ? 'selected-button' : 'unselected-button'}
            >
              {ip}
            </Button  >
          </List.Item>
        )}
      />
    </div>
  );
};

export default IPaddress;
