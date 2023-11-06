// import React, { useState, useEffect } from "react";
// import OpenAI from "openai";

// // Initialize the OpenAI client with your API key
//  const openAi = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY ,dangerouslyAllowBrowser: true}); // Use your own environment variable or API key here
// // const openAi = new OpenAI({ 
// // apiKey: "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",
// // dangerouslyAllowBrowser: true
// //  });


// function App() {
//   const [input, setInput] = useState("");
//   const [response, setResponse] = useState("");

//   const handleInputChange = (event) => {
//     setInput(event.target.value);
//   };

//   const generateResponse = async () => {
//     try {
//       const aiResponse = await openAi.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "system", content: "You are a helpful assistant." },
//                   { role: "user", content: input }],
//       });

//       // if (aiResponse.data.choices && aiResponse.data.choices[0]) {
//       //   setResponse(aiResponse.data.choices[0].message.content);


//         if (aiResponse.choices && aiResponse.choices[0]) {
//           setResponse(aiResponse.choices[0].message.content);

//       } else {
//         console.error("No response data or choices found in the AI response");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={input} onChange={handleInputChange} />
//       <button onClick={generateResponse}>Generate Response</button>
//       <div>
//         <h1>AI Response</h1>
//         <p>{response}</p>
//       </div>
//     </div>
//   );
// }

// export default App;
