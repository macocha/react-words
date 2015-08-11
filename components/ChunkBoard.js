import React from 'react';
import Chunk from './Chunk';

export default class ChunkBoard extends React.Component {
  render() {
    return (
      <div className='chunk-board'>
        {this.props.chunks.map((chunk) =>
           <Chunk {...chunk}
                key = {`chunk${chunk.id}`}
                onClick = {() => this.props.onChunkClick(chunk.id)}/>
        )}
      </div>
    );
  }
}
