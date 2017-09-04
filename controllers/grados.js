var sql = require('mssql');
exports.addGrado = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	console.dir("######################### ADD Person #########################");
    	console.dir(request.payload);
	  request2.input('grado', sql.NVarChar(40), request.payload.grado)//request.payload.session)
	    request2.input('IDgrado', sql.Int,request.payload.IDgrado )
	    request2.execute('dbo.Grado', function(err, recordsets, returnValue, affected) {
	    	console.dir("######################### Returned #########################");
	    	console.dir(recordsets);
	        return reply(recordsets);
	    });
    }
};