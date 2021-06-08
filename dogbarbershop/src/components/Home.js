import logo from '../logo.svg';
import '../App.css';
import React, { memo, useEffect, useState } from 'react';


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/login"
          rel="noopener noreferrer"
        >
         LOGIN
        </a>
      </header>
    </div>
  );
}

export default Home;


