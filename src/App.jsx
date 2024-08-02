import { useEffect, useState } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [apiInput, setApiInput] = useState("");
  const [resData, setResData] = useState(null);
  const [jsonResponse, setJSONResponse] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("api",API_URL);
  
  const handleSubmit = async () => {
    try {
      const data = apiInput;
      const res = await axios.post(`${API_URL}/api/bfhl`, data,  {
        headers: {
          'Content-Type': 'application/json' // Specify content type
        }
      });
      console.log("Response from server:", res.data);
      setResData(res.data)
      setShowDropdown(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    console.log("resdata: ", resData?.numbers);
  }, [resData])
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
    // console.log(jsonResponse);
  }, [jsonResponse])

  return (
    <>
    <h1>API INPUT</h1>
    <input type="text" value={apiInput} onChange={(event) => setApiInput(event.target.value)}/> <br /> <br />
    <button onClick={handleSubmit}>Submit</button>
    {showDropdown && (
        <div id="dropdownContainer">
          {/* <label htmlFor="options">Select options:</label> */}
          <select id="filterOption" value={selectedOption} onChange={handleDropdownChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highestAlpha">Highest Alphabet</option>
          </select>
        </div>
      )}
    <div>
      {resData?.numbers.length && selectedOption == "numbers" ? <p>Numbers: <span>{resData?.numbers}</span></p> : null }
      {resData?.alphabets.length && selectedOption == "alphabets" != 0 ? <p>Alphabets: <span>{resData?.alphabets}</span></p>: null}
      {resData?.highest_alphabet.length && selectedOption == "highestAlpha" != 0 ? <p>Highest Alphabet: <span>{resData?.highest_alphabet}</span></p>: null}
    </div>
    </>
  )
}

export default App
