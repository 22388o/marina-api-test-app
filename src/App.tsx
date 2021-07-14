import React from "react";

import "./App.css";
import Runner from "./components/TestRunner";
import tests from "./api-tests";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Runner tests={tests} />
      </header>
    </div>
  );
}

export default App;
