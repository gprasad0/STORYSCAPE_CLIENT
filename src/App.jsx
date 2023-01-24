import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchFunction();
  }, []);
  const fetchFunction = async () => {
    var temp = 0.2
    const prompt = "fruit";
    // const numResults = document.getElementById("output").value;
    let data = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    },
      url: 'https://api.openai.com/v1/completions',
      data: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": prompt,
        "max_tokens": 90,
        "temperature": temp
    })
    });
    // setCount(data.data.products[0].brand);
    console.log('f----->', data.data.choices[0].text);
  };
  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;