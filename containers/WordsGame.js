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
    const chunks = [
      {text: 'alc', id: '', used: false},
      {text: 'he', id: '', used: false},
      {text: 'my', id: '', used: false},
      {text: 'gr', id: '', used: false},
      {text: 'oi', id: '', used: false},
      {text: 'ta', id: '', used: false},
      {text: 'rot', id: '', used: false},
      {text: 'sp', id: '', used: false},
      {text: 'ell', id: '', used: false},
      {text: 'pot', id: '', used: false},
      {text: 'ion', id: '', used: true},
      {text: 'enc', id: '', used: false},
      {text: 'han', id: '', used: true},
      {text: 'tm', id: '', used: false},
      {text: 'ent', id: '', used: false},
      {text: 'ga', id: '', used: false},
      {text: 'nd', id: '', used: false},
      {text: 'alf', id: '', used: false},
      {text: 'im', id: '', used: false},
      {text: 're', id: '', used: false},
    ]
    return (
      <div>
        <CluesList clues = {clues} />
        <ActionBar currentGuess = {currentGuess} />
        <ChunkBoard chunks = {chunks} />
      </div>
    );
  }
}
