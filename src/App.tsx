import React from "react";
import logo from "./logo.svg";

import "./App.css";
import Runner from "./components/TestRunner";
import tests from "./api-tests";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Runner tests={tests} />
      </header>
    </div>
  );
}

export default App;
