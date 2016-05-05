import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions';
import { getValidFields } from '../redux/index';
import GamePage from './gamepage';
import IndexPage from './indexpage';

class App extends React.Component {
  render() {
    console.log(this.props);
    
    const mapPageToComponent = {
      'index': IndexPage,
      'game': GamePage,
    };
    
    const Page = mapPageToComponent[this.props.application.page];
    
    return (
      <div>
        <h1>Stratego</h1>
        
        <div>
          <Page />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);