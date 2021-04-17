import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Inicio } from "./Ingreso/RegistroyLogin";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Inicio} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
