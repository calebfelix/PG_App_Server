const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    Apartment_Name : {
        type: String,
        required: true,
    },
    Location : {
        type: String,
        required: true,
    },
    Owner_Name : {
        type: String,
        required: true,
    },
    Owner_Contact : {
        type: String,
        required: true,
    },
    Owner_Email : {
        type: String,
        required: true,
    },
    Deposit : {
        type: String,
        required: true,
    },
    Description : {
        type: String,
        required: true,
    },
    Accommodation : {
        type: String,
        required: true,
    },
    Notice_Period : {
        type: String,
        required: true,
    },
    img_url : {
        type : Array,
        'default' : ["https://firebasestorage.googleapis.com/v0/b/pgwebsite-b7874.appspot.com/o/default.png?alt=media","https://firebasestorage.googleapis.com/v0/b/pgwebsite-b7874.appspot.com/o/default.png?alt=media","https://firebasestorage.googleapis.com/v0/b/pgwebsite-b7874.appspot.com/o/default.png?alt=media"] 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);