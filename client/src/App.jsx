import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import PlayerAdd from './PlayerAdd/PlayerAdd';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/add-player">
          <PlayerAdd />
        </Route>
        <Route path="/">
          <PlayerTable />
        </Route>
      </Switch>
    </>
  );
};

export default App;
