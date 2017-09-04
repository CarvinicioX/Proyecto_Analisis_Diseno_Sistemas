var sql = require('mssql');
exports.addSeccion = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	console.dir("######################### ADD Person #########################");
    	console.dir(request.payload);
    	request2.input('IDclase', sql.Int,request.payload.IDclase )
    	request2.input('IDseccion', sql.Int,request.payload.IDseccion)
    	request2.input('IDmaestro', sql.Int,request.payload.IDmaestro )
    	request2.input('IDgrado', sql.Int,request.payload.IDgrado )
    	request2.input('anio', sql.Int,request.payload.anio )

	    request2.execute('dbo.Secciones', function(err, recordsets, returnValue, affected) {
	    	console.dir("######################### Returned #########################");
	    	console.dir(recordsets);
	        return reply(recordsets);
	    });
    }
};

