var sql = require('mssql');
exports.addMaestro = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	console.dir("######################### ADD Person #########################");
    	console.dir(request.payload);
	     request2.input('IDusuario', sql.Int, request.payload.IDusuario )//request.payload.session)
	    request2.input('IDmaestro', sql.Int, request.payload.IDmaestro )
	    request2.input('nombre', sql.NVarChar(50), request.payload.nombre)
	     request2.input('direccion', sql.NVarChar(50), request.payload.direccion)
	      request2.input('telefono', sql.NVarChar(50), request.payload.telefono)
	       request2.input('email', sql.NVarChar(50), request.payload.email)
	     request2.input('birth_date', sql.date, request.payload.birth_date)
	    request2.execute('dbo.Maestros', function(err, recordsets, returnValue, affected) {
	    	console.dir("######################### Returned #########################");
	    	console.dir(recordsets);
	        return reply(recordsets);
	    });
    }
};