import React from 'react';

class Field extends React.Component {
  render() {
    // console.log(this.props)
    
    const style = {
      transform: `translate3d(${this.props.x}px,${this.props.y}px,0px)`      
    };
    
    return (
      <div className="field" style={style}></div>
    );
  }
}

export default Field;