const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require('axios');
require('dotenv/config');
const User = require('./models/User');
const Post = require('./models/Post');
const { requireAuth, checkUser } = require('./authMddleware');

const cors = require('cors');
const web_url = process.env.WEB_URL;

const app = express();
app.set('view engine', 'ejs');
port = process.env.PORT || 5000;

// connection to MONGODB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {console.log('DB connected...')})


// middlewares
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: '*',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// create json web token
// const maxAge = parseInt(process.env.MAX_AGE);
const maxAge = 1 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET , {
        expiresIn: maxAge
    });
};


// WEBPAGE

app.get('/', (req, res) => { 
    res.render('Signup');
})

app.post('/signup', (req, res) => { 
    console.log(req.body);
    res.redirect('/');
})

app.get('/home', requireAuth, async (req, res) => { 
    
    try {
        site = `${web_url}/api/posts`
        const data = await axios.get(site);
        console.log(data);
        res.render('homepage', { mydata : data});
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }   
})

app.get('/index', (req, res) => { 
    res.render('index');
})

app.get('/register', (req, res) => { 
    res.render('reg');
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

app.get('/api/posts', async (req, res) => {
    try{        
        const posts = await Post.find();
        res.json(posts);
    }catch(error){
        res.json(error);
    }
});

app.post('/api/posts', async (req, res) => {
    const post = new Post({
        Apartment_Name: req.body.Apartment_Name,
        Location: req.body.Location,
        Owner_Name: req.body.Owner_Name,
        Owner_Contact: req.body.Owner_Contact,
        Owner_Email: req.body.Owner_Email,
        Deposit: req.body.Deposit,
        Description: req.body.Description,
        Accommodation: req.body.Accommodation,
        Notice_Period: req.body.Notice_Period
    });

    try{
        const savedPost= await post.save();
        res.send(`user inserted: ${savedPost}`)
    }catch(err){
        res.status(400).send(err);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    // console.log(req.params);
    const cotent = await Post.findOne({ _id : req.params.id });
    // console.log(cotent)
    res.json(cotent);
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

    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.redirect('/');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.redirect('/');
    
    try {
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).redirect('/home');
    } catch (err) {
        res.status(400).redirect('/');
    }

});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("DB disconnected...")
          process.exit(0);
      });
});

app.listen(port, () => {
    console.log(`dev server running at ${web_url}`)
})