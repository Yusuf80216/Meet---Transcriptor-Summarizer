// import express from 'express';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = "mongodb+srv://vrushali:vrush@cluster0.ekqdwct.mongodb.net/test";

mongoose.connect(db,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Connected to database');
}).catch((error)=>console.log('Error',error))

app.use(express.json())
// instead of doing app.get here, we used express routers and imported here.
// app.use(require('../server/router/router'));

// require('./DB/conn')


// app.get('/',(req,res)=>{
//     res.send('Server Connected to FRONTEND app.js');
// });
// app.post('/register',(req,res)=>{
//     console.log(req.body);
//     res.json({message : req.body})
// });


app.listen(3001,()=>{
    console.log('server is running...');
})


