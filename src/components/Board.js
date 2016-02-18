require('normalize.css');
require('styles/App.css');

import React from 'react';
import Tile from './Tile';

var Board = React.createClass({
  getInitialState: function() {
    var board = [];
    for (var i=0; i<8; i++) {
      var x = Math.floor(i%3)*100;
      var y = Math.floor(i/3)*100;
      var pos = {x:x, y:y};
      board.push({number: i+1, pos: pos})
    }
    return {
      emptyPos: {
        x: 200,
        y: 200
      },
      board: board,

    }
  },

  render: function () {
    var tiles = [];
    for (var i=0; i<8; i++) {
      var tile = <Tile
      index={i}
      key = {i}
      number={i+1}
      position={this.state.board[i].pos}
      onClick={this.onTileClick}
    />
      tiles.push(tile)
    }


    return (
      <div>
      <div className="board">
      {tiles}
      </div>
      </div>);
  },

  onTileClick: function(index) {
    var isValidMove = this.isValidMove( this.state.board[index].pos,this.state.emptyPos)
    if(!isValidMove){
      return alert("No good!Go home!")
    }
    var obj = {};
    obj = this.state.board[index].pos;
    this.state.board[index].pos = this.state.emptyPos;
    this.state.emptyPos = obj;
    this.forceUpdate();
//      alert("it is clicked " + index) ;
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
