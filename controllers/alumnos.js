var sql = require('mssql');

/*INSERT ALUMNOS*/
exports.insert_alumno = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Alumnos (nombres, apellidos, nacimiento, departamento)";
    	query_string+=" VALUES (\'"+request.payload.nombres+"\', \'"+request.payload.apellidos+"\', \'"+request.payload.nacimiento+"\',\'"+request.payload.departamento+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE ALUMNOS*/
exports.update_alumno = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Alumnos";
    	query_string+=" SET nombres = \'"+request.payload.nombres+"\', apellidos = \'"+request.payload.apellidos+"\', nacimiento = \'"+request.payload.nacimiento+"\', departamento = \'"+request.payload.departamento+"\'";
    	query_string+=" WHERE Alumnos.alumno_id = "+request.payload.alumno_id;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE ALUMNOS*/
exports.delete_alumno = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Alumnos";
    	query_string+=" WHERE Alumnos.alumno_id = "+request.payload.alumno_id;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET ALUMNOS*/
exports.get_alumnos = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Alumnos";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};