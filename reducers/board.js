import * as types from '../constants/ActionTypes';
import { clues } from '../constants/CluesList';
import shuffle from 'shuffle-array';

const numOfChunks = 20;
const maxChunk = 6;

const initialState = board({},{type: types.NEW_BOARD});

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
      let slicePoint = Math.floor(Math.random()*4) + 2;
      return [word.slice(0, slicePoint)].concat(splitIntoChunks(word.slice(slicePoint)));
    }
  } else {
    if (n*2 > word.length || n <= 0)
      throw `Can't do it sire.`;
    else if (Math.round(word.length/n) > maxChunk)
      throw `Can't do it sire.`;
    else if (n == 1)
      return [word];
    else {
      let slicePoint = Math.round(word.length/n);
      return [word.slice(0, slicePoint)].concat(splitIntoChunks(word.slice(slicePoint), n-1));
    }
  }
}

function prepareChunks(wordsList) {
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

//Board (meta-game) reducer
export default function board(state = initialState, action) {
  switch (action.type) {

    case types.SHUFFLE:
      return Object.assign({}, state, {
        chunks: shuffle(state.chunks, {'copy': true}),
      });

    //If we got all words solved, then slide down to NEW_BOARD otherwise do nothing
    case types.MAKE_GUESS:
      if(state.clues.filter(c => !c.solved).length)
        return state;

    case types.NEW_BOARD:
      let newChunks = undefined;
      let newClues = []

      //This loop is just in case, we randomed some words that won't fit into the grid.
      while (!newChunks) {
        newClues = shuffle.pick(clues, {picks: 7}).map(c => Object.assign(c, {solved: false}));
        const answers = newClues.map(c => c.answer);
        newChunks = prepareChunks(answers);
      }

      return Object.assign({}, state, {
        clues: newClues,
        chunks: shuffle(newChunks.map((chunk, i) => ({text: chunk, id: String(i), used: false, selected: false}))),
      });

    default:
      return state;
  }
}
