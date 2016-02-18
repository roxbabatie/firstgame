require('normalize.css');
require('styles/App.css');

import React from 'react';
import Tile from './Tile';

var Board = React.createClass({
  getInitialState: function() {
    var width = this.props.width;
    var size = this.props.size;
    var tileWidth = width/size;
    var empty = width - 100;
    var board = [];
    for (var i=0; i< (size*size-1); i++) {
      var x = Math.floor(i%size)*tileWidth;
      var y = Math.floor(i/size)*tileWidth;
      var pos = {x:x, y:y};
      board.push({number: i+1, pos: pos})
    }
    return {
      emptyPos: {
        x: empty,
        y: empty
      },
      board: board,
      size: size,
      width: width
    }
  },
  render: function () {
    var tiles = [];
    for (var i=0; i < (this.state.size*this.state.size - 1); i++) {
      var tile = <Tile
      index={i}
      key = {i}
      number={i+1}
      position={this.state.board[i].pos}
      onClick={this.onTileClick}
    />
      tiles.push(tile)
    }

    var boardStyle = {width: this.state.width, height: this.state.width};
    return (
      <div>
      <div className="board" style={boardStyle}>
      {tiles}
      </div>
      </div>);
  },

  onTileClick: function(index) {
    var isValidMove = this.isValidMove( this.state.board[index].pos,this.state.emptyPos);
    if(!isValidMove){
      return alert("No good!Go home!")
    }
    var obj = {};
    obj = this.state.board[index].pos;
    this.state.board[index].pos = this.state.emptyPos;
    this.state.emptyPos = obj;
    this.forceUpdate();
  },

  isValidMove: function(startPos, targetPos){
    var diffX = Math.abs(targetPos.x - startPos.x);
    var diffY = Math.abs(targetPos.y - startPos.y);
    var validX = diffX === 100 && diffY === 0;
    var validY = diffY === 100 && diffX === 0;

    if(validX || validY){
      return true;
    }

    return false
  }


});

export default Board;
