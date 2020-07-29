import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  updatePlayerSuccess,
  createPlayerSuccess,
  deletePlayerSuccess,
} from '../appState/actions';

const URL = 'http://localhost:3001/players';

export const usePlayerFormActions = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleCreate = async (values) => {
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      dispatch(createPlayerSuccess(json));
      push('/');
    } catch (error) {
      console.error('POST ERROR:', error);
    }
  };

  const handleUpdate = async ({ id, ...values }) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      dispatch(updatePlayerSuccess(json));
      push('/');
    } catch (error) {
      console.error('PATCH ERROR:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(response.statusText);

      dispatch(deletePlayerSuccess(id));
      push('/');
    } catch (error) {
      console.error('DELETE ERROR:', error);
    }
  };

  return { handleCreate, handleUpdate, handleDelete };
};
