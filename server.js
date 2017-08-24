var sql = require('mssql');
var hapi = require('hapi');
var inert = require('inert');
var routes = require('./routes');
var auth = require('hapi-auth-cookie');



var server = new hapi.Server();
server.connection({
    host:'localhost',
    port: 8000,
    routes: { cors:true}});
  

var config = {
    user: '',
    password: '',
    server: '',
    port: 0000,
    database: '',
    requestTimeout: 300000
}



sql.connect(config).then(function() {
  console.log("Connection with database succeeded.");
}).catch(function(err) {
  console.log("Connection to database error.");
  console.log(err);
});



server.register([inert, auth], function(err){
	server.route(routes.endpoints);
	server.start(function () {
	    console.log('Server running at:', server.info.uri);
	});
});
