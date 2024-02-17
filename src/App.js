import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignIn from "./components/Signin/SignIn";
import ConfirmEmail from "./components/Signin/ConfirmEmail";
import Home from "./components/Welcome/Home";

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/h">
        <ConfirmEmail />
      </Route>
      <Route path={"/home"}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
