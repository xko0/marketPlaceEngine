const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Card = require('./models/card')

mongoose.connect('mongodb+srv://somemark:somemarkadmin@cluster0.kovjn.mongodb.net/marketPlaceEngine?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/card', (req, res, next) => {
    delete req.body._id;
    const card = new Card({
        ...req.body
    });
    card.save()
        .then(() => res.status(201).json({ message: 'objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/card/:id', (req, res, next) => {
    Card.findOne({ _id: req.params.id })
        .then(card => res.status(200).json(card))
        .catch(error => res.status(404).json({ error }))
})

app.get('/api/card', (req, res, next) => {
    Card.find()
        .then(cards => res.status(200).json(cards))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;