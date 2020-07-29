import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import PlayerForm from './PlayerForm/PlayerForm';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/add-player">
          <PlayerForm text={'Create new player:'} />
        </Route>
        <Route exact path="/">
          <PlayerTable />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
