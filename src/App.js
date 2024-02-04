import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignIn from "./components/Signin/SignIn";

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
    </div>
  );
}

export default App;
