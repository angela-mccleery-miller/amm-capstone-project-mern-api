const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRoutes = express.Router();

const PORT = 4000;


let Home = require('./home.model');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/homes', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connected successfully");
})

homeRoutes.route('/').get(function(req, res) {
    Home.find(function(err, homes) {
        if (err) {
            console.log(err);
        } else {
            res.json(homes)
        }
    });
})

homeRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Home.findById(id, function(err, home){
        res.json(home);
    });
});

homeRoutes.route('/add').post(function(req, res) {
    let home = new Home(req.body);
    home.save()
    .then(home => {
        res.status(200).json({'home': 'home added successfully'});

    })
    .catch(err => {
        res.status(400).send('new home addition failed');
    });
});

homeRoutes.route('/update/:id').post(function(req, res) {
    Home.findById(req.params.id, function(err, home) {
        if (!home)
            res.status(404).send('home is not found');
        else
            home.home_planName = req.body.home_planName;
            home.home_bedrooms = req.body.home_bedrooms;
            home.home_bathrooms = req.body.home_bathrooms;
            home.home_sqfeet = req.body.home_sqfeet;
            home.home_completed = req.body.home_completed;

            home.save().then(home => {
                res.json('Home Info Updated');
            })
            .catch(err => {
                res.status(400).send("Not Able to Update");
            });

      });
    
});

app.use('/homes', homeRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
