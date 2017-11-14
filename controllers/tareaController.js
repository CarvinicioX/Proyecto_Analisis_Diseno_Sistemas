var sql = require('mssql');

/*INSERT TAREA*/
exports.insert_tarea = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO Tareas (entrega, asignada, entregada, IDseccion, nombre, tipo, descripcion, valor)";
    	query_string+=" VALUES (\'"+request.payload.entrega+"\', \'"+request.payload.asignada+"\', \'"+request.payload.entregada+"\', \'"+request.payload.IDseccion+"\', \'"+request.payload.nombre+"\', \'"+request.payload.tipo+"\', \'"+request.payload.descripcion+"\', \'"+request.payload.valor+"\')";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE TAREA*/
exports.update_tarea = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Tareas";
    	query_string+=" SET entrega = \'"+request.payload.entrega+"\', telefono = \'"+request.payload.asignada+"\', entregada = \'"+request.payload.entregada+"\', IDseccion = \'"+request.payload.IDseccion+"\', nombre = \'"+request.payload.nombre+"\', tipo = \'"+request.payload.tipo+"\', descripcion = \'"+request.payload.descripcion+"\', valor = \'"+request.payload.valor+"\')";
    	query_string+=" WHERE Tareas.IDtarea = "+request.payload.IDtarea;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE TAREA*/
exports.delete_tarea = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Tareas";
    	query_string+=" WHERE Tareas.IDtarea = "+request.payload.IDtarea;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET TAREA*/
exports.get_tarea = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Tareas";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};