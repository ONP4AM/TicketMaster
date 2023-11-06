import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'antd';

const StyledContentContainer = styled.div`
  overflow: hidden;
  max-height: 200px; /* Adjust as needed */
`;

const BrowserComponent = ({ injection, url, ticket, setUrl, content, setContent, ruleName }) => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (injection && url) {
  //       try {
  //         const proxyUrl = 'http://localhost:8080';
  //         const urlMain = `${proxyUrl}/${url}`;
  //         const response = await axios.get(urlMain);
  //         const data = response.data;
  //         console.log('Data from response:', data);
  //         setContent(data);
  //         console.log('Content state after setting:', content);
  //       } catch (error) {
  //         console.error(error);
  //         if (error.response) {
  //           // Set the HTTP status code as content
  //           setContent(`HTTP Status Code: ${error.response.status}`);
  //         } else {
  //           setContent('An error occurred');
  //         }
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [url, injection]);

  const openUrlInNewTab = () => {
    if (url) {
      const newTab = window.open(url, '_blank');
      if (newTab) {
        newTab.focus();
      } else {
        console.error('Unable to open a new tab.');
      }
    }
  };

  return (
    <div>
      <div style={{ color: "white", backgroundColor: '#231f20', display: "flex" , JustifyContent:"center", alignItems: "center",textAlign:"center" ,flexDirection:"column" , padding:"20px"}}>
      <h2 >Injection Alert Detected: URL Found. Proceed with Caution</h2>

      <Button  onClick={openUrlInNewTab} type= "primary" style={{ borderRadius: '0', height: '50px', boxShadow :"none",  backgroundColor: '#231f20', color: 'white', border: 'none' , width : "150px"}} >
        
        Open In New Tab    

        </Button>
      {/* <div class="button-container">
        <button  onClick={openUrlInNewTab} class="neumorphic-button">
          <span class="button-text">Click Me</span>
        </button>
      </div> */}
          </div>

{/*    
      <StyledContentContainer>
   
        <iframe
          title="Embedded Content"
          srcDoc={content} 
          style={{ width: '100%', height: '100%' , marginTop: '50px' }}
        />
      </StyledContentContainer> */}
    </div>
  );
};

export default BrowserComponent;
