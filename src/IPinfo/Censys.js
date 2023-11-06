import React, { useEffect } from 'react';
import axios from 'axios';
import { Collapse, Table, Descriptions, Tag } from 'antd';

const { Panel } = Collapse;

const renderDnsNames = (names) => (
  <ul>
    {names.map((name, index) => (
      <li key={index}>{name}</li>
    ))}
  </ul>
);

const renderServices = (services) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <Descriptions title="OpenPorts" bordered>
      {services.map((service, index) => (
        <Descriptions.Item key={index}>
          <Descriptions bordered>
            <Descriptions.Item>
              {service._decoded}
            </Descriptions.Item>
            <Descriptions.Item >
              {service.port}
            </Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

const parseJSONIfPossible = (value) => {
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (error) {
    return value;
  }
};

const renderLocation = (location) => {
  if (!location) {
    return null;
  }

  const parsedLocation = {};

  // Parse JSON values within the location object
  for (const key in location) {
    parsedLocation[key] = parseJSONIfPossible(location[key]);
  }

  return (
    <Descriptions title="Location" bordered>
      {Object.keys(parsedLocation).map((key) => (
        <Descriptions.Item label={key} key={key}>
          {typeof parsedLocation[key] === 'object' ? (
            // If the value is an object, render it as JSON
            <pre>{JSON.stringify(parsedLocation[key], null, 2)}</pre>
          ) : (
            // If the value is not an object, display it as plain text
            parsedLocation[key]
          )}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};


const renderLastUpdated = (lastUpdated) => {
  if (!lastUpdated) {
    return null;
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const localLastUpdated = new Date(lastUpdated);
  const formattedLastUpdated = localLastUpdated.toLocaleDateString(undefined, options);

  return (
    <Descriptions title="Last Updated" bordered>
      <Descriptions.Item label="Last Updated">
        {formattedLastUpdated}
      </Descriptions.Item>
    </Descriptions>
  );
};

const Censys = ({ selectedIP,  setDataCensys, dataCensys , setError }) => {

  


  useEffect(() => {
    if (selectedIP) {
      const ipAddress = selectedIP;
      const apiUrl = `https://search.censys.io/api/v2/hosts/${ipAddress}`;
      const apiId =  "";
      const apiSecret =  "";
      const proxyUrl = 'http://localhost:8080'; 
      const authString = `${apiId}:${apiSecret}`;
      const encodedAuth = btoa(authString); 


      const config = {
        method: 'GET',
        url: `${proxyUrl}/${apiUrl}`,
        headers: {
          accept: 'application/json',
          Authorization: `Basic ${encodedAuth}`,
        },
      };

      axios
        .request(config)
        .then(function (response) {
          setDataCensys(response.data);
          console.log((response.data))
          setError(null);
        })
        .catch(function (error) {
          console.error(error);
          setError(error.message);
        });
    }
  }, [selectedIP]);


  const svgStyle = {
    width: "280px",
    height: "60px",
    marginBottom : "20px"
  
  };

  return (
    <div>
      {dataCensys && dataCensys.result && (
        <>
           <div>
      <img src="https://censys.com/wp-content/themes/censys/images/logo.svg" alt="Your SVG Image" style={svgStyle} />
    </div>
      <h3>IP Address  : {selectedIP}</h3>
    <div>
    {dataCensys.result.dns && dataCensys.result.dns.names && (
      <Collapse >
        <Collapse.Panel header="DNS Names" key="dns-names">
          <Descriptions title="DNS Names" bordered>
            {dataCensys.result.dns.names.map((name, index) => (
              <Descriptions.Item key={index}>
                {name}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Collapse.Panel>
      </Collapse>
    )}

<Collapse>
        <Collapse.Panel header="Open Ports">
    {dataCensys.result.services && renderServices(dataCensys.result.services)}

    </Collapse.Panel>
      </Collapse>
    {dataCensys.result.location && (
      <Descriptions title="Location" bordered>
        {Object.keys(dataCensys.result.location).map((key) => (
          <Descriptions.Item label={key} key={key}>
            {typeof dataCensys.result.location[key] === 'object' ? (
              <pre>
                {JSON.stringify(dataCensys.result.location[key], null, 2)}
              </pre>
            ) : (
              dataCensys.result.location[key]
            )}
          </Descriptions.Item>
        ))}
      </Descriptions>
    )}
    {dataCensys.result.last_updated_at && renderLastUpdated(dataCensys.result.last_updated_at)}
  </div>
        </>
      )}
    </div>
  );
};
export default Censys;


