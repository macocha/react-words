import React from 'react';
import classnames from 'classnames';

export default class Clue extends React.Component {
  render() {
    return (
          <li className={classnames(['clue', {'clue-solved': this.props.solved}])}>
            <div className='clue-text'>{this.props.text}</div>
            <div className='clue-answer'>{this.props.solved?this.props.answer:`${this.props.answer.length} letters`}</div>
          </li>
    );
  }
}
