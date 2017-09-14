var AlumnosController = require('./controllers/Alumnos');


exports.endpoints = [
	//Default
	{method: 'GET', path: '/', config: {handler: function(request, reply){reply('Proyecto Análisis y Diseño de Sistemas ...')}}},
	{method: 'POST', path: '/insert_alumno', config: AlumnosController.insert_alumno},
	{method: 'POST', path: '/update_alumno', config: AlumnosController.update_alumno},
	{method: 'POST', path: '/delete_alumno', config: AlumnosController.delete_alumno},
	{method: 'GET', path: '/get_alumnos', config: AlumnosController.get_alumnos}
];
