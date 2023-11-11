import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

import NavBar from './components/NavBar';
import News from './components/News';
import moonImage from  './moon.png'
import sunImage from  './sun.png'

const App = () =>  {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState('dark')

  const handleDarkMode = ()=>{
    let darkModeImage = document.getElementById('darkModeImage');
    if(darkMode === 'light'){
      document.body.style.backgroundColor = '#23272f';
      document.body.style.color = 'white';
      setDarkMode('dark');
      darkModeImage.src = moonImage;
    } else{
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      setDarkMode('light');
      darkModeImage.src = sunImage;
    }

  }

  return (
      <>
        <BrowserRouter>
          {<LoadingBar
            color='#f11946'
            progress={progress}
            
          />}
          <NavBar title="NewsMonkey" handleDarkMode={handleDarkMode} darkMode= {darkMode}/>
          <Routes>
            <Route exact path='/' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country='us' category='general' />} />
            <Route exact path='business' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="business" pageSize={10} country='us' category='business' />} />
            <Route exact path='entertainment' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={10} country='us' category='entertainment' />} />
            <Route exact path='general' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country='us' category='general' />} />
            <Route exact path='health' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="health" pageSize={10} country='us' category='health' />} />
            <Route exact path='science' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="science" pageSize={10} country='us' category='science' />} />
            <Route exact path='sports' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={10} country='us' category='sports' />} />
            <Route exact path='technology' element={<News darkMode={darkMode} setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={10} country='us' category='technology' />} />

          </Routes>
        </BrowserRouter>
      </>
  )
  
}

export default App;