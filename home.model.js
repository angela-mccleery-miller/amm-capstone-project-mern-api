const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Home = new Schema({
    home_planName: {
        type: String,
        required: true,
       
    },
    home_bedrooms: {
        type: String,
        required: true,
    },
    home_bathrooms: {
        type: String,
        required: true,

    },
    home_sqfeet: {
        type: String,
        required: true,

    },
    // home_url: {
    //     type: Image,
    //     required: true,
    // },
    // home_fp1_url: {
    //     type: Image,
    //     required: true,
    // },
    // home_fp2_url: {
    //     type: Image,
    //     required: true,
    // }

    home_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Home', Home);


