var sql = require('mssql');

/*INSERT CALIFICACIONES*/
exports.insert_calificacion = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Calificacion (IDtarea, IDalumno, parcial, valor, IDseccion)";
    	query_string+=" VALUES (\'"+request.payload.IDtarea+"\', \'"+request.payload.IDalumno+"\', \'"+request.payload.parcial+"\', \'"+request.payload.valor+"\', \'"+request.payload.IDseccion+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE CALIFICACIONES*/
exports.update_calificacion = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Calificacion";
    	query_string+=" SET IDtarea = \'"+request.payload.IDtarea+"\', IDalumno = \'"+request.payload.IDalumno+"\', parcial = \'"+request.payload.parcial+"\', valor = \'"+request.payload.anio+"\', IDseccion = \'"+request.payload.IDseccion+"\'";
    	query_string+=" WHERE Calificacion.codigo = "+request.payload.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE CALIFICACIONES*/
exports.delete_calificacion = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Calificacion";
    	query_string+=" WHERE Calificacion.codigo = "+request.payload.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET CALIFICACIONES*/
exports.get_calificaciones = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Calificacion";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};