module.exports = client;

function client( so, se ) {

  this.sock = so;
  this.server = se;
  this.name = this.sock.remoteAddress + ":" + this.sock.remotePort;

  this.sock.parent = this;
  this.sock.on( 'data', this.on_data );
  this.sock.on( 'end', this.on_end );

  this.server.broadcast( this.name + " has joined ", this.sock );
};

client.prototype.send = function( msg ) {
  this.sock.write( msg );
};

client.prototype.on_end = function() {
  this.parent.server.remove_client( this.parent );
}; 

client.prototype.on_data = function( data ) {
  var cl = this.parent;
  cl.server.broadcast( cl.name + "> " + data, cl );
};
