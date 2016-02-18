require('normalize.css');
require('styles/App.css');

import React from 'react';
var Tile = React.createClass({

  onClick: function () {
    this.props.onClick(this.props.index)
  },

  render: function () {
    var pos = this.props.position;
    var style = {left: pos.x, top: pos.y};
    var number = this.props.number;
    return (
      <div className="tile" style={style} onClick={this.onClick}>
        <span>{ number }</span>
      </div>
    );
  }

});

export default Tile;
