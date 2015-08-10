import React from 'react';
import Clue from './Clue'

export default class CluesList extends React.Component {
  render() {
    return (
      <ol className='clues-list'>
          {this.props.clues.map((clue, index) =>
             <Clue {...clue}
                  key={index} />
          )}
      </ol>
    );
  }
}
