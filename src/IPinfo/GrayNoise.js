// import React, { useEffect } from 'react';
// import axios from 'axios';

// const GrayNoise = ({ selectedIP,error, setError, dataGrayNoise,setDataGrayNoise }) => {
//   useEffect(() => {

//     console.log("ok")
//     console.log(process.env.REACT_APP_GRAYNOISE_API_KEY);
//     if (selectedIP && selectedIP  != null) {
//       const apiKey = process.env.REACT_APP_GRAYNOISE_API_KEY; // Replace with your actual API key
      
      
//       const ipAddress = selectedIP; 
//       const proxyUrl = 'http://localhost:8080'; // Adjust to match your proxy server address
//       const apiUrl = `https://api.greynoise.io/v3/community/${ipAddress}`;

//       const config = {
//        // You can use 'get' for GET requests.
//         url: `${proxyUrl}/${apiUrl}`,
//         method: 'GET', 
//         headers: {
//           accept: 'application/json',
//           key: apiKey,
//         },
//       };

//       axios
//         .request(config)
//         .then(response => {
//           console.log(response.data, "GrayNoise");
//           // You can update your component's state with the data if needed.
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }, [selectedIP]);

//   return (
//     <div>
//       {/* Your component's content */}
//     </div>
//   );
// };

// export default GrayNoise;



  // import React, { useEffect, useState } from 'react';

// const CriminalIp = ({Ipapi, setData, data}) => {
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your actual API key
//         const ipAddress = "1.1.1.1"; // Replace with the IP address you want to query
//         const url = `https://api.criminalip.io/v1/ip/data?ip=${ipAddress}&full=true`;

//         const response = await fetch(url, {
//           headers: {
//             'x-api-key': apiKey,
//           },
//         });

//         if (response.ok) {
//           const responseData = await response.json();
//           setData(responseData);
//         } else {
//           console.error(`Error: ${response.status} - ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//       }
//     };

//     fetchData();
//   }, [Ipapi]);

//   return (
//     <div>
//       <h1>IP Address Data:</h1>
//       {data && (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       )}
//     </div>
//   );
// };

// export default CriminalIp;


// import React, { useEffect, useState } from 'react'
// import { Progress, Row, Col } from 'antd';


// import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
// import { Card,Statistic } from 'antd';
// const GrayNoise = ({ selectedIP,error, setError, dataGrayNoise,setDataGrayNoise}) => {


//   useEffect(() => {

//     if(selectedIP && selectedIP != null){
//     const fetchData = async () => {
//       try {
//         const apiKey = process.env.REACT_APP_GN_API_KEY; 
//               const ipAddress = selectedIP; 
//               const proxyUrl = 'http://localhost:8080'; // Adjust to match your proxy server address
//               const apiUrl = `https://api.greynoise.io/v3/community/${ipAddress}`;
//               const url = `${proxyUrl}/${apiUrl}`;

//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             accept: 'application/json',
//             key: apiKey
//           }
//                    });

//         if (response.ok) {
//           const responseData = await response.json();
//           console.log(responseData)
//         } else {
//           console.error(`Error: ${response.status} - ${response.statusText}`);
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//       }
//     };

//     fetchData();
//   }

//   }, [selectedIP]);

  
//   return (
//         <div>
//           <h1>IP Address Data:</h1>
//           {/* {data && (
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//           )} */}
//         </div>
//       );
//     };

// export default GrayNoise;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GreyNoise = ({setDataGrayNoise , setLoading , dataGrayNoise , loading , selectedIP}) => {
  
  useEffect(() => {
    if (selectedIP) {
    const apiKey = process.env.REACT_APP_GN_API_KEY; // Replace with your GreyNoise API key
    const ipAddress = selectedIP; // Replace with the IP address you want to query
    const proxyUrl = 'http://localhost:8080'; // Adjust to match your proxy server address

    // Create the API endpoint without the base URL
    const baseUrl = `https://api.greynoise.io/v3/community/${ipAddress}`;
    
    // Combine the proxy URL and API endpoint to form the complete URL
    const apiUrl = `${proxyUrl}/${baseUrl}`;

    axios.get(apiUrl, {
      headers: {
        key:apiKey,
      },
    })
      .then((response) => {
        setDataGrayNoise(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error making GreyNoise API request:', error);
        setLoading(false);
      });
    }
  }, [selectedIP]);

  return (
    <div>
      <h2>GreyNoise API Response</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(dataGrayNoise, null, 2)}</pre>
      )}
    </div>
  );
};

export default GreyNoise;