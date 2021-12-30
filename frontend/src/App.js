import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MainPage from "./components/CryptoMainPage"
import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';


function App() {
  const [errorMessage, setErrorMessage] = useState();
  useEagerConnect(setErrorMessage);
  useInactiveListener();

  return (
    <div className="App">
      {
        errorMessage? <div style={{color:"red"}}>{errorMessage}</div>: null
      }
      <Header setErrorMessage={setErrorMessage}/>
      {/* <Home /> */}
      <MainPage />
    </div>
  );
}

export default App;
