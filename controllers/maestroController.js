var sql = require('mssql');

/*GET MAESTROS*/
exports.get_maestros = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "SELECT REF.hash as hash, maestros.* FROM maestros";
        query_string = query_string + " INNER JOIN user_code_reference as REF on maestros.codigo = REF.codigo";
        query_string = query_string + " WHERE maestros.codigo LIKE '%"+ request.query.codigo +"%'";
        query_string = query_string + " AND maestros.nombre LIKE '%"+ request.query.nombre +"%'";
        query_string = query_string + " AND maestros.direccion LIKE '%"+ request.query.direccion +"%'";
        query_string = query_string + " AND maestros.telefono LIKE '%"+ request.query.telefono +"%'";
        query_string = query_string + " AND maestros.email LIKE '%"+ request.query.email +"%'";
        query_string = query_string + " AND maestros.birth_date LIKE '%"+ request.query.nacimiento +"%'";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*GET LISTADO MAESTROS*/
exports.get_listado_maestros = {
    handler: function(request, reply) {
        var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " SELECT * FROM maestros";
        request2.query(query_string).then(function(recordset) {
            reply(recordset);
        }).catch(function(err) {
            console.dir(err);
            reply(-1);
        });
    }
};

/*INSERT MAESTROS*/
exports.insert_maestro = {
	handler: function(request, reply) {
		var request2 = new sql.Request();
		var query_string = "";
        query_string = query_string + " DECLARE @currentYear varchar(4) = YEAR(getdate());";
        query_string = query_string + " DECLARE @currentUserCode varchar(5);";
        query_string = query_string + " DECLARE @userScope varchar(4) = 3;";
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
        query_string = query_string + " INSERT INTO Maestros (codigo, nombre, direccion, telefono, email, birth_date)";
        query_string = query_string + " VALUES (@currentYear + '00001' + @userScope, \'"+request.payload.nombre+"\', \'"+request.payload.direccion+"\', \'"+request.payload.telefono+"\',\'"+request.payload.email+"\',\'"+request.payload.nacimiento+"\')";
        query_string = query_string + " SELECT 0 as success_result, @hash as hash, (@currentYear + '00001' + @userScope) as code"
        query_string = query_string + " END"
        query_string = query_string + " ELSE"
        query_string = query_string + " BEGIN"
        query_string = query_string + " INSERT INTO user_code_reference (codigo, year_ref, code_ref, hash, status, id_perfil)"
        query_string = query_string + " VALUES (@currentYear + @currentUserCode + @userScope, @currentYear, @currentUserCode, @hash, 0, @userScope)";
        query_string = query_string + " INSERT INTO Maestros (codigo, nombre, direccion, telefono, email, birth_date)";
        query_string = query_string + " VALUES (@currentYear + @currentUserCode + @userScope, \'"+request.payload.nombre+"\', \'"+request.payload.direccion+"\', \'"+request.payload.telefono+"\',\'"+request.payload.email+"\',\'"+request.payload.nacimiento+"\')";
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

/*UPDATE MAESTROS*/
exports.update_maestro = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Maestros";
    	query_string+=" SET nombre = \'"+request.payload.nombre+"\', direccion = \'"+request.payload.direccion+"\', telefono = \'"+request.payload.telefono+"\', email = \'"+request.payload.email+"\', birth_date = \'"+request.payload.nacimiento+"\'";
    	query_string+=" WHERE Maestros.codigo = "+request.payload.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*DELETE MAESTROS*/
exports.delete_maestro = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Maestros";
    	query_string+=" WHERE Maestros.codigo = "+request.query.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

