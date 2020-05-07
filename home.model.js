const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Home = new Schema({
    home_planName: {
        type: String
       
    },
    home_bedrooms: {
        type: String
    },
    home_bathrooms: {
        type: String
    },
    home_sqfeet: {
        type: String
    },
    home_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Home', Home);


