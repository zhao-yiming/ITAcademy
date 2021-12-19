let express = require('express');
let route = express.Router();
let coursController = require('./controller/coursController');

route.get('/', (req, res) => res.redirect('/cours'));
route.get('/cours', coursController.cours);

route.post('/consult',coursController.consult);
route.post('/retourCatalogue',coursController.cours);
route.post('/connect',coursController.connection);
route.post('/enregistrer',coursController.select);
route.get('/cours/inscrire/:i', coursController.inscrire);
route.get('/cours/delete/:i', coursController.delete);
route.get('/consult',coursController.consult);
route.get('/finaliser',coursController.finaliser);
route.post('/finaliser',coursController.finaliser);

module.exports=route;