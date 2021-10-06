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
const { render } = require('ejs');
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
const createToken = (usr) => {
    return jwt.sign({ usr }, process.env.TOKEN_SECRET , {
        expiresIn: maxAge
    });
};


// WEBPAGE

app.get('/test', (req, res) => {
    res.render('test');
})

app.post('/api/test', (req, res) => {
    console.log(req.body)
})

app.post('/saveImage', (req, res) => {
    console.log(req.body)
})



app.get('/', (req, res) => { 
    res.render('index');
})

app.get('/signup', (req, res) => {
    // console.log(req.query.err)

    if(!req.cookies.jwt){
    if(req.query.err){
        console.log("sending error")
        res.render('Signup', { Msg : req.query.err, style : "color:red"})
    } else if(req.query.succ){
        console.log("sending Success")
        res.render('Signup', { Msg : req.query.succ, style : "color:green"})
    } else{
        res.render('Signup', { Msg : null })
    }
} else{
    return res.redirect('/home')
}
});


app.get('/home', async (req, res) => { 
        let loggedin = false;
    try {
        if(req.cookies.jwt){
             loggedin = true;
        }
        site = `${web_url}/api/posts`
        const data = await axios.get(site);
        // console.log(data);
        res.render('homepage', { mydata : data, auth : loggedin});
      } catch (error) {
        console.log(error);
        // res.redirect('/signup');
        res.redirect('/signup?err=' + encodeURIComponent('Login first to proceed'));
      }   
})

app.get('/index', (req, res) => { 
    res.render('index');
})

app.get('/register', requireAuth, async (req, res) => { 
    console.log(req.cookies.jwt)
    tokendecode = await jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
    console.log(tokendecode.usr)
    res.render('registerHome',{usr : tokendecode.usr});
})

app.get('/content', async (req, res) => { 
    const id = req.query.id;
    // res.send(id)
    try{
    site = `${web_url}/api/posts/${id}`
    console.log(`---------------------------------------------------${site}`)
    const data = await axios.get(site);
    console.log(data.data)
    res.render('content',{pst : data})
}catch{
    res.redirect('/signup?err=' + encodeURIComponent('Login first to proceed'));
}
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
    console.log(req.body)
    const post = new Post({
        Apartment_Name: req.body.Apartment_Name,
        Location: req.body.Location,
        Owner_Name: req.body.Owner_Name,
        Owner_Contact: req.body.Owner_Contact,
        Owner_Email: req.body.Owner_Email,
        Description: req.body.Description,
        Deposit: req.body.Deposit,
        Notice_Period: req.body.Notice_Period,
        Accommodation: req.body.Accommodation,
        Maintenance : req.body.Maintenance,
        Electricity_Charges : req.body.Electricity_Charges,
        Food_Availabilty  : req.body.Food_Availabilty,
        Parking : req.body.Parking,
        Power_Backup : req.body.Power_Backup,
        AC_Rooms : req.body.AC_Rooms ,
        No_of_Beds : req.body.No_of_Beds,
        img_url : req.body.img_url
    });

    try{
        const savedPost= await post.save();
        res.send(`user inserted: ${savedPost}`)
    }catch(err){
        res.status(400).send(err);
    }
});

app.get('/api/posts/:id', async (req, res) => {
    const con = await Post.findOne({ _id : req.params.id });
    res.json(con);

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
        // res.send(`user inserted: ${savedUser._id}`)
        res.redirect('/signup?succ=' + encodeURIComponent('User Created successfully'));
    }catch(err){
        res.status(400).send(err);
    }
});

app.post('/api/login', async (req, res) => {

    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    // if (!user) return res.redirect('/signup');
    if (!user) return res.redirect('/signup?err=' + encodeURIComponent('Incorrect username or password'));

    const validPass = await bcrypt.compare(req.body.password, user.password);
    // if(!validPass) return res.redirect('/signup');
    if(!validPass) return res.redirect('/signup?err=' + encodeURIComponent('Incorrect username or password'));
    
    try {
        const token = createToken(user);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).redirect('/home');
    } catch (err) {
        res.status(400).redirect('/signup?err=' + encodeURIComponent("Couldn't create a session"));
    }

});

// logout

app.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/signup?succ=' + encodeURIComponent("Logged out"));
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("DB disconnected...")
          process.exit(0);
      });
});

app.listen(port, () => {
    console.log(`dev server running at ${web_url}`)
})