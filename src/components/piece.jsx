import React from 'react';
import ReactDOM from 'react-dom';

class Piece extends React.Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    // console.log(el);
    el.addEventListener('transitionend', e => {
      // console.log(e);
      this.props.actions.endMoving();
    });
  }
  render() {
    const style = {
      transform: `translate3d(${this.props.x * 50 + 4}px,${this.props.y * 50 + 4}px,0px)`,
      borderColor: this.props.selected ? 'orange' : '',
      backgroundColor: this.props.color
    };
    return (
      <div 
        className="piece" 
        style={style}
        onClick={() => this.props.actions.selectSoldier({
          x: this.props.x,
          y: this.props.y,
          id: this.props.id,
          color: this.props.color,
          value: this.props.value,
        })}
      >
      {this.props.value}
      </div>
    );
  }
}

export default Piece;