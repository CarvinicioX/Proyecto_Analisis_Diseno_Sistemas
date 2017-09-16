var sql = require('mssql');

/*INSERT MAESTROS*/
exports.insert_maestro = {
	handler: function(request, reply) {
		var request2 = new sql.Request();
		var query_string = "INSERT INTO Maestros (nombre, direccion, telefono, email, birth_date)";
		query_string+=" VALUES (\'"+request.payload.nombres+"\', \'"+request.payload.direccion+"\', \'"+request.payload.telefono+"\',\'"+request.payload.email+"\',\'"+request.payload.birth_date+"\')";
		request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
	}
};

/*UPDATE MAESTROS*/
exports.update_maestro = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Maestros";
    	query_string+=" SET nombre = \'"+request.payload.nombre+"\', direccion = \'"+request.payload.direccion+"\', telefono = \'"+request.payload.telefono+"\', email = \'"+request.payload.email+"\', birth_date = \'"+request.payload.birth_date+"\'";
    	query_string+=" WHERE Maestros.IDmaestro = "+request.payload.IDmaestro;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*DELETE MAESTROS*/
exports.delete_maestro = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Maestros";
    	query_string+=" WHERE Maestros.IDmaestro = "+request.payload.IDmaestro;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET MAESTROS*/
exports.get_maestros = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Maestros";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};