import HomePage from "./components/home-page";
import NavBar from "./components/nav-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AccountMenu from "./components/account-menu";
import Test from "./components/test";
import RecipePage from "./components/recipe-page";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar className="relative" />

        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route
            path="/recipes/:slug"
            render={(props) => <RecipePage {...props} />}
          />

          <Route path="/test" component={Test} />
        </Switch>
        <AccountMenu loggedInStatus="LOGGED_IN" />
      </Router>
    </div>
  );
}

export default App;
