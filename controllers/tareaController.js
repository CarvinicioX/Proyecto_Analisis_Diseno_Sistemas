var sql = require('mssql');

/*INSERT TAREA*/
exports.insert_tarea = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "INSERT INTO tareas (fecha_inicio, fecha_final, estado, codigo_seccion, nombre, descripcion, valor, parcial)";
    	query_string+=" VALUES (\'"+request.payload.fecha_inicio+"\', \'"+request.payload.fecha_final+"\', 0 , \'"+request.payload.codigo_seccion+"\', \'"+request.payload.nombre+"\', \'"+request.payload.descripcion+"\', "+request.payload.valor+", "+request.payload.parcial+")";
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

exports.get_tareas_curso = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "SELECT * FROM tareas";
        query_string+=" WHERE codigo_seccion = " + request.query.codigo_seccion;
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

exports.update_tareas = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "UPDATE tareas";
        query_string=query_string+" SET nombre = \'"+request.payload.nombre+"\', descripcion = \'"+request.payload.descripcion+"\', valor = \'"+request.payload.valor+"\', fecha_inicio = \'"+request.payload.fecha_inicio+"\', fecha_final = \'"+request.payload.fecha_final +"\'";
        query_string=query_string+" WHERE codigo = \'"+request.payload.codigo+"\'";
        request2.query(query_string).then(function(recordset) {
            reply(1);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*DELETE SECCIONES*/
exports.delete_tareas = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "DELETE FROM tareas";
        query_string= query_string+" WHERE codigo = "+request.query.codigo;
        request2.query(query_string).then(function(recordset) {
            reply(1);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

exports.post_calificar = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "INSERT INTO calificacion (codigo_curso, codigo_tarea, codigo_alumno, valor)";
        query_string= query_string+" values (\'"+ request.payload.codigo_curso +"\', "+request.payload.codigo_tarea +", \'" +request.payload.codigo_alumno + "\', " +request.payload.valor +")";
        request2.query(query_string).then(function(recordset) {
            reply(1);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

exports.get_calificaciones = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "select * from calificacion";
        query_string= query_string+" inner join alumnos on calificacion.codigo_alumno = alumnos.codigo";
        query_string= query_string+" where calificacion.codigo_curso = \'"+ request.query.codigo +"\' AND calificacion.codigo_tarea = " + request.query.codigo_tarea;
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};