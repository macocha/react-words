import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
            <div className='header'>
              <h1>React Words</h1>
              <div className='header-score'>{this.props.score}</div>
            </div>
    );
  }
}
