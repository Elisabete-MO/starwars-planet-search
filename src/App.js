import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Header from './components/Header';
import PlanetsForm from './components/PlanetsForm';
import Table from './components/Table';

export default function App() {
  return (
    <>
      {/* <Switch> */}
      {/* <Route path="/loading" component={ Loading } /> */}
      {/* {<Route exact path="/" component={ App } /> */}
      {/* </Switch> */}
      <StarWarsProvider displayName="Context Display Name">
        <div className="content">
          <Header />
          <PlanetsForm />
          <Table />
        </div>
      </StarWarsProvider>
    </>
  );
}
