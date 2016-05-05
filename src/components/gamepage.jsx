import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';
import { getValidFields } from '../redux/index';
import GameTable from './gametable';

class GamePage extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <p>{this.props.gameState}</p>
        <GameTable 
          {...this.props}
          colNum={this.props.colNum}
          rowNum={this.props.rowNum}
          soldiers={this.props.soldiers}
          actions={this.props.actions}
          selected={this.props.selected}
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

function mapStateToProps(state) {
  return {
    ...state,
    validFields: state.selected
      ? getValidFields(state, state.selected.x, state.selected.y)
      : false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);