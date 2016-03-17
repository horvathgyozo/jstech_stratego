import React from 'react';
import GameTable from './gametable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colNum: 5,
      rowNum: 6,
      soldiers: [
        { id: 'r1',   x: 0, y: 0 },
        { id: 'r5_1', x: 2, y: 2 },
        { id: 'r8_2', x: 3, y: 2 },
      ],
      gameState: 'SELECTING',
      selected: false,
    };
  }
  
  onPieceClick(par) {
    // console.log(par);
    this.setState({
      gameState: 'SELECTED',
      selected: par,
    })
  }
  
  render() {
    return (
      <div>
        <p>{this.state.gameState}</p>
        <GameTable 
          colNum={this.state.colNum}
          rowNum={this.state.rowNum}
          soldiers={this.state.soldiers}
          onPieceClick={(par) => this.onPieceClick(par)}
        />   
      </div>   
    );
  }
}

export default App;