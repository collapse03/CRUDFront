import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/header";
import Form from "./components/form";
import List from "./components/list";
function App() {
    return(
      <Router>
        <Header />
          <Switch>
            <Route exact path="/" component={Form} />
            <Route exact path="/list" component={List} />
            <Route exact path="/edit/:id" component={Form} />
          </Switch>
      </Router>
    )
}

export default App;
