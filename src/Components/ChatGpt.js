import OpenAI from 'openai';

const openAi = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Make the function async
async function GenerateResponse(parsedjson,setImpKeys,setResponse) {
  try {
    const keys = Object.keys(parsedjson);

    // Use await inside an async function
    const aiResponse = await openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            'Generate a JSON representation listing the essential fields for creating a ticket with respect to just list each field from the provided data and consider each field as unique and give top 10 important fields, dont provide any extra info other than this.',
        },
        { role: 'user', content: keys.toString() },
      ],
    });

    if (aiResponse.choices && aiResponse.choices[0]) {
      setResponse(aiResponse.choices[0].message.content);
      setImpKeys(Object.keys(JSON.parse(aiResponse.choices[0].message.content))); // Fixed the 'Object keys' to 'Object.keys'
    } else {
      console.error('No response data or choices found in the AI response');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export { GenerateResponse };
