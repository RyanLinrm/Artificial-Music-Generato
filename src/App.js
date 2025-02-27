import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Homepage from "./pages/Homepage"
import VAEpage from './pages/VAEpage'
import RNNpage from './pages/RNNpage'
import ChordPage from './pages/ChordPage'
import AboutPage from './pages/Aboutpage'

class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/gentrio" component={VAEpage} />
            <Route path="/genmelody" component={RNNpage} />
            <Route path="/genwithchords" component={ChordPage} />
            <Route path="/about" component={AboutPage} />
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