import * as types from '../constants/ActionTypes';
import board from './board'
import shuffle from 'shuffle-array';

const initialState = Object.assign({
  currentGuess: '',
  score: 0,
}, board(undefined, {}));

const scoreIncrement = 10;
const clearBonus = 30;

//Game logic reducer
export function wordsGame(state = initialState, action) {
  switch (action.type) {
    //First find index from id of clicked chunk, then do the magic.
    case types.SELECT_CHUNK:
      let index = state.chunks.findIndex(c => c.id === action.id);
      return Object.assign({}, state, {
        currentGuess: state.currentGuess + state.chunks[index].text,
        chunks: [
          ...state.chunks.slice(0, index),
          Object.assign({}, state.chunks[index], {
            selected: true
          }),
          ...state.chunks.slice(index+1)
        ],
      });

    //If the guess is right we'll take care of things. Otherwise let it slide to CLEAR_INPUT.
    case types.MAKE_GUESS:
      let clueIndex = state.clues.findIndex(c => c.answer === state.currentGuess);
      //Needed to check if it's the last one solved
      const numOfUnsolved = state.clues.filter(c => !c.solved).length;
      if (clueIndex != -1)
        //Create new state and pass it to the board reducer for new board generation if needed.
        return board(Object.assign({}, state, {
          currentGuess: '',
          score: state.score + scoreIncrement + (numOfUnsolved === 1 ? clearBonus : 0),
          clues: [
            ...state.clues.slice(0, clueIndex),
            Object.assign({}, state.clues[clueIndex], {
              solved: true
            }),
            ...state.clues.slice(clueIndex+1)
          ],
          chunks: state.chunks.map(chunk => {
            if (chunk.selected === true)
              return Object.assign({}, chunk, {
                  selected: false,
                  used: true,
              });
            else
              return chunk;
          }),
        }), action);

    //Just clear the var, then go through all objects and turn off the selection
    case types.CLEAR_INPUT:
      return Object.assign({}, state, {
        currentGuess: '',
        chunks: state.chunks.map(chunk => {
          if (chunk.selected === true)
            return Object.assign({}, chunk, {
                selected: false
            });
          else
            return chunk;
        }),
      });

    //Send actions to board reducer.
    case types.NEW_BOARD:
    case types.SHUFFLE:
      return Object.assign({}, state, board(state, action));

    default:
      return state;
  }
}
