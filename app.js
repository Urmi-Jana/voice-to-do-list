const mongoose = require('mongoose')
const express = require ('express')
const ejs = require('ejs')
const port = process.env.PORT || 3000;

const app = express()
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.use(express.static("public"));

var tasks = ['drink water', 'ask X to hang out']

app.get('/', function(req, res){
    res.render('home', {tasks: tasks});
    // console.log(req.body.task);
})

app.post('/', function(req, res){
    console.log(req.body.tasks);
    res.redirect('/')
})

app.listen(port, function () {
    console.log(`Server listening at {port}`, port);    
})