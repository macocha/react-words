import * as types from '../constants/ActionTypes';
import board from './board'
import shuffle from 'shuffle-array';

const initialState = {
  clues: [
    {text: 'The causing of any sort of mysterious sudden transmutation', answer: 'alchemy', solved:false},
    {text: 'A book of instructions in the use of magic, especially summoning demons.', answer: 'grimoire', solved:false},
    {text: 'Set of playing cards often used for mystical divination.', answer: 'tarot', solved:false},
    {text: 'Words or a formula supposed to have magical powers. ', answer: 'spell', solved:false},
    {text: 'A small portion or dose of a liquid which is magical.', answer: 'potion', solved: false},
    {text: 'A type of magical spell', answer: 'enchantment', solved: false},
    {text: 'Powerful wizard from LOTR', answer: 'gandalf', solved: false}
  ],
  currentGuess: '',
  score: 0,
  chunks: shuffle([
    {text: 'alc', id: '1', used: false, selected: false},
    {text: 'he', id: '2', used: false, selected: false},
    {text: 'my', id: '3', used: false, selected: false},
    {text: 'gr', id: '4', used: false, selected: false},
    {text: 'oi', id: '5', used: false, selected: false},
    {text: 'ta', id: '6', used: false, selected: false},
    {text: 'rot', id: '7', used: false, selected: false},
    {text: 'sp', id: '8', used: false, selected: false},
    {text: 'ell', id: '9', used: false, selected: false},
    {text: 'pot', id: '10', used: false, selected: false},
    {text: 'ion', id: '11', used: false, selected: false},
    {text: 'enc', id: '12', used: false, selected: false},
    {text: 'han', id: '13', used: false, selected: false},
    {text: 'tm', id: '14', used: false, selected: false},
    {text: 'ent', id: '15', used: false, selected: false},
    {text: 'ga', id: '16', used: false, selected: false},
    {text: 'nd', id: '17', used: false, selected: false},
    {text: 'alf', id: '18', used: false, selected: false},
    {text: 'im', id: '19', used: false, selected: false},
    {text: 're', id: '20', used: false, selected: false},
  ])
};

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
