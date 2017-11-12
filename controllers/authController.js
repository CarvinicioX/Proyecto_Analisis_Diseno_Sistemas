var sql = require('mssql');

/*REGISTER*/
exports.register = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
        var query_string = "";
		query_string = query_string + " DECLARE @hash varchar(14) = \'"+request.payload.hash+"\';";
		query_string = query_string + " DECLARE @username varchar(50) = \'"+request.payload.username+"\';";
		query_string = query_string + " DECLARE @password varchar(50) = \'"+request.payload.password+"\';";
		query_string = query_string + " DECLARE @codigo varchar(10);";
		query_string = query_string + " IF EXISTS(SELECT 1 FROM user_code_reference WHERE hash = @hash AND status = 0)";
		query_string = query_string + " BEGIN";
		query_string = query_string + " IF(EXISTS(SELECT 1 FROM usuarios WHERE username = @username))";
		query_string = query_string + " BEGIN";
		query_string = query_string + " SELECT -3 as success_status";
		query_string = query_string + " END";
		query_string = query_string + " ELSE";
		query_string = query_string + " BEGIN";
		query_string = query_string + " SELECT @codigo = codigo FROM user_code_reference WHERE hash = @hash AND status = 0";
		query_string = query_string + " INSERT INTO usuarios (codigo, username, password, creation_date)";
		query_string = query_string + " VALUES(@codigo,@username, @password, GETDATE())";
		query_string = query_string + " UPDATE user_code_reference SET status = 1 WHERE hash = @hash AND status = 0;";
		query_string = query_string + " SELECT 0 as success_status";
		query_string = query_string + " END";
		query_string = query_string + " END";
		query_string = query_string + " ELSE IF EXISTS(SELECT 1 FROM user_code_reference WHERE hash = @hash AND status = 1)";
		query_string = query_string + " BEGIN";
		query_string = query_string + " SELECT -1 as success_status";
		query_string = query_string + " END";
		query_string = query_string + " ELSE";
		query_string = query_string + " BEGIN";
		query_string = query_string + " SELECT -2 as success_status";
		query_string = query_string + " END";
    	request2.query(query_string).then(function(recordset) {
			reply(recordset);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};

/*LOGIN*/
exports.login = {
    handler: function(request, reply) {
    	var request2 = new sql.Request();
        var query_string = "";
        query_string = query_string + " USE DB_UNITEC";

    	request2.query(query_string).then(function(recordset) {
			reply(1);
		}).catch(function(err) {
			console.dir(err);
			reply(-1);
		});
    }
};