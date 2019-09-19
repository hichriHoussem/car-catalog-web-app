import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CarsList from './components/CarsList';
import CarInfo from './components/Car';
import CarForm from './components/Car/CarForm';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div className="app-wrapper">
          <Route path="*" exact={true} component={CarsList} />
          <Switch>
            <Route path="/car/:id" component={CarInfo} />
            <Route path="/new" exact={true} component={CarForm} />
            <Route path="/edit/:id" component={CarForm} />
            <Route path="*" exact={true} component={CarInfo} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
