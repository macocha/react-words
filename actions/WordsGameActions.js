import * as types from '../constants/ActionTypes.js';

export function makeGuess() {
  return {
    type: types.MAKE_GUESS,
  };
}

export function clearInput() {
  return {
    type: types.CLEAR_INPUT,
  };
}

export function selectChunk(id) {
  return {
    type: types.SELECT_CHUNK,
    id,
  };
}

export function shuffle() {
  return {
    type: types.SHUFFLE,
  };
}
