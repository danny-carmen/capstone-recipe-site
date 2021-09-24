import HomePage from "./components/home-page";
import NavBar from "./components/nav-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AccountMenu from "./components/account-menu";
import Test from "./components/test";
import RecipePage from "./components/recipe-page";
import Profile from "./components/profile";
//TODO need a nomatch
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar className="relative" />

        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route
            path="/recipes/:id"
            render={(props) => <RecipePage {...props} />}
          />

          <Route path="/test" component={Test} />
          <Route path="/profile" component={Profile} />
        </Switch>
        <AccountMenu loggedInStatus="LOGGED_IN" />
      </Router>
    </div>
  );
}

export default App;
