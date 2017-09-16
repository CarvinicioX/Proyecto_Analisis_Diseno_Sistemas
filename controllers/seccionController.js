var sql = require('mssql');

/*INSERT SECCIONES*/
exports.insert_seccion = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Secciones (IDgrado, IDmaestro, IDclase, anio)";
    	query_string+=" VALUES (\'"+request.payload.IDgrado+"\', \'"+request.payload.IDmaestro+"\', \'"+request.payload.IDclase+"\', \'"+request.payload.anio+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE SECCIONES*/
exports.update_seccion = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Secciones";
    	query_string+=" SET IDgrado = \'"+request.payload.IDgrado+"\', IDmaestro = \'"+request.payload.IDmaestro+"\', IDclase = \'"+request.payload.IDclase+"\', anio = \'"+request.payload.anio+"\'";
    	query_string+=" WHERE Secciones.IDseccion = "+request.payload.IDseccion;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE SECCIONES*/
exports.delete_seccion = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Secciones";
    	query_string+=" WHERE Secciones.IDseccion = "+request.payload.IDseccion;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET SECCIONES*/
exports.get_secciones = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Secciones";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};