import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Assay from './components/Assay';
import Toxicity from './components/Toxicity';
import Navbar from './components/CustomNavbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Search from './components/Search';

//import Searchbar from './components/Searchbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <div>
              <Navbar />
              <Route exact path="/" component={Home} />
              <Route exact path="/enter" component={Signup} />
              <Route exact path="/assay" component={Assay} />
              <Route exact path="/toxicity" component={Toxicity} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/Login" component={Login} />
            </div>
      </BrowserRouter>
    );
  }
}

export default App;
