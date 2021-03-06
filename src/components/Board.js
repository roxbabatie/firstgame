require('normalize.css');
require('styles/App.css');

import React from 'react';
import Tile from './Tile';


var Board = React.createClass({
  getInitialState: function() {
    var width = this.props.width;
    var size = this.props.size;
    var tileWidth = width/size;
    var empty = width - tileWidth;
    var board = [];

    for (var i=0; i< (size*size-1); i++) {
      var x = Math.floor(i%size)*tileWidth;
      var y = Math.floor(i/size)*tileWidth;
      var pos = {x:x, y:y};
      var startPos = {x:x, y:y};
      board.push({pos: pos, startPos: startPos})
    }

    return {
      emptyPos: {
        x: empty,
        y: empty
      },
      board: board,
      size: size,
      width: width,
      tileWidth: tileWidth
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
      startPos={this.state.board[i].startPos}
      onClick={this.onTileClick}
      tileWidth={this.state.tileWidth}
      width={this.state.width}
    />
      tiles.push(tile)

    }

    var boardStyle = {width: this.state.width, height: this.state.width};
    return (
      <div>
      <div className="board" style={boardStyle}>
      {tiles}

      </div>
        <button onClick={this.shuffle}>Shuffle</button>
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
    this.forceUpdate(this.win);
    //this.win();
  },

  isValidMove: function(startPos, targetPos){
    var diffX = Math.round(Math.abs(targetPos.x - startPos.x));
    var diffY = Math.round(Math.abs(targetPos.y - startPos.y));
    var tileWidthRounded = Math.round(this.state.tileWidth);
    var validX = diffX === tileWidthRounded && diffY === 0;
    var validY = diffY === tileWidthRounded && diffX === 0;

    if(validX || validY){
      return true;
    }

    return false

  },
  shuffle: function() {
    var boardArray = this.state.board;
    var index = boardArray.length;
    var obj = {};
    var randomIndex;
    while (0 !== index) {
      randomIndex = Math.floor(Math.random() * index);
      index = index-1;
      obj.pos = boardArray[index].pos;
      boardArray[index].pos = boardArray[randomIndex].pos;
      boardArray[randomIndex].pos = obj.pos;
    }
    this.setState({board:boardArray})
  },
  win: function() {
    var board = this.state.board;
    var index = board.length;
    for ( var i = 0; i < index; i++) {
      if ((board[i].pos.x != board[i].startPos.x) || (board[i].pos.y != board[i].startPos.y)) {
        return false;
      }
    }
    alert("you win hahahaha");
    return true;

  }

});

export default Board;
