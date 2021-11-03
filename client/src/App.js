import NavbarComponent from "./component/NavbarComponent"
import Home from "./component/Home"
import Login from "./component/Login"
import SignUp from "./component/SignUp"
import Logout from "./component/Logout"
import UserProfile from "./component/userProfile"
import { AuthoProvider } from "./context/AuthoProvider.js"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import React from 'react'

function App() {
  return (
    <>
        <Router>
        <AuthoProvider>
        <div className="container site">
          
          <NavbarComponent />
          <div className="main">
          <Switch className="switch">
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/userprofile" component={UserProfile}/>
          </Switch>
          </div>
        </div>
        </AuthoProvider>
        </Router>
    </>
  )
}

export default App