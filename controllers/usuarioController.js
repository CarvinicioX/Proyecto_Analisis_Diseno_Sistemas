var sql = require('mssql');

/*INSERT USUARIOS*/
exports.insert_user = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Usuarios (username, password, scope)";
    	query_string+=" VALUES (\'"+request.payload.username+"\', \'"+request.payload.password+"\', \'"+request.payload.scope+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE USUARIOS*/
exports.update_user = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Usuarios";
    	query_string+=" SET username = \'"+request.payload.username+"\', password = \'"+request.payload.password+"\', scope = \'"+request.payload.scope+"\'";
    	query_string+=" WHERE Usuarios.IDusuario = "+request.payload.IDusuario;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE USUARIOS*/
exports.delete_user = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Usuarios";
    	query_string+=" WHERE Usuarios.IDusuario = "+request.payload.IDusuario;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};