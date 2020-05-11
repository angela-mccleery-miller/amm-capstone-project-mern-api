const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const homeRouter = express.Router();
// const router = express.Router();
const Home = require("./home-model")

const PORT = 4000;



app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/home-builders', { useNewUrlParser: true}, () => {
    try {
        console.log("ANGELA: MongoDB database connected successfully");
        
    } catch (error) {
        console.log("db failed");
        
    }

});

homeRouter.route('/').get(function(req, res) {
    Home.find((err, homes) =>{
        if (err) {
            console.log(err);
        } else {
            res.json(homes)
        }
    });
})

homeRouter.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Home.findById(id, function(err, home){
        res.json(home);
    });
});

homeRouter.post("/add-many", (req, res) => {
    Home.insertMany(req.body, (err, results) => {
        if(err){
            res.status(400).json(err)
        } else {
            res.status(200).json(results)
        }
    })
})

// create new/add
homeRouter.route('/add').post(function(req, res) {
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
homeRouter.route('/update/:id').post(function(req, res) {
    Home.findById(req.params.id, function(err, home) {
        if (!home)
            res.status(404).send('ANGELA: This home is not found');
        else
            home.planName = req.body.planName;
            home.bedrooms = req.body.bedrooms;
            home.bathrooms = req.body.bathrooms;
            home.sqfeet = req.body.sqfeet;
            home.url = req.body.url;
            home.fp1_url = req.body.fp1_url;
            home.fp2__url = req.body.fp2__url;
            // home.completed = req.body.completed;

            home.save().then(home => {
                res.json('ANGELA: Home Info Updated');
            })
            .catch(err => {
                res.status(400).send("ANGELA: Not Able to Update");
            });
      });
});

// homeRouter.delete("/delete/:id", (req, res) => {
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

app.use('/homes', homeRouter);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
