const express = require('express');
const app = express();
const path = require('path');
const Subscribers = require('./models/subscribers.js');


//  routes
//  api to render HTMLfile || METHOD GET

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname,"index.html"))
});

// api to get all data || METHOD get 
app.get('/subscribers', async (req,res) => {
    try {
        let subscribers = await Subscribers.find();
        res.status(200).send(subscribers)
    } catch (error) {
        res.status(500)
    }
})
// api to get all subscribers by name and subscribed channel || METHOD GET

app.get ('/subscribers/names', async (req,res) => {
    try{
        let subscribers = await Subscribers.find({}).select('names subscribedChannel');
        res.status(200).send(subscribers)
    } catch (error) {
        res.status(500)
    }
})
// api to get subscribers by id || METHOD GET

app.get('/subscribers/:id', async (req,res) => {
    try{
        let subscribers = await Subscribers.findById(req.params.id);
        res.status(200).send(subscribers);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

module.exports = app;