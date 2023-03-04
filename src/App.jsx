import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';
import './App.css';


function App() {
  // defining a state hook for the dynamic input of the user
  const [prompt, setPrompt] = useState('')
  // defining a state hook for the different outcomes
  const [result, setResult] = useState('')
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, 
});
// initializing the API taking in the config with the secret key of the API
const openai = new OpenAIApi(configuration);

// calling the api (you need to pay around 0.02$ per call)
const generateImage = async () => {
  const result = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024"
  });
 
  // set the state hook for the changing image
  setResult(result.data.data[0].url);
};
return (
    <div className='app-main'>
    <h2>Generate an image using the OpenAI API</h2>
      <input
        className='app-input'
        placeholder='Type something to generate an image ...'
        onChange={(e) => setPrompt(e.target.value)}/>
      <button onClick={generateImage}>Generate an Image</button>
      {/* if result.length is more than 0, only then show the image, else show an empty fragment */}
      {result.length > 0 ? <img className='result-image' src={result || ""} alt="result" /> : <></>}
    </div>
  );
}

export default App
