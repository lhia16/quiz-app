import "./App.css";
import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Nav from "./components/Nav";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import QuizSetup from "./components/QuizSetup";
const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Nav authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/login"
          render={() => <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />}
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/quizsetup" render={() => <QuizSetup authenticated={authenticated} setAuthenticated={setAuthenticated} />}/>
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/logout" render={() => <Logout authenticated={authenticated} setAuthenticated={setAuthenticated} />}/>
      </Switch>
    </BrowserRouter>
  );
};
export default App;