import React from 'react';
import CluesList from '../components/CluesList';
import ActionBar from '../components/ActionBar';
import ChunkBoard from '../components/ChunkBoard'

export default class WordsGame extends React.Component {
  render() {
    const clues = [
      {text: 'The causing of any sort of mysterious sudden transmutation', answer: 'alchemy', solved:false},
      {text: 'A book of instructions in the use of magic, especially summoning demons.', answer: 'grimoire', solved:true},
      {text: 'Set of playing cards often used for mystical divination.', answer: 'tarot', solved:false},
      {text: 'Words or a formula supposed to have magical powers. ', answer: 'spell', solved:true},
      {text: 'A small portion or dose of a liquid which is magical.', answer: 'potion', solved: false},
      {text: 'A type of magical spell', answer: 'enchantment', solved: false},
      {text: 'Powerful wizard from LOTR', answer: 'gandalf', solved: false}
    ];
    const currentGuess = 'justatest'
    return (
      <div>
        <CluesList clues = {clues} />
        <ActionBar currentGuess = {currentGuess} />
        <ChunkBoard />
      </div>
    );
  }
}
