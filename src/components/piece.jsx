import React from 'react';

class Piece extends React.Component {
  render() {
    const style = {
      transform: `translate3d(${this.props.x * 50 + 4}px,${this.props.y * 50 + 4}px,0px)`
    };
    return (
      <div 
        className="piece" 
        style={style}
        onClick={() => this.props.actions.selectSoldier({
          x: this.props.x,
          y: this.props.y,
          id: this.props.id,
        })}
      >
      </div>
    );
  }
}

export default Piece;