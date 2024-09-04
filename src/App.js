import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import  PeraWalletConnectComponent  from './PeraWalletConnect';
import { useRef, useEffect } from 'react';

function App() {
  useEffect(() => {
    const metaTagKeywords = document.createElement('meta'); 
    metaTagKeywords.name = "name"; 
    metaTagKeywords.content = "DAPP Basic"; 
    document.head.appendChild(metaTagKeywords);
    }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Conecta tu Wallet
        </p>
        <Routes>
        <Route path='/' element={<PeraWalletConnectComponent />} />
      </Routes>
      </header>
    </div>
  );
}

export default App;
