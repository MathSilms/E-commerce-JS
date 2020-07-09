import express from 'express'
import UsuarioController from './controllers/UserController'
const auth = require('./middleware/auth');
const Router = express.Router()

Router.get('/',auth.require ,UsuarioController.index);
Router.get('/:id',auth.require ,UsuarioController.show);

Router.post('/login',auth.require ,UsuarioController.login);
Router.post('/register',auth.require ,UsuarioController.store);
Router.put('/',auth.require ,UsuarioController.update);
Router.delete('/',auth.require ,UsuarioController.remove);

Router.get('/recover-password',auth.require ,UsuarioController.ShowRecovery);
Router.post('/recover-password',auth.require ,UsuarioController.createRecovery);
Router.get('/recovered-password',auth.require ,UsuarioController.showCompleteRecovery);
Router.post('/recovered-password',auth.require ,UsuarioController.CompleteRecovery);

export default Router;