var sql = require('mssql');

/*INSERT ADMIN*/
exports.insert_admin = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Administrador (nombre, telefono, email, direccion)";
    	query_string+=" VALUES (\'"+request.payload.nombre+"\', \'"+request.payload.telefono+"\', \'"+request.payload.email+"\',\'"+request.payload.direccion+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE ADMIN*/
exports.update_admin = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Administrador";
    	query_string+=" SET nombre = \'"+request.payload.nombre+"\', telefono = \'"+request.payload.telefono+"\', email = \'"+request.payload.email+"\', direccion = \'"+request.payload.direccion+"\'";
    	query_string+=" WHERE Administrador.IDadmin = "+request.payload.IDadmin;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE ADMIN*/
exports.delete_admin = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Administrador";
    	query_string+=" WHERE Administrador.IDadmin = "+request.payload.IDadmin;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET ADMIN*/
exports.get_admin = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Administrador";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};