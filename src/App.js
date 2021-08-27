import HomePage from "./components/home-page";
import NavBar from "./components/nav-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Explore from "./components/explore";

import Account from "./components/account";
import Test from "./components/test";
import RecipePage from "./components/recipe-page";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar className="relative" />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/explore" component={Explore} />
          <Route
            path="/recipes/:slug"
            render={(props) => <RecipePage {...props} />}
          />
          <Route path="/account" component={Account} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
