import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/WordsGameActions';
import CluesList from '../components/CluesList';
import ActionBar from '../components/ActionBar';
import ChunkBoard from '../components/ChunkBoard'

//Main class for the game
class WordsGame extends React.Component {
  render() {
    return (
      <div>
        <CluesList clues = {this.props.clues} />
        <ActionBar currentGuess = {this.props.currentGuess}
          onGuessClick = {() => this.props.dispatch(actions.makeGuess())}
          onClearClick = {() => this.props.dispatch(actions.clearInput())}
          onShuffleClick = {() => this.props.dispatch(actions.shuffle())} />
        <ChunkBoard chunks = {this.props.chunks} onChunkClick = {(id) => this.props.dispatch(actions.selectChunk(id))}/>
      </div>
    );
  }
}

//Connect to redux store
export default connect(s => s)(WordsGame);
