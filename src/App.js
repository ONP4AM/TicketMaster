import React, { useEffect, useState } from 'react';

import './App.css';


import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {CopyOutlined , RetweetOutlined , RightOutlined } from '@ant-design/icons';
import OpenAI from 'openai';
import DOMPurify from 'dompurify';
import RandomJSONSelector from './Components/RandomJSONSelector';
import IPaddress from './Components/IPaddress';
import MatrixRain from './Components/MatrixRain';
import CriminalIp from './IPinfo/CriminalIp';
import BrowserComponent from './Components/BrowserComponent';
import TerminalWindow from './Components/TerminalWindow';
import AbuseIpdb from './IPinfo/AbuseIpdb'
import GrayNoise from './IPinfo/GrayNoise';
import Ipinfo from './IPinfo/Ipinfo';
import Censys from './IPinfo/Censys';
import 'react-json-view-lite/dist/index.css';
import { Skeleton } from 'antd';
import {  renderJSONData , keyTranslations} from './Functions/Functions';
import { Space, Spin,Anchor, Col } from 'antd';
import { Input } from 'antd';
import { Button, Checkbox ,Drawer, Dragger ,Collapse, Table} from 'antd';


import VirusTotal from './IPinfo/Virustotal';
import ThreatIO from './IPinfo/ThreatIO';


const openAi = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// CSS class for the bold style
const boldKeyStyle = {
  fontWeight: 'bold',
};

const columns = [
  {
    // title: 'Key',
    dataIndex: 'key',
    key: 'key',
    width: '20%',
    render: (text) => {
      // Split the key by underscores, capitalize the first letter of each part,
      // and join them with spaces
      return (
        <span style={boldKeyStyle}>
          {text
            .split('_')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join(' ')}
        </span>
      );
    },
  },
  {
    // title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (text) => {
      if (typeof text === 'object') {
        return JSON.stringify(text, null, 2); // Indent for better formatting
      }
      return text;
    },
  },
];

const Row = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    ),
    transition,
    cursor: 'move',
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
        }
      : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const flattenObject = (obj, parentKey = '') => {
  const result = [];
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result.push(...flattenObject(obj[key], newKey));
    } else {
      result.push({ key: newKey, value: obj[key] });
    }
  }
  return result;
};



function App() {

  const [data, setData] = useState(null);
  const [dataCriminal, setDataCriminal] = useState(null);
  const [dataAbuseIpdb , setdataAbuseIpdb]  = useState(null);
  const  [dataGrayNoise, setDataGrayNoise] = useState(null);
  const [dataThreat , setDataThreat] = useState(null);
  const [dataCensys, setDataCensys]  = useState(null);
  const [dataIpInfo, setDataIpInfo] = useState(null);
  const [dataWhois, setDataWhois] = useState(null);
  const [ruleName, setRuleName] = useState();

  const [jsonInput, setJsonInput] = useState('');
  const [parsedJson, setParsedJson] = useState(null);
  const [impKeys, setImpKeys] = useState([]);


  const [response, setResponse] = useState('');
  const [ticket, setTicket] = useState({});

  const [value, setValue] = useState('horizontal');

//   BrowserComponent
  const [url, setUrl] = useState(null);
  const [content, setContent] = useState('');

  //IpAddress Component 

  const [ipAddress, setIpAddress] = useState([]);
  const [selectionType, setSelectionType] = useState('radio'); // Set selectionType to 'radio'
  const [selectedIP, setSelectedIP] = useState(null);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);


  const [injection , setInjection] = useState(false)
  // random json
/// Drawer   
const [visible, setVisible] = useState(false);



  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  //
  //clear state
  

   function clearAllStates ()  {
    setData(null);
    setDataCriminal(null);
    setdataAbuseIpdb(null);
    setDataGrayNoise(null);
    setDataCensys(null);
    setDataThreat(null);
    setRuleName(null);
    setJsonInput('');
    setParsedJson(null);
    setImpKeys([]);
    setResponse('');
    setTicket({});
    setValue('horizontal');
    setUrl(null);
    setContent('');
    setIpAddress([]);
    setSelectionType('radio');
    setSelectedIP(null);
    setLoading(false);
    setError(null);
    setInjection(false);
  };

  const [selectedJsonObject, setSelectedJsonObject] = useState(
    {
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
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
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
    }
    
  );
  const handleJsonInput = (event) => {
    setJsonInput(event.target.value);
  };


  const parseJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setRuleName(parsed.rule_name); 
    
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  
    if (ruleName  != null) {
      const parsed = JSON.parse(jsonInput);
      generateResponse(parsed)
    }
  },[ruleName])

  const compareAndCreateTicket = (parsedJson, impKeys) => {
    const selectedKeys = {};
    for (const key of impKeys) {
      if (parsedJson.hasOwnProperty(key)) {
        selectedKeys[key] = parsedJson[key];
      }
    }
    return selectedKeys;
  };
  
  const generateResponse = async (parsedJson) => {
    setLoading(true)
    const rule = ruleName
    try {
     
      const keys = Object.keys(parsedJson);

      const aiResponse = await openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',

              content : `Generate a JSON representation listing the essential fields for creating a ticket related to "${rule}". 
              Please list only the top 11 important fields. The date-time field is mandatory. Exclude any extra information.`
          },
          { role: 'user', content: keys.toString() },
        ],
      });

      if (aiResponse.choices && aiResponse.choices[0]) {
        setResponse(aiResponse.choices[0].message.content);
        setImpKeys(Object.keys(JSON.parse(aiResponse.choices[0].message.content)));
      }
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false)
  };

  useEffect(() => {
    if (impKeys.length > 0 && parsedJson) {
      const newTicket = compareAndCreateTicket(parsedJson, impKeys);
      setTicket(newTicket);
      findIPv4Addresses(JSON.stringify(newTicket));
    }
  }, [impKeys, parsedJson]);

  function sanitizeHTML(html) {
    const clean = DOMPurify.sanitize(html);
    return { __html: clean };
  }


  function findIPv4Addresses(ticket) {
    const ipv4Regex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
  
    // Extract IPv4 addresses from the ticket
    const foundIpAddresses = ticket.match(ipv4Regex);
  
    
    setIpAddress(foundIpAddresses || []);
  }

  useEffect(()=>{
    if(ticket && ticket.url_full){
      // console.log(ticket.url_full)
      setUrl(ticket.url_full)
    }
  },[ticket])

  useEffect(() => {
    if (
      ruleName === "SQL Injection Attempt" && url != null)
        {
      setInjection(true);
    }
  }, [ruleName, url, ticket]);
  





const toggleKeyInTicket = (key) => {
  if (ticket && parsedJson) {
    const updatedTicket = { ...ticket };

    if (updatedTicket.hasOwnProperty(key)) {
      // Key exists in the ticket, 
      if (parsedJson[key] !== undefined && parsedJson[key] !== null && parsedJson[key] !== '') {
        delete updatedTicket[key];
      }
    } else if (parsedJson.hasOwnProperty(key)) {
      // Key doesn't exist in the ticket but exists in parsedJson
      updatedTicket[key] = parsedJson[key];
    }

    setTicket(updatedTicket);
  }
};
 

// const moveItem = (fromIndex, toIndex) => {
//   // Move the key-value pair within the ticket object
//   const keys = Object.keys(ticket);
//   const movedItem = keys.splice(fromIndex, 1);
//   keys.splice(toIndex, 0, movedItem[0]);

//   const newTicket = {};
//   keys.forEach((key) => {
//     newTicket[key] = ticket[key];
//   });

//   setTicket(newTicket);
// };


const [dataSource, setDataSource] = useState([]);

useEffect(() => {
  if (ticket) {
    setDataSource(flattenObject(ticket));
    console.log((flattenObject(ticket)),"Ticket")
  } else {
    setDataSource([]);
  }
}, [ticket]);

const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  })
);

const onDragEnd = ({ active, over }) => {
  if (active.id !== over?.id) {
    setDataSource((prev) => {
      const activeIndex = prev.findIndex((i) => i.key === active.id);
      const overIndex = prev.findIndex((i) => i.key === over?.id);
      return arrayMove(prev, activeIndex, overIndex);
    });
  }
};

/// new nested parser drower 

function renderRawJSONData(data, toggleKeyInTicket, ticket) {
  const styleKey = {
    flexBasis: '30%',
    marginRight: '10px',
    fontWeight: 'bold',
  };
  const styleValue = {
    flexBasis: '50%',
  };
  const styleValueObject = {
    fontWeight: 'normal',
    marginLeft: '90px',
  };
  const hole = {
   
  };

  function transformKey(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  }

  return Object.keys(data).map((key) => {
    const value = data[key];
    const transformedKey = transformKey(key);

    if (typeof value === 'object') {
      return (
        <div style={hole} className="DragME" key={key}>
          <div>
            <div style={styleKey}>
              <Checkbox
                checked={key in ticket}
                onChange={() => toggleKeyInTicket(key)}
              />
              {keyTranslations[key] ? keyTranslations[key] : transformedKey}:
              <div style={styleValueObject}>
                {renderRawJSONData(value, toggleKeyInTicket, ticket)}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div style={hole} className="DragME" key={key}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={styleKey}>
              <Checkbox
                checked={key in ticket}
                onChange={() => toggleKeyInTicket(key)}
              />
              {keyTranslations[key] ? keyTranslations[key] : transformedKey}:
            </div>
            <div style={styleValue}>{value}</div>
          </div>
        </div>
      );
    }
  });
}


  return (

    <div className="container">

    
     <div  style={{ backgroundColor: "white", width: '100%' ,fontFamily: 'Fira Mono' , height:"100px" ,  display:"flex" , justifyContent: 'center', alignItems: 'center' , borderBottom: "10px solid #231f20" ,position:"fix", top:"0" }}>
    <Space.Compact style={{ width: '80%'  , padding:"10px",justifyContent: 'center', alignItems: 'center' }}>
    <Button   style={{ borderRadius: '0', height:"50px" ,backgroundColor: '#231f20',color:"white" , border:"none" , boxShadow :"none"}} onClick={clearAllStates} >Reset</Button>
      <Input defaultValue="Combine input and button" 
        type="text"
        id="jsonInput"
        value={jsonInput}
        autoComplete="off"
        onChange={handleJsonInput}
        style={{ borderRadius: '0' , height:"50px" ,backgroundColor: "b#f2f2f2"}}
        
        />
      <Button   style={{ borderRadius: '0', height:"50px" ,backgroundColor: '#231f20', boxShadow :"none"}} type="primary" onClick={parseJSON} >Submit</Button>
    </Space.Compact>
   

    </div>
    <div className="Ticket_Info" style={{ width: '100%',display:"flex",  flexDirection:"row", justifyContent : "space-around", }}>

      {ticket ?(
           <div className="TicketOnly" style={{  overflow:"auto", maxHeight:"80vh",marginLeft : "100px", marginRight:"100px",  width: "40%" ,border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" ,backgroundColor: "#fff",padding: "30px",   transition: "max-height 0.3s ease"}} >
      
           {loading ? (
            <> <Skeleton style={{ width: "100%",  }} />
            <Skeleton style={{ width: "100%",  }} /></>
            
         ) : (
             
             <div className='Ticket'style={{ }}>
             {parsedJson ? (
               <div style={{ width: "100%",}}>
                   
                 {/* <MyAntDesign data={ticket} /> */}
   
                 {/* <div style={{ backgroundColor: "white",  borderRadius: '0',width: "100%", marginTop:"50px" }}> {renderJSONData(ticket)} </div> */}
                 <div>
                 <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
        <Table
  rowKey="key"
  columns={columns}
  dataSource={dataSource}
  components={{
    body: {
      row: Row,
    },
  }}
  pagination={false} // Remove pagination
  rowClassName="no-border-row" // Apply the CSS class to remove the border
/>

        </SortableContext>
      </DndContext>
    </div>

   
    
                  <div>
                  
                    </div>

                  
   
                 {ipAddress ?( 
                       
                       <IPaddress 
                       setSelectedIP={setSelectedIP}
                       selectedIP={selectedIP}
                       ipAddress ={ipAddress}
                       setIpAddress = {setIpAddress}
                       selectionType ={selectionType}
                       setSelectionType ={setSelectionType}
                       />
   
                 ) :(
                  <p></p>
                 )}
               
             </div>
             ):(
               
              
           <div style={{  boxSizing: "border-box" , overflow: "auto"}}
             > <RandomJSONSelector  
              selectedJsonObject={selectedJsonObject}
              setSelectedJsonObject ={setSelectedJsonObject}
          /></div>
        
   
             )}
         
         </div>
          
           
         )}
            
         </div>
      ):(

      <p></p>
      )}
   


      <div className = "IpInfo" style={{ transition: "max-height 0.3s ease",  overflow:"auto", maxHeight:"80vh" ,border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , backgroundColor: "#fff", padding:"30px" ,justifyContent:"space-between" , display:"flex", flexDirection:"column", alignContent:"center" , width: "40%", marginRight:"110px" }}>
        {selectedIP? (
          <div style={{ marginLeft: "0px"}}>
<div  style={{ border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , padding:"20px"}}>
            <Censys
           selectedIP={selectedIP}
           dataCensys ={dataCensys}
           setDataCensys={setDataCensys}
           error={error}
           setError={setError}
          />

          </div>

          <div  style={{ border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , padding:"20px"}}>
           <Ipinfo 
             selectedIP={selectedIP}
             dataIpInfo ={dataIpInfo}
             setDataIpInfo={setDataIpInfo}
             error={error}
             setError={setError}
             setLoading ={setLoading }
             loading={loading}
          /> 
              </div>
              <div  style={{ border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , padding:"20px"}}>
            <AbuseIpdb 
            selectedIP={selectedIP}
            dataAbuseIpdb ={dataAbuseIpdb}
            setdataAbuseIpdb ={setdataAbuseIpdb}
            setError={setError}
            error={error}
            />
              </div>
          
          <div style={{ width:"90&"}}>
          <div  style={{ border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , padding:"20px"}}>
          <ThreatIO  
          selectedIP={selectedIP}
          dataThreat ={dataThreat}
          setDataThreat={setDataThreat}
          error={error}
          setError={setError}
          />
           </div>
           <div  style={{ border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , padding:"20px"}}>
          <VirusTotal 
           selectedIP={selectedIP}
           data ={data}
           setData={setData}
           error={error}
           setError={setError}
          />
                  </div>
                
           <div  style={{ border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , padding:"20px"}}>
            <CriminalIp className="CriminalIp" style={{ width: "100%" }}
            selectedIP={selectedIP}
            dataCriminal ={dataCriminal}
            setDataCriminal={setDataCriminal}
            error={error}
            setError={setError}
          /> 
            </div>
            {/* <div  style={{ border: "1px solid #c3c3c3", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" , padding:"20px"}}>
            <GrayNoise className="CriminalIp" style={{ width: "100%" }}
            selectedIP={selectedIP}
            dataGrayNoise ={dataGrayNoise}
            setDataGrayNoise={setDataGrayNoise}
            error={error}
            setError={setError}
            setLoading ={setLoading }
            loading={loading}
          /> 
            </div> */}
          </div>
      
          </div>
        ):(
          <MatrixRain /> 
        )}
      </div>
    
    </div>
    {injection?(
    <div style={{ width: "100vh" , width: "100%"}}>
    {/* <BrowserComponent
        ruleName ={ruleName}
        ticket ={ticket}
        url={url}
        setUrl={setUrl}
        content={content}
        setContent={setContent}
        injection={injection}
    /> */}
    </div>):(<p>


    </p>)
     
    }
       <>
      {ticket && ( // Display the button only if the ticket exists
        <Button
          type="primary"
          icon={<RightOutlined />} // Use the RightOutlined icon
          style={{ borderRadius: '0', height: '50px', backgroundColor: '#231f20', color: 'white', border: 'none', position: 'fixed', right: '50%' ,top:"20%" , boxShadow :"none"}}
          onClick={showDrawer}
        >
          Open Key Drawer
        </Button>
      )}
<Drawer
  title="Select keys from raw log"
  placement="right"
  closable={false}
  onClose={onClose}
  visible={visible}
  width="50%" // Set the width of the Drawer
>
  {parsedJson && (
    <div>
      {renderRawJSONData(parsedJson, toggleKeyInTicket, ticket)}
    </div>
  )}
</Drawer>

    </>

   </div>
  );}  


  
export default App;

