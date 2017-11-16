var sql = require('mssql');

/*INSERT ALUMNOS*/
exports.insert_alumno = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " DECLARE @currentYear varchar(4) = YEAR(getdate());";
        query_string = query_string + " DECLARE @currentUserCode varchar(5);";
        query_string = query_string + " DECLARE @userScope varchar(4) = 2;";
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
        query_string = query_string + " INSERT INTO Alumnos (codigo, nombres, apellidos, IDgrado, nacimiento, departamento)";
        query_string = query_string + " VALUES (@currentYear + '00001' + @userScope, \'"+request.payload.nombres+"\', \'"+request.payload.apellidos+"\', \'"+request.payload.nacimiento+"\',\'"+request.payload.IDgrado+"\',\'"+request.payload.departamento+"\')";
        query_string = query_string + " SELECT 0 as success_result, @hash as hash, (@currentYear + '00001' + @userScope) as code";
        query_string = query_string + " END";
        query_string = query_string + " ELSE";
        query_string = query_string + " BEGIN";
        query_string = query_string + " INSERT INTO user_code_reference (codigo, year_ref, code_ref, hash, status, id_perfil)";
        query_string = query_string + " VALUES (@currentYear + @currentUserCode + @userScope, @currentYear, @currentUserCode, @hash, 0, @userScope)";
        query_string = query_string + " INSERT INTO Alumnos (codigo, nombres, apellidos, nacimiento, IDgrado, departamento)";
        query_string = query_string + " VALUES (@currentYear + @currentUserCode + @userScope, \'"+request.payload.nombres+"\', \'"+request.payload.apellidos+"\', \'"+request.payload.nacimiento+"\',\'"+request.payload.IDgrado+"\',\'"+request.payload.departamento+"\')";
        query_string = query_string + " SELECT 0 as success_result, @hash as hash, (@currentYear + @currentUserCode + @userScope) as code";
        query_string = query_string + " END";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*UPDATE ALUMNOS*/
exports.update_alumno = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "UPDATE Alumnos";
    	query_string+=" SET nombres = \'"+request.payload.nombres+"\', apellidos = \'"+request.payload.apellidos+"\', nacimiento = \'"+request.payload.nacimiento+"\', departamento = \'"+request.payload.departamento+"\'";
    	query_string+=" WHERE Alumnos.codigo = "+request.payload.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};


/*DELETE ALUMNOS*/
exports.delete_alumno = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "DELETE FROM Alumnos";
    	query_string+=" WHERE Alumnos.codigo = "+request.payload.codigo;
    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET ALUMNOS*/
exports.get_alumnos = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
    	var query_string = "SELECT * FROM Alumnos";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*GET CLASES ALUMNO*/
exports.get_clases = {
	handler: function(request, reply) {
		var request2 = new sql.Request();
		var query_string = "";
		request2.query(query_string).then(function(recordser) {
			reply(recordst);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
	}
};