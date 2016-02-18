require('normalize.css');
require('styles/App.css');

import React from 'react';
import Tile from './Tile';
import Board from './Board'

var AppComponent = React.createClass({

  render: function () {
    return (
      <div>
      <Board size={6} width={600}/>

      </div>);
  }

});

export default AppComponent;
