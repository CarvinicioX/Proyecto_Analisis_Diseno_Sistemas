var sql = require('mssql');

/*INSERT GRADOS*/
exports.insert_grado = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Grado (grado)";
    	query_string+=" VALUES (\'"+request.payload.grado+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE GRADOS*/
exports.update_grado = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Grado";
    	query_string+=" SET grado = \'"+request.payload.grado+"\'";
    	query_string+=" WHERE Grado.IDgrado = "+request.payload.IDgrado;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE GRADOS*/
exports.delete_grado = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Grado";
    	query_string+=" WHERE Grado.IDgrado = "+request.payload.IDgrado;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET GRADOS*/
exports.get_grados = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Grado";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};