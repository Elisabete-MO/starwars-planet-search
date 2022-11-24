import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Loading from './pages/Loading';
import Header from './components/Header';
import PlanetsForm from './components/PlanetsForm';
import Table from './components/Table';

function App() {
  return (
    <>
      <Switch>
        <Route path="/loading" component={ Loading } />
        {/* {<Route exact path="/" component={ App } /> */}
      </Switch>
      <div>
        <Header />
        <PlanetsForm />
        <Table />
      </div>
    </>
  );
}

export default App;
