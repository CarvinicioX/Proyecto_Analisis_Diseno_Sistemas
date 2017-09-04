var sql = require('mssql');
exports.addAlumno = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	console.dir("######################### ADD alumno #########################");
    	console.dir(request.payload);
	    request2.input('IDalumno', sql.int, request.payload.IDalumno)//request.payload.session)
	    request2.input('nombre', sql.NVarChar(50), request.payload.nombre )
	    request2.input('birth_date', sql.date, request.payload.nombre)
	    request2.input('alergias', sql.NVarChar(50), request.payload.alergias)	
	    request2.input('IDusuario', sql.int, request.payload.IDusuario)
	    request2.input('IDpadre', sql.int, request.payload.IDpadre)

	    request2.execute('dbo.ADM_Persons', function(err, recordsets, returnValue, affected) {
	    	console.dir("######################### Returned #########################");
	    	console.dir(recordsets);
	        return reply(recordsets);
	    });
    }
};