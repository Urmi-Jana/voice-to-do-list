const mongoose = require('mongoose')
const express = require ('express')
const ejs = require('ejs')
const port = process.env.PORT || 3000;
const axios = require('axios')
const voiceID = "21m00Tcm4TlvDq8ikWAM" //has to be changed
const API = process.env.API

const app = express()
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.use(express.static("public"));

const tasks = ['drink water', 'ask X to hang out']
const text = tasks[0]
const voice = '21m00Tcm4TlvDq8ikWAM'

app.get('/', function(req, res){
    res.render('home', {tasks: tasks});
    // console.log(req.body.task);
})

app.post('/', async function(req, res){
    console.log(req.body.tasks);
    const voiceSettings = {
        stability: 0.75,
        similarity_boost: 0.75,
    }
    
    try{
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
            {
                text: text,
                voice_settings: voiceSettings,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'audio/mpeg',
                    'xi-api-key': API,
                },
                responseType: 'arraybuffer',
            }
        )
        console.log(response.data);
    }catch(error){
        console.log(error.response);
    }

    
    res.redirect('/')
})

app.listen(port, function () {
    console.log(`Server listening at {port}`, port);    
})