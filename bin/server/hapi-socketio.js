// From https://gist.github.com/pauldenotter/9261976
"use strict";

var socketIO = require('socket.io');
var board = require('../ding-ding');

exports.register = function(plugin, options, next) {
  // this is the hapi specific binding
  var io = socketIO.listen(plugin.servers[0].listener);

  io.on('connection', function(socket) {

    board.onReady.then(function(resp) {
      socket.on('button', function(data) {
        if (data) {
          var index = data.index;
          resp.playServo(index);
        }
      });
    });

  });

  next();
};

exports.register.attributes = {
  pkg: {
    name: 'hapi-socketio'
  }
};