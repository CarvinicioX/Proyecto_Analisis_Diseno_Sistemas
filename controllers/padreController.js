var sql = require('mssql');

/*GET PADRES*/
exports.get_padre = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "SELECT REF.hash as hash, padres.* FROM padres";
        query_string = query_string + " INNER JOIN user_code_reference as REF on padres.codigo = REF.codigo";
        query_string = query_string + " WHERE padres.codigo LIKE '%"+ request.query.codigo +"%'";
        query_string = query_string + " AND padres.nombre LIKE '%"+ request.query.nombre +"%'";
        query_string = query_string + " AND padres.direccion LIKE '%"+ request.query.direccion +"%'";
        query_string = query_string + " AND padres.telefono LIKE '%"+ request.query.telefono +"%'";
        query_string = query_string + " AND padres.correo LIKE '%"+ request.query.correo +"%'";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*GET LISTADO PADRES*/
exports.get_listado_padres = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " SELECT * FROM padres";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*INSERT PADRES*/
exports.insert_padre = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " DECLARE @currentYear varchar(4) = YEAR(getdate());";
        query_string = query_string + " DECLARE @currentUserCode varchar(5);";
        query_string = query_string + " DECLARE @userScope varchar(4) = 4;";
        query_string = query_string + " DECLARE @lastUserYear varchar(4);";
        query_string = query_string + " DECLARE @lastUserCode varchar(5);";
        query_string = query_string + " DECLARE @hash varchar(13) = SUBSTRING(CONVERT(varchar(40), NEWID()),0,14);";
        query_string = query_string + " SELECT @lastUserYear = MAX(year_ref) FROM user_code_reference;";
        query_string = query_string + " SELECT @lastUserCode = MAX(code_ref) FROM user_code_reference;";
        query_string = query_string + " SELECT @currentUserCode = RIGHT('00000'+ CAST((@lastUserCode + 1) AS VARCHAR(5)),5)";
        query_string = query_string + " IF @currentYear > @lastUserYear";
        query_string = query_string + " BEGIN";
        query_string = query_string + " INSERT INTO user_code_reference (codigo, year_ref, code_ref, hash, status, id_perfil)";
        query_string = query_string + " VALUES (@currentYear + '00001' + @userScope, @currentYear, '00001', @hash, 0, @userScope)";
        query_string = query_string + " INSERT INTO Padres (codigo, nombre, telefono, direccion, correo)";
        query_string = query_string + " VALUES (@currentYear + '00001' + @userScope, \'"+request.payload.nombre+"\', \'"+request.payload.telefono+"\', \'"+request.payload.direccion+"\',\'"+request.payload.correo+"\')";
        query_string = query_string + " SELECT 0 as success_result, @hash as hash, (@currentYear + '00001' + @userScope) as code"
        query_string = query_string + " END"
        query_string = query_string + " ELSE"
        query_string = query_string + " BEGIN"
        query_string = query_string + " INSERT INTO user_code_reference (codigo, year_ref, code_ref, hash, status, id_perfil)"
        query_string = query_string + " VALUES (@currentYear + @currentUserCode + @userScope, @currentYear, @currentUserCode, @hash, 0, @userScope)";
        query_string = query_string + " INSERT INTO Padres (codigo, nombre, telefono, direccion, correo)";
        query_string = query_string + " VALUES (@currentYear + @currentUserCode + @userScope, \'"+request.payload.nombre+"\', \'"+request.payload.telefono+"\', \'"+request.payload.direccion+"\',\'"+request.payload.correo+"\')";
        query_string = query_string + " SELECT 0 as success_result, @hash as hash, (@currentYear + @currentUserCode + @userScope) as code"
        query_string = query_string + " END";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE PADRES*/
exports.update_padre = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Padres";
    	query_string+=" SET nombre = \'"+request.payload.nombre+"\', telefono = \'"+request.payload.telefono+"\', direccion = \'"+request.payload.direccion+"\', correo = \'"+request.payload.correo+"\'";
    	query_string+=" WHERE Padres.codigo = "+request.payload.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE PADRES*/
exports.delete_padre = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Padres";
    	query_string+=" WHERE Padres.codigo = "+request.query.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

