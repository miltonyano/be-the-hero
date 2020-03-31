const express = require('express');

const dbConnection = require('./database/dbConnection');

const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncicentController');
const NgoIncidentController = require('./controllers/NgoIncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//controller for the login
routes.post('/sessions', SessionController.create);

routes.get('/ngos', NgoController.index);
routes.post('/ngos', NgoController.create);


routes.get('/ngo-incident', NgoIncidentController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);



module.exports = routes;