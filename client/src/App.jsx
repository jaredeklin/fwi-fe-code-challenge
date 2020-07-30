import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import PlayerForm from './PlayerForm/PlayerForm';
import { usePlayerFormActions } from './PlayerForm/usePlayerFormActions';
import { useTableSort } from './PlayerTable/useTableSort';

const App = () => {
  const { state } = useLocation();
  const { handleCreate, handleUpdate, handleDelete } = usePlayerFormActions();
  const sort = useTableSort();

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/add-player">
          <PlayerForm text={'Create new player:'} onSubmit={handleCreate} />
        </Route>
        <Route exact path="/player">
          <PlayerForm
            text={'Update player:'}
            initialValues={state}
            onSubmit={handleUpdate}
            onDelete={handleDelete}
          />
        </Route>
        <Route exact path="/">
          <PlayerTable {...sort} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
