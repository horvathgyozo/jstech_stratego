import React from 'react';

import Field from './field';
import Piece from './piece';

class GameTable extends React.Component {
  render() {
    const {colNum, rowNum, soldiers} = this.props;
    
    const fields = [];
    for (let i = 0; i < rowNum; i++) {
      for (let j = 0; j < colNum; j++) {
        fields.push(
          <Field 
            x={j} 
            y={i} 
            key={i+'_'+j} 
            actions={this.props.actions}
          />
        )
      }
    }
    
    const pieces = soldiers.map(soldier =>
      <Piece 
        x={soldier.x} 
        y={soldier.y}
        id={soldier.id}
        key={soldier.id}
        actions={this.props.actions}
      />
    );
    
    return (
      <div id="gameTable">
        
        {fields}
        
        {pieces}
        
      </div>      
    );
  }
}

export default GameTable;