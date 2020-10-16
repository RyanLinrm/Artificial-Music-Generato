import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Homepage from "./pages/homepage"


class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;