var sql = require('mssql');

/*INSERT PADRES*/
exports.insert_padre = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Padres (nombre, telefono, direccion, correo)";
    	query_string+=" VALUES (\'"+request.payload.nombre+"\', \'"+request.payload.telefono+"\', \'"+request.payload.direccion+"\',\'"+request.payload.correo+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE PADRES*/
exports.update_padre = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Padres";
    	query_string+=" SET nombre = \'"+request.payload.nombre+"\', telefono = \'"+request.payload.telefono+"\', direccion = \'"+request.payload.direccion+"\', correo = \'"+request.payload.correo+"\'";
    	query_string+=" WHERE Padres.IDpadre = "+request.payload.IDpadre;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE PADRES*/
exports.delete_padre = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Padres";
    	query_string+=" WHERE Padres.IDpadre = "+request.payload.IDpadre;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET PADRES*/
exports.get_padre = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Padres";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};