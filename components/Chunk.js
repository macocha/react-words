import React from 'react';
import classnames from 'classnames';

export default class Chunk extends React.Component {
  render() {
    return (
      <div className='chunk-board-chunk' style={this.props.used?{visibility: 'hidden'}:{}}>{this.props.text}</div>
    );
  }
}
