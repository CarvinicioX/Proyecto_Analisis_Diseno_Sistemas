var sql = require('mssql');
exports.addClase = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	console.dir("######################### ADD Person #########################");
    	console.dir(request.payload);
	    request2.input('nombre', sql.NVarChar(40), request.payload.nombre)//request.payload.session)
	    request2.input('IDclase', sql.Int,request.payload.IDclase )
	
	    request2.execute('dbo.Clases', function(err, recordsets, returnValue, affected) {
	    	console.dir("######################### Returned #########################");
	    	console.dir(recordsets);
	        return reply(recordsets);
	    });
    }
};
