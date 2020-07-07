
import React from 'react';

import './App.css';

import { NimGame } from "./NimGame";

function App() {

  return (
    <div className="App">

      <header className="App-header">
        <p>
          Nim game
        </p>
      </header>

      <main className="App-main">
        <NimGame />
      </main>

    </div>
  );
}

export default App;

