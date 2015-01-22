var client = require('./client.js')
module.exports = server;

function server( p ) {
  this.net = require('net');
  this.clients = [];
  this.port = p;
};

server.prototype.remove_client = function( client ) {
  this.clients.splice( this.clients.indexOf( client ), 1);
  this.broadcast( client.name + " has disconnected" );
};

server.prototype.broadcast = function( msg, sender ) {

  for( var i=0 ; i< this.clients.length ; i++ ) {
    var cl = this.clients[i];
    if ( cl  !== sender ) cl.send( msg  );
  }
  console.log( msg.trim() );
};

server.prototype.run = function() {

  var serv = this;
  serv.serv = serv.net.createServer( function( s  ) {
    serv.clients.push( new client( s, serv ));
  }).listen( this.port );

  console.log( "serving at " + this.port + "\n" );
};
