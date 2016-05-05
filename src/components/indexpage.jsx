import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';
import { getValidFields } from '../redux/index';

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Főoldal</h2>
        <h3>Publikus játék</h3>
        <input type="button" value="Start"
          onClick={() => this.props.actions.startPublicGame()}
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
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);