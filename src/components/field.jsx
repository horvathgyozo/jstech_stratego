import React from 'react';

class Field extends React.Component {
  render() {
    // console.log(this.props)
    
    const style = {
      transform: `translate3d(${this.props.x * 50}px,${this.props.y * 50}px,0px)`      
    };
    
    return (
      <div 
        className="field" 
        style={style}
        onClick={() => this.props.actions.selectField({
          x: this.props.x,
          y: this.props.y,
        })}
      ></div>
    );
  }
}

export default Field;