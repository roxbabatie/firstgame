require('normalize.css');
require('styles/App.css');

import React from 'react';
var Tile = React.createClass({

  onClick: function () {
    this.props.onClick(this.props.index)
  },

  render: function () {
    var pos = this.props.position;
    var startPos= this.props.startPos;
    var number = this.props.number;
    var tileWidth = this.props.tileWidth;
    var width =  this.props.width;
    var style = {left: pos.x, top: pos.y, width: tileWidth, height: tileWidth, backgroundSize: width, backgroundPositionX: -startPos.x, backgroundPositionY: -startPos.y };

    return (
      <div className="tile" style={style} onClick={this.onClick}>
        <span></span>
      </div>
    );

  }

});

export default Tile;
