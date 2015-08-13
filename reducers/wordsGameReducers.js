import * as types from '../constants/ActionTypes';
import shuffle from 'shuffle-array';


//TODO Auto-generation of words and chunks.
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
const numOfChunks = 20;

//n is a number of chunks to split to
function splitIntoChunks(word, n) {
  if (n === undefined) {
    if (word.length < 2)
      throw 'somehow chunk got smaller than 2 chars';
    else if (word.length === 2 || word.length === 3)
      return [word]
    else if (word.length === 4)
      return [word.slice(0, 2), word.slice(2)]
    else if (word.length < 7) {
      let slicePoint = Math.floor(Math.random()*2) + 2;
      return [word.slice(0, slicePoint)].concat(splitIntoChunks(word.slice(slicePoint)));
    } else {
      let slicePoint = Math.floor(Math.random()*3) + 2;
      return [word.slice(0, slicePoint)].concat(splitIntoChunks(word.slice(slicePoint)));
    }
  } else {
    if (n*2 > word.length || n <= 0)
      throw `Can't do it sire.`;
    else if (n == 1)
      return [word]
    else {
      let slicePoint = Math.round(word.length/n);
      return [word.slice(0, slicePoint)].concat(splitIntoChunks(word.slice(slicePoint), n-1));
    }
  }
}

export function prepareChunks(wordsList) {
  let wordsToFit = 2;
  let tries = 0;
  wordsList.sort((a,b) => a.length - b.length);
  //Sort array by word length, so we have longer words to fit in the end
  //It tries to split the words a few times, just in case rngesus is not on our side.
  while(++tries) {
    try {
      let chunks = [];
      for (let i = 0; i < wordsList.length-wordsToFit; i++) {
        chunks = chunks.concat(splitIntoChunks(wordsList[i]));
      }
      for (let i = wordsList.length - wordsToFit; i < wordsList.length; i++) {
        chunks = chunks.concat(splitIntoChunks(wordsList[i], Math.floor((numOfChunks - chunks.length)/(wordsList.length - i))));
      }
      return chunks;
    } catch (e) {
      if (tries > 10) {
        wordsToFit = 3;
      }
      if (tries > 20) {
        return undefined;
      }
    }
  }
}

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
      if (clueIndex != -1)
        return Object.assign({}, state, {
          currentGuess: '',
          score: state.score + scoreIncrement,
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
        });

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

    //It shuffles the chunk array.
    case types.SHUFFLE:
      return Object.assign({}, state, {
        chunks: shuffle(state.chunks, {'copy': true}),
      });
    default:
      return state;
  }
}
