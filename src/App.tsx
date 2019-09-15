import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CarsList from './components/CarsList';
import Car from './components/Car';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div className="app-wrapper">
          <CarsList />
          <Switch>
            <Route path="/car/:id" component={Car} />
            <Route path="*" exact={true} component={Car} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
