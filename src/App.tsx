import React from "react";

import Runner from "./components/TestRunner";
import tests from "./api-tests";

function App() {
  return (
    <div className="App m-5">
      <Runner tests={tests} />
    </div>
  );
}

export default App;
