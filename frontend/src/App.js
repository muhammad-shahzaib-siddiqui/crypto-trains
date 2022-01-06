import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from "./screens/CryptoMainPage"
import { useEagerConnect, useInactiveListener } from './hooks/useEagerConnect';
import Home from "./components/Home"
import { BrowserRouter, Route, Router, Routes, Switch } from 'react-router-dom';
import Nfts from './screens/Nfts';
import Airdrop from './screens/Airdrop';



function App() {
  const [errorMessage, setErrorMessage] = useState();
  useEagerConnect(setErrorMessage);
  useInactiveListener();

  

  return (
    <div className="App">
      {
        errorMessage? <div style={{color:"red"}}>{errorMessage}</div>: null
      }
      <BrowserRouter>
      <Header setErrorMessage={setErrorMessage}/>
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/myNft" element={<Nfts />} />
      <Route path="/airDrop" element={<Airdrop />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
