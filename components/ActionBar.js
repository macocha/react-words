import React from 'react';

export default class ActionBar extends React.Component {
  render() {
    return (
      <div className='action-bar'>
        <input className='action-bar-input' readOnly tabIndex={-1} value={this.props.currentGuess}/>
        <button className='action-bar-clear' onClick={()=>console.log('clear')}>X</button>
        <button className='action-bar-guess' onClick={()=>console.log('guess')}>Guess</button>
      </div>
    );
  }
}
