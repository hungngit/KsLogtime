/**
 * Module dependencies.
 */
var express = require('express');

// Node express server setup.
var server = express();

server.use("/spentOn*", function(req, res, next){
	res.sendFile(__dirname + '/index.html');
});

server.use("/super*", function(req, res, next){
	res.sendFile(__dirname + '/index.html');
});

server.use(express.static(__dirname + '/'));

server.set('port', (process.env.PORT || 80));
server.listen(server.get('port'), function(){
	console.log('Server Listen on Port ' + server.get('port'));
});