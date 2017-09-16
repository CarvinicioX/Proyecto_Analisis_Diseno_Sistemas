var sql = require('mssql');

/*INSERT CLASES*/
exports.insert_clase = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Clases (nombre)";
    	query_string+=" VALUES (\'"+request.payload.nombre+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE CLASES*/
exports.update_clase = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Clases";
    	query_string+=" SET nombre = \'"+request.payload.nombre+"\'";
    	query_string+=" WHERE Clases.IDclase = "+request.payload.IDclase;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE CLASES*/
exports.delete_clase = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Clases";
    	query_string+=" WHERE Clases.IDclase = "+request.payload.IDclase;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET CLASES*/
exports.get_clases = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Clases";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};