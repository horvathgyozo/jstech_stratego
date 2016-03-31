import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';
import GameTable from './gametable';

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <p>{this.props.gameState}</p>
        <GameTable 
          colNum={this.props.colNum}
          rowNum={this.props.rowNum}
          soldiers={this.props.soldiers}
          actions={this.props.actions}
        />   
      </div>   
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(state => state, mapDispatchToProps)(App);