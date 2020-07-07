import express from 'express';
import Router from './routes';

const app = express();
app.use(Router);



app.listen(8080, ()=>{
    console.log('servidor rodando na porta 8080!')
})