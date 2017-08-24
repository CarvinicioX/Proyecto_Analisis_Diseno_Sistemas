var testController = require('./controllers/mainController');


exports.endpoints = [
	//Default
	{method: 'GET', path: '/', config: {handler: function(request, reply){reply('Proyecto Análisis y Diseño de Sistemas ...')}}},
];
