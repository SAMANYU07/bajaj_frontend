import { useEffect, useState } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [apiInput, setApiInput] = useState("");
  const [jsonResponse, setJSONResponse] = useState([]);
  
  const handleSubmit = () => {
    console.log(JSON.parse(apiInput));
  }
  useEffect(() => {
    axios.get("/api/bfhl")
    .then(data => {
      setJSONResponse(data.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])
  useEffect(()=> {
    console.log(jsonResponse);
  }, [jsonResponse])

  return (
    <>
    <h1>API INPUT</h1>
    <input type="text" value={apiInput} onChange={(event) => setApiInput(event.target.value)}/> <br /> <br />
    <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default App
