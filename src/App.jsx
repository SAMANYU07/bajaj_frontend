import { useEffect, useState } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTransition, animated } from 'react-spring';
// import './App.css'

function App() {
  const [apiInput, setApiInput] = useState("");
  const [resData, setResData] = useState(null);
  const [jsonResponse, setJSONResponse] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const filterTransition = useTransition(showDropdown, {
    from: {height: "0%"},
    enter: {height: "6 %"},
    leave: {height: "0%"},
  })

  const handleSubmit = async () => {
    try {
      const data = apiInput;
      const res = await axios.post(`${API_URL}/api/bfhl`, data, {
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
  // useEffect(()=> {
  //   console.log(jsonResponse);
  // }, [jsonResponse])

  return (
    <>
      <div className='h-screen flex items-center justify-center flex-col bg-[#e9e9e9]'>

        <h1 className=' font-bold text-[30px]'>API INPUT</h1>
        <input id='dataInp' type="text" value={apiInput} onChange={(event) => setApiInput(event.target.value)} 
        className='text-[28px] mt-8 outline-none border-b-2 border-black rounded-md focus:border-b-violet-600 transition-[0.2s]'/> <br /> <br />
        <button id='submitbtn' onClick={handleSubmit} className=' bg-violet-600 -mt-4 text-white w-[120px] h-[50px] transition-[0.2s] active:scale-95 hover:scale-105 rounded-lg after:rounded-lg after:bg-violet-800 '>Submit</button>
        {
        filterTransition((style, show) =>
        show ?
          <animated.div style={style} id="dropdownContainer">
            {/* <label htmlFor="options">Select options:</label> */}
            <select id="filterOption" value={selectedOption} onChange={handleDropdownChange} className=' outline-none text-[20px] mt-4 hover:bg-black hover:text-white transition-[0.2S]'>
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highestAlpha">Highest Alphabet</option>
              <option value="Show All">Show All</option>
            </select>
          </animated.div>
        :null
        )
        }
        <div className=' mt-6 bg-white shadow-md rounded-md p-2 smooth-width smooth-height transition-[0.2s]'>
          {resData?.numbers.length && (selectedOption == "numbers" || selectedOption == "Show All") ? <p>Numbers: <span>{resData?.numbers?.map(no => <span key={no}>{no},</span>)}</span></p> : null}
          {resData?.alphabets.length && (selectedOption == "alphabets" || selectedOption == "Show All") != 0 ? <p>Alphabets: <span>{resData?.alphabets?.map(alpha => <span key={alpha}>{alpha},</span>)}</span></p> : null}
          {resData?.highest_alphabet.length && (selectedOption == "highestAlpha" || selectedOption == "Show All") != 0 ? <p>Highest Alphabet: <span>{resData?.highest_alphabet}</span></p> : null}
        </div>
      </div>
    </>
  )
}

export default App
