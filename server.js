const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRoutes = express.Router();
const router = express.Router();
const Home = require("./home.model")

const PORT = 4000;



app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/myHomesList', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("ANGELA: MongoDB database connected successfully");
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
// create new/add
homeRoutes.route('/add').post(function(req, res) {
    let home = new Home(req.body);
    home.save()
    .then(home => {
        res.status(200).json({'home': 'ANGELA: This home was added successfully'});

    })
    .catch(err => {
        res.status(400).send('ANGELA: This new home addition failed');
    });
});

// put / patch
homeRoutes.route('/update/:id').post(function(req, res) {
    Home.findById(req.params.id, function(err, home) {
        if (!home)
            res.status(404).send('ANGELA: This home is not found');
        else
            home.home_planName = req.body.home_planName;
            home.home_bedrooms = req.body.home_bedrooms;
            home.home_bathrooms = req.body.home_bathrooms;
            home.home_sqfeet = req.body.home_sqfeet;
            home.url = req.body.url;
            home.fp1_url = req.body.fp1_url;
            home.fp2__url = req.body.fp2__url;
            // home.home_completed = req.body.home_completed;

            home.save().then(home => {
                res.json('ANGELA: Home Info Updated');
            })
            .catch(err => {
                res.status(400).send("ANGELA: Not Able to Update");
            });
      });
});

// homeRoutes.delete("/delete/:id", (req, res) => {
//     Home.findByIdAndRemove(req.params.id, function(err, home) => {
        
//         if(err) {
//             res
//             .status(500)
//             .json({ error: true, message: "ANGELA: SORRY! Could not Delete"});
//         } else if(home) {
//             res
//             .status(200)
//             .json({ 
//                 message: "ANGELA: PARTY. Successfully deleted", 
//                 id: home._id });
//             } else {
//                 res.status(500)
//             .json({ error: true,
//                 message: "ANGELA: WHOA. Successfully deleted", 
//                 id: home._id })
//             }
//         }
//     )        
// });



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/homes', homeRoutes);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
