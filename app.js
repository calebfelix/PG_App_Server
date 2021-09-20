const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv/config');
const User = require('./models/User');
const cors = require('cors');


const app = express();
app.set('view engine', 'ejs');
port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {console.log('DB connected...')})


// middlewares
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: '*',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => { 
    res.render('index');
})



app.get('/api', (req, res) => {
    res.json({
        version: "1.0.0",
        message: "Welcome to the PG api"
      });
})

app.get('/api/users', async (req, res) => {
    try{        
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.json(error);
    }
})

app.post('/api/addusr', async (req, res) => {
    const user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        password: req.body.password
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err);
    }
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("DB disconnected...")
          process.exit(0);
      });
});

app.listen(port, () => {
    console.log(`dev server running at http://localhost:${port}`)
})