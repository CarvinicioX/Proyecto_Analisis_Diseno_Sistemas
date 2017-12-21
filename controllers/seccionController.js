var sql = require('mssql');

/*GET SECCIONES*/
exports.get_secciones = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " SELECT GRA.nombre as grado, MAE.nombre as maestro, CLA.nombre as clase,  secciones.* FROM secciones";
        query_string = query_string + " INNER JOIN grado as GRA on secciones.codigo_grado = GRA.codigo";
        query_string = query_string + " INNER JOIN maestros as MAE on secciones.codigo_maestro = MAE.codigo";
        query_string = query_string + " INNER JOIN clases as CLA on secciones.codigo_clase = CLA.codigo";
        query_string = query_string + " WHERE secciones.codigo LIKE '%"+ request.query.codigo +"%'";
        query_string = query_string + " AND GRA.nombre LIKE '%"+ request.query.grado +"%'";
        query_string = query_string + " AND MAE.nombre LIKE '%"+ request.query.maestro +"%'";
        query_string = query_string + " AND CLA.nombre LIKE '%"+ request.query.clase +"%'";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*GET SECCIONES POR MAESTRO*/
exports.get_secciones_maestro = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " SELECT MAE.nombre as maestro, CLA.nombre as clase, GRA.nombre as grado, secciones.* FROM secciones ";
        query_string = query_string + " INNER JOIN maestros as MAE on secciones.codigo_maestro = MAE.codigo";
        query_string = query_string + " INNER JOIN clases as CLA on secciones.codigo_clase = CLA.codigo";
        query_string = query_string + " INNER JOIN grado as GRA on secciones.codigo_grado = GRA.codigo";
        query_string = query_string + " WHERE secciones.codigo_maestro = \'" + request.query.codigo + "\'";

        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
}


/*GET ALUMNOS SECCION*/
exports.get_alumnos_seccion = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " SELECT * from seccion_alumno";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
}

/*GET LISTADO SECCIONES*/
exports.get_listado_secciones = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " SELECT GRA.nombre as grado, MAE.nombre as maestro, CLA.nombre as clase,  secciones.* FROM secciones";
        query_string = query_string + " INNER JOIN grado as GRA on secciones.codigo_grado = GRA.codigo";
        query_string = query_string + " INNER JOIN maestros as MAE on secciones.codigo_maestro = MAE.codigo";
        query_string = query_string + " INNER JOIN clases as CLA on secciones.codigo_clase = CLA.codigo";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*INSERT SECCIONES*/
exports.insert_seccion = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " DECLARE @currentYear varchar(4) = YEAR(getdate());";
        query_string = query_string + " DECLARE @currentCode varchar(4);";
        query_string = query_string + " DECLARE @lastYear varchar(4);";
        query_string = query_string + " DECLARE @lastCode varchar(4);";
        query_string = query_string + " SELECT @lastYear = MAX(year_ref) FROM secciones;";
        query_string = query_string + " SELECT @lastCode = MAX(code_ref) FROM secciones;";
        query_string = query_string + " SELECT @currentCode = RIGHT('0000'+ CAST((@lastCode + 1) AS VARCHAR(4)),4)";
        query_string = query_string + " IF @currentYear > @lastYear";
        query_string = query_string + " BEGIN";
        query_string = query_string + " INSERT INTO secciones (codigo, codigo_grado, codigo_maestro, codigo_clase, year_ref, code_ref)";
        query_string = query_string + " VALUES (@currentYear + '0001'," + request.payload.codigo_grado + ", \'" + request.payload.codigo_maestro + "\', " + request.payload.codigo_clase + ", @currentYear, '0001')";
        for(var i = 0; i<request.payload.alumnos.length;i++){
            query_string = query_string + " INSERT INTO seccion_alumno (codigo_alumno, codigo_seccion)";
            query_string = query_string + " VALUES (\'"+request.payload.alumnos[i].codigo+"\', @currentYear + '0001')";
        }
        query_string = query_string + " SELECT 0 as success_result"
        query_string = query_string + " END"
        query_string = query_string + " ELSE"
        query_string = query_string + " BEGIN"
        query_string = query_string + " INSERT INTO secciones (codigo, codigo_grado, codigo_maestro, codigo_clase, year_ref, code_ref)";
        query_string = query_string + " VALUES (@currentYear + @currentCode," + request.payload.codigo_grado + ", \'" + request.payload.codigo_maestro + "\', " + request.payload.codigo_clase + ", @currentYear, @currentCode)";
        for(var i = 0; i<request.payload.alumnos.length;i++){
            query_string = query_string + " INSERT INTO seccion_alumno (codigo_alumno, codigo_seccion)";
            query_string = query_string + " VALUES (\'"+request.payload.alumnos[i].codigo+"\', @currentYear + @currentCode)";
        }
        query_string = query_string + " SELECT 0 as success_result"
        query_string = query_string + " END";

        request2.query(query_string).then(function(recordset) {
            reply(recordset);
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
        var query_string = "UPDATE secciones";
        query_string=query_string+" SET codigo_grado = "+request.payload.codigo_grado+", codigo_maestro = \'"+request.payload.codigo_maestro+"\', codigo_clase = "+request.payload.codigo_clase;
        query_string=query_string+" WHERE secciones.codigo = "+request.payload.codigo;
        query_string=query_string+" DELETE FROM seccion_alumno WHERE seccion_alumno.codigo_seccion = " + request.payload.codigo;
        for(var i = 0; i<request.payload.alumnos.length;i++){
            query_string = query_string + " INSERT INTO seccion_alumno (codigo_alumno, codigo_seccion)";
            query_string = query_string + " VALUES (\'"+request.payload.alumnos[i].codigo+"\',\'"+ request.payload.codigo + "\')";
        }
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
        var query_string = "DELETE FROM secciones";
        query_string= query_string+" WHERE secciones.codigo = "+request.query.codigo;
        request2.query(query_string).then(function(recordset) {
            reply(1);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*GET CURSO*/
exports.get_curso = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " SELECT MAE.nombre as maestro, CLA.nombre as clase, GRA.nombre as grado, secciones.* FROM secciones ";
        query_string = query_string + " INNER JOIN maestros as MAE on secciones.codigo_maestro = MAE.codigo";
        query_string = query_string + " INNER JOIN clases as CLA on secciones.codigo_clase = CLA.codigo";
        query_string = query_string + " INNER JOIN grado as GRA on secciones.codigo_grado = GRA.codigo";
        query_string= query_string+" WHERE secciones.codigo = "+request.query.codigo;
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};