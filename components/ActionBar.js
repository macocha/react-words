import React from 'react';

export default class ActionBar extends React.Component {
  render() {
    return (
      <div className='action-bar'>
        <input className='action-bar-input' readOnly tabIndex={-1} value={this.props.currentGuess}/>
        <button className='action-bar-clear' onClick={() => this.props.onClearClick()}>X</button>
        <button className='action-bar-guess' onClick={() => this.props.onGuessClick()}>Guess</button>
        <button className='action-bar-guess' onClick={() => this.props.onShuffleClick()}>Shuffle</button>
      </div>
    );
  }
}
