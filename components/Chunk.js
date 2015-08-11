import React from 'react';
import classnames from 'classnames';

export default class Chunk extends React.Component {
  render() {
    return (
      <div className='chunk-board-chunk'
           onClick={this.props.onClick}
           style={(this.props.used||this.props.selected)?{visibility: 'hidden'}:{}}>{this.props.text}</div>
    );
  }
}
