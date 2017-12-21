var AdminController = require('./controllers/adminController');
var UserController = require('./controllers/usuarioController');
var AlumnosController = require('./controllers/alumnoController');
var MaestrosController = require('./controllers/maestroController');
var PadresController = require('./controllers/padreController');
var TareasController = require('./controllers/tareaController');
var GradosController = require('./controllers/gradoController');
var ClasesController = require('./controllers/claseController');
var SeccionesController = require('./controllers/seccionController');
var AuthController = require('./controllers/authController');

exports.endpoints = [
	//Default
	{method: 'GET', path: '/', config: {handler: function(request, reply){reply('Proyecto Análisis y Diseño de Sistemas ...');}}},
	/* ENDPOINTS ALUMNOS */
	{method: 'POST', path: '/insert_alumno', config: AlumnosController.insert_alumno},
	{method: 'PUT', path: '/update_alumno', config: AlumnosController.update_alumno},
	{method: 'DELETE', path: '/delete_alumno', config: AlumnosController.delete_alumno},
	{method: 'GET', path: '/get_alumnos', config: AlumnosController.get_alumnos},
	{method: 'GET', path: '/get_listado_alumnos', config: AlumnosController.get_listado_alumnos},
	{method: 'GET', path: '/get_listado_alumnos_curso', config: AlumnosController.get_listado_alumnos_curso},
	/* ENDPOINTS MAESTROS */
	{method: 'POST', path: '/insert_maestro', config: MaestrosController.insert_maestro},
	{method: 'PUT', path: '/update_maestro', config: MaestrosController.update_maestro},
	{method: 'DELETE', path: '/delete_maestro', config: MaestrosController.delete_maestro},
	{method: 'GET', path: '/get_maestros', config: MaestrosController.get_maestros},
	{method: 'GET', path: '/get_listado_maestros', config: MaestrosController.get_listado_maestros},
	/* ENDPOINTS PADRES */
	{method: 'POST', path: '/insert_padre', config: PadresController.insert_padre},
	{method: 'PUT', path: '/update_padre', config: PadresController.update_padre},
	{method: 'DELETE', path: '/delete_padre', config: PadresController.delete_padre},
	{method: 'GET', path: '/get_padres', config: PadresController.get_padre},
	{method: 'GET', path: '/get_listado_padres', config: PadresController.get_listado_padres},
	/* ENDPOINTS CLASES */
	{method: 'POST', path: '/insert_clase', config: ClasesController.insert_clase},
	{method: 'PUT', path: '/update_clase', config: ClasesController.update_clase},
	{method: 'DELETE', path: '/delete_clase', config: ClasesController.delete_clase},
	{method: 'GET', path: '/get_listado_clases', config: ClasesController.get_listado_clases},
	/* ENDPOINTS GRADOS */
	{method: 'POST', path: '/insert_grado', config: GradosController.insert_grado},
	{method: 'PUT', path: '/update_grado', config: GradosController.update_grado},
	{method: 'DELETE', path: '/delete_grado', config: GradosController.delete_grado},
	{method: 'GET', path: '/get_listado_grados', config: GradosController.get_listado_grados},
	/* ENDPOINTS AUTH */
	{method: 'POST', path: '/register', config: AuthController.register},
	{method: 'POST', path: '/login', config: AuthController.login},
	{method: 'POST', path: '/get_user', config: AuthController.get_user},
	/* ENDPOINTS SECCIONES */
	{method: 'POST', path: '/insert_seccion', config: SeccionesController.insert_seccion},
	{method: 'PUT', path: '/update_seccion', config: SeccionesController.update_seccion},
	{method: 'DELETE', path: '/delete_seccion', config: SeccionesController.delete_seccion},
	{method: 'GET', path: '/get_secciones', config: SeccionesController.get_secciones},
	{method: 'GET', path: '/get_listado_secciones', config: SeccionesController.get_listado_secciones},
	{method: 'GET', path: '/get_alumnos_seccion', config: SeccionesController.get_alumnos_seccion},
	{method: 'GET', path: '/get_secciones_maestro', config: SeccionesController.get_secciones_maestro},
	{method: 'GET', path: '/get_curso', config: SeccionesController.get_curso},
	
	/* ENDPOINTS ADMINISTRADORES */
	{method: 'POST', path: '/insert_admin', config: AdminController.insert_admin},
	{method: 'POST', path: '/update_admin', config: AdminController.update_admin},
	{method: 'POST', path: '/delete_admin', config: AdminController.delete_admin},
	{method: 'GET', path: '/get_admins', config: AdminController.get_admin},
	/* ENDPOINTS USUARIOS */
	{method: 'POST', path: '/insert_user', config: UserController.insert_user},
	{method: 'POST', path: '/update_user', config: UserController.update_user},
	{method: 'POST', path: '/delete_user', config: UserController.delete_user},
	{method: 'GET', path: '/get_users', config: UserController.get_users},
	/* ENDPOINTS TAREAS */
	{method: 'POST', path: '/insert_tarea', config: TareasController.insert_tarea},
	{method: 'GET', path: '/get_tareas_curso', config: TareasController.get_tareas_curso},
	{method: 'PUT', path: '/update_tarea', config: TareasController.update_tareas},
	{method: 'DELETE', path: '/delete_tarea', config: TareasController.delete_tareas},
	{method: 'POST', path: '/calificar', config: TareasController.post_calificar},
	{method: 'GET', path: '/calificaciones', config: TareasController.get_calificaciones}
	
];
