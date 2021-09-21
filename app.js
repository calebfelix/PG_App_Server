const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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


// WEBPAGE

app.get('/', (req, res) => { 
    res.render('Signup');
})

app.post('/signup', (req, res) => { 
    console.log(req.body);
    res.redirect('/');
})

app.get('/home', (req, res) => { 
    res.render('homepage');
})

app.get('/index', (req, res) => { 
    res.render('index');
})

app.get('/content', (req, res) => { 
    res.render('content');
})


// API

app.get('/api', (req, res) => {
    res.json({
        version: "1.0.0",
        message: "Welcome to the PG api"
      });
});

app.get('/api/users', async (req, res) => {
    try{        
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.json(error);
    }
});

app.post('/api/addusr', async (req, res) => {
    // check email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.send("email already Exists")

    // hashing password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);

    // create new user

    const user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send(`user inserted: ${savedUser._id}`)
    }catch(err){
        res.status(400).send(err);
    }
});

app.post('/api/login', async (req, res) => {

    // check email exists
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("Email or Password is incorrect!!")

    // check pass is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.send("Email or Password is incorrect!!");
    
    // if all clear
    res.redirect('/home')
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("DB disconnected...")
          process.exit(0);
      });
});

app.listen(port, () => {
    console.log(`dev server running at http://localhost:${port}`)
})