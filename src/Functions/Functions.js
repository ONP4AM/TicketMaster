
export function keyTranslations(key) {
  return key
  .replace(/_/g, ' ') // Replace underscores with spaces
  .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
}


export function renderJSONData(data) {
  const styleKey = {
      flexBasis: '30%', // Adjust the width of the key container
      marginRight: '10px', // Add right margin to the keys
      fontWeight: 'bold', // Make the keys bold
      // background:"orange"

    };
    const styleValue = {
      flexBasis: '50%', // Adjust the width of the value container
      // background:"green"
    };
    const styleValueObject = {
      fontWeight: 'normal',
      marginLeft: '90px',
      // background:"red"
    };
 const hole ={
  background:"yellow"
 }
    function transformKey(key) {
      return key
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
    }
  
    return Object.keys(data).map((key) => {
      const value = data[key];
      const transformedKey = transformKey(key); // Transform the key
  
      if (typeof value === 'object') {
        // Check if the value is an object (nested JSON)
        return (
          <div style={hole} className="DragME"> 
          <div >
          <div key={key} style={styleKey } >
            
            {keyTranslations[key] ? keyTranslations[key] : transformedKey}:
            <div style={styleValueObject}>{renderJSONData(value)}</div>
          </div>
          </div>
          </div>
        );
      } else {
        return (
          <div style={hole} className="DragME"> 
          <div  key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div style={styleKey}>
              {keyTranslations[key] ? keyTranslations[key] : transformedKey}:
            </div>
            <div style={styleValue}>{value}</div>
          </div>
          </div>
        );
      }
    });
  }



  

///Toggle key from raw log 

export function toggleKeyInTicket (key, ticket,parsedJson,setTicket  ) {
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

 
export function renderRawData(data, key, Checkbox, ticket, toggleArrayItemInTicket) {
  function transformKey(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  }

  const value = data[key];
  const transformedKey = transformKey(key);

  if (Array.isArray(value)) {
    // If the value is an array, render checkboxes for each element
    return (
      <div key={key}>
        {keyTranslations[key] ? keyTranslations[key] : transformedKey}:
        <ul>
          {value.map((item, index) => (
            <li key={index}>
              <label>
                <Checkbox
                  checked={ticket && ticket[key] && ticket[key].includes(item)}
                  onChange={() => toggleArrayItemInTicket(key, item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (typeof value === 'object') {
    // If the value is an object, render it as a JSON string
    return (
      <div key={key}>
        {keyTranslations[key] ? keyTranslations[key] : transformedKey}: {JSON.stringify(value, null, 2)}
      </div>
    );
  } else {
    // Render non-object values as they are
    return (
      <div key={key}>
        {keyTranslations[key] ? keyTranslations[key] : transformedKey}: {value}
      </div>
    );
  }
}


  export function toggleArrayItemInTicket(key, item, ticket, setTicket) {
    if (ticket && item) {
      const updatedTicket = { ...ticket };
  
      if (updatedTicket.hasOwnProperty(key) && Array.isArray(updatedTicket[key])) {
        // Key exists in the ticket, and it's an array
        const index = updatedTicket[key].indexOf(item);
        if (index !== -1) {
          // Item is already in the array, so remove it
          updatedTicket[key].splice(index, 1);
        } else {
          // Item is not in the array, so add it
          updatedTicket[key].push(item);
        }
      } else if (Array.isArray(item)) {
        // Key doesn't exist in the ticket, but item is an array, so add it as the value
        updatedTicket[key] = [item];
      }
  
      setTicket(updatedTicket);
    }
  }
  

  