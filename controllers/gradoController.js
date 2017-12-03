var sql = require('mssql');

/*INSERT CLASES*/
exports.insert_grado = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "INSERT INTO  grado (nombre)";
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
exports.update_grado = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "UPDATE grado";
        query_string+=" SET nombre = \'"+request.payload.nombre+"\'";
        query_string+=" WHERE grado.codigo = "+request.payload.codigo;
        request2.query(query_string).then(function(recordset) {
            reply(1);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};


/*DELETE CLASES*/
exports.delete_grado = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "DELETE FROM grado";
        query_string+=" WHERE grado.codigo = "+request.query.codigo;
        request2.query(query_string).then(function(recordset) {
            reply(1);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*GET CLASES*/
exports.get_listado_grados = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "SELECT * FROM grado";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};