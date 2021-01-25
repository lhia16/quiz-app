import "./App.css";
import { useState, useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Nav from "./components/Nav";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import QuizSetup from "./components/QuizSetup";
import axios from 'axios';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() =>{
    const tokenCheck = async () => {
      const response = await axios.get('/isAuthd')
          console.log(response)
          setAuthenticated(response.data.authenticated);
    }
    tokenCheck();
  },[])


  return (
    <BrowserRouter>
    <Nav authenticated={authenticated} setAuthenticated={setAuthenticated} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" render={() => <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />}/>
      <Route exact path="/register" component={Register} />
      <Route exact path="/quizsetup" render={() => <QuizSetup authenticated={authenticated} setAuthenticated={setAuthenticated} />}/>
      <Route exact path="/leaderboard" component={Leaderboard} />
      <Route exact path="/logout" render={() => <Logout authenticated={authenticated} setAuthenticated={setAuthenticated} />}/>
    </Switch>
    </BrowserRouter>
  )

};


export default App;
