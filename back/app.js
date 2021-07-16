const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const cardRoutes = require('./router/card');
const categoryRoutes = require('./router/category');
const userRoutes = require('./router/user');

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

// app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.use('/api/card', cardRoutes);
app.use('/api/categorie', categoryRoutes);
app.use('/api/user', userRoutes);



module.exports = app;