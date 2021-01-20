import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Nav from './components/Nav';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import Logout from './components/Logout';
import QuizSetup from './components/QuizSetup';


const App = () => {
  return (
    <BrowserRouter>
    <Nav/>
    <Switch>
      <Route exact path = "/" component={Home}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path = "/register" component={Register}/>
      <Route exact path = "/quizsetup" component={QuizSetup}/>
      <Route exact path = "/leaderboard" component={Leaderboard}/>
      <Route exact path = "/logout" component={Logout}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
