const mongoose = require('mongoose')
const express = require ('express')
const fs = require('fs')
const player = require('play-sound')(opts = {})
const ejs = require('ejs')
const port = process.env.PORT || 3000;
const axios = require('axios')
const env = require('dotenv').config()
const voiceID = "21m00Tcm4TlvDq8ikWAM" //has to be changed
// const API = process.env.API
const KEY = process.env.KEY
const USER_ID = process.env.USER_ID

const app = express()
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.use(express.static("public"));

const tasks = ['drink water', 'ask X to hang out']
const text = tasks[0] + tasks[1]
const voice = '21m00Tcm4TlvDq8ikWAM'

app.get('/', function(req, res){
    res.render('home', {tasks: tasks, url: ""});
    // console.log(req.body.task);
})

app.post('/', async function(req, res){
    console.log(req.body.tasks);
    // const voiceSettings = {
    //     stability: 0.75,
    //     similarity_boost: 0.75,
    // }
    
    try{
        // const response = await axios.post(
        //     `https://api.elevenlabs.io/v1/text-to-speech/${voice}/stream`,
        //     {
        //         text: text,
        //         voice_settings: voiceSettings,
        //     },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             accept: 'audio/mpeg',
        //             'xi-api-key': API,
        //         },
        //         responseType: 'arraybuffer',
        //     }
        // )
        // console.log(response.data);
        // const audioBuffer = Buffer.from(response.data)
        const response = await axios.post(
            'https://play.ht/api/v2/tts',
            {
                'text': text,
                'voice': 'larry'

            },
            {
                headers:{                    
                    'Authorization': `Bearer ${KEY}`,
                    'X-User-Id': `${USER_ID}`,
                    'accept': 'text/event-stream',
                    'Content-Type': 'application/json'
                }
            }
        )
        data = (response.data);
        url_index = (data.substring(data.indexOf('url')))
        const url = url_index.substring(6, url_index.indexOf(',')-1)
        console.log(url);
        res.render('home', {tasks: tasks, url: url})

    }catch(error){
        console.log("error");
        console.log(error);
        res.redirect('/')
    }
})

app.listen(port, function () {
    console.log(`Server listening at {port}`, port);    
})