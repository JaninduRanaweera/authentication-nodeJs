const express = require('express'); //import express
const mongoose = require('mongoose'); //import mongoose

const users = require('./routes/api/users'); //access to users routes

const app = express(); 

app.use(express.json());

//Mongodb configuration
const db = require('./config/keys').mongoURI;

//connect to database
mongoose
    .connect(db,{useNewUrlParser: true,'useCreateIndex': true})
    .then(()=>console.log('Connected to mongodb'))
    .catch(err => console.log(err));

app.use('/api/users',users);

const port = process.env.PORT || 5000; //port

app.listen(port,()=>console.log(`Server started on port ${port}`)); //listen to the port