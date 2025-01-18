import react , { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  return(
  <div>
    <Navbar/>
    <h1 style={{color:"red", textAlign:"center"}}>Home component </h1>
  </div>
);
}

export default App;