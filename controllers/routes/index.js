//router for views
const views = require('./view_routes');
//router for api
const api = require('./api_routes');

//export routers to main
module.exports = (app) =>{
	app.use('/', views);
	app.use('/api', api);
}