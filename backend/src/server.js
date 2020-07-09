import express from 'express';
import Router from './routes/routes';
import compression from 'compression';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import morgan from 'morgan';
import cors from 'cors';

// Start
const app = express();
 

//Ambiente

const isProduction = process.env.NODE_ENV ==='production';
const PORT = process.env.PORT ||3000;

//Arquivos estáticos
app.use('/public', express.static(__dirname + '/public'));
app.use('/public/images', express.static(__dirname+'/public/images'));

//Setup MongoDB
const dbs = require('./config/database')
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest
mongoose.connect(dbURI, {useNewUrlParser:true});

//Config
if(!isProduction) app.use(morgan('dev'));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

// Setup BodyParser
app.use(bodyParser.urlencoded({extended:false,limit:1.5*1024*1024}));
app.use(bodyParser.json({ limit:1.5*1024*1024 }));

//Models
import './models';

//Routes
app.use(Router);

//404
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// Listen

app.listen(PORT, ()=>{
console.log(`Servidor rodando na porta${PORT}`);
})