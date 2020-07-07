import express from 'express';
const Router = express.Router();

//test
Router.get('/users', (req, res)=>{
    res.json({message:''})
});


export default Router;
