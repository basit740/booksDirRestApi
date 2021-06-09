const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const app=express();
const port=process.env.PORT || 5000;
const path=require('path')

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send('Hello World!, this is node application');
});

app.post('/', (req,res)=>{
    res.send('This is post request');
})

app.get('/home',(req,res)=>{
    res.send('You are home');
    
})

app.use(express.json());
//database connection here
const connectionString= 'mongodb+srv://basit740:admin1122@cluster0.ljxbi.mongodb.net/booksDirectory?retryWrites=true&w=majority';
mongoose.connect(connectionString, {useNewUrlParser:true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Databse connected successfully');
})

//Working with Routes

//Books Rotes
const booksRouter = require('./routes/books');

app.use('/books',booksRouter);

app.listen(port,()=>{
    console.log(`Server is running at port: ${PORT}`);
});





