import './App.css';
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './Firebase';
import Nav from './components/nav/Nav';
import auth from "firebase/compat/auth";
import UserState from "./context/user/UserState";
import LandingHome from './components/Landing/LandingHome';
import About from './components/Landing/About/About';
import Landing from './components/Landing/Landing';
import NavHome from './components/nav/NavHome';
import Articles from './components/Main/Articles';
import Courses from './components/Main/Courses';
import Home from './components/Main/Home';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);




  return (
    <>
      <UserState>
        <Router>
          {isLoggedIn ? <>
          <NavHome />
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/articles" ><Articles /></Route>
              <Route exact path="/courses" ><Courses /></Route>

              {/* <Route path="/profile"><Profile side={setShowSideNav} sideValue={showSideNav} /></Route>
              <Route path="/newpost"><NewPost alert={(message, type) => { setAlert({ msg: message, type: type }) }} /></Route> */}
              <Route path="/groups" />
              <Route path="/settings" />
            </Switch>
          </> :
            <>
              <Router>
                <Nav setLoginType={setIsLoggedIn} />
                <Switch>
                  <Route exact path="/"><LandingHome setLoginType={setIsLoggedIn} /></Route>
                  <Route exact path="/about"><About /></Route>
                </Switch>
              </Router>


            </>}



        </Router>
      </UserState>
    </>


  );
}

export default App;
