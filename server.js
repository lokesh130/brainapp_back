const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const math = require('mathjs');
const knex = require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const image=require('./controllers/image');

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'loki',
    database : 'brainapp_db'
  }
});

const server=express();
server.use(bodyParser.json());
server.use(cors());



server.post('/signin',(req,res)=>{signin.signinHandle(req,res,db,bcrypt)});



server.post('/register',(req,res)=>{register.registerHandle(req,res,db,bcrypt)});



server.put('/images',(req,res)=>{image.imageHandle(req,res,db)});


server.listen(3006);
