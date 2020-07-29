import {
  FETCH_PLAYERS_SUCCESS,
  UPDATE_PLAYER_SUCCESS,
  CREATE_PLAYER_SUCCESS,
  DELETE_PLAYER_SUCCESS,
} from './constants';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach((player) => {
    newState[player.id] = player;
  });
  return newState;
}

function updatePlayer(state, player) {
  const newState = { ...state };
  newState[player.id] = player;
  return newState;
}

function deletePlayer(state, id) {
  const newState = { ...state };
  delete newState[id];
  return newState;
}

export default function players(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    case UPDATE_PLAYER_SUCCESS:
      return updatePlayer(state, action.payload.data);
    case CREATE_PLAYER_SUCCESS:
      return updatePlayer(state, action.payload.data);
    case DELETE_PLAYER_SUCCESS:
      return deletePlayer(state, action.payload.data);
    default:
      return state;
  }
}
