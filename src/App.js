import HomePage from "./components/home-page";
import NavBar from "./components/nav-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Explore from "./components/explore";
import Search from "./components/search";
import Account from "./components/account";
import Test from "./components/test";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/explore" component={Explore} />
          <Route path="/search" component={Search} />
          <Route path="/account" component={Account} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
