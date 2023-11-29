
const cors = require("cors")
require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// const User = require("./models/users");
var cookieParser = require('cookie-parser');
const body= require("body-parser");
let fs = require('fs');
// const mongoose=require("mongoose");
// const { $where } = require("./models/users");


app.use(cors({
    origin: '*'
}));

// setting us some local verialbles
const  PORT = process.env.PORT ;

const DBSERVER=process.env.MONGOOSE_DBSERVER;


// mongoose.connect(DBSERVER, {useNewUrlParser: true,useUnifiedTopology: true}).then(data=>{
//     console.log("connected");
// }).catch(err=>{
//     console.log(err);
// });


// var session = require('express-session');



app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));
app.use(require("express-session")(
{
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});


// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new passportlocal(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


app.use(body.json())

app.use(body.urlencoded({extended:true}));


//mongoose.connect("mongoosedb://localhost/defarm");















const products = new Map([

    [1, {name:"Basic(Monthly)", Price:process.env.BASIC_ID, Features: "Basic Plan (Monthly): 1000sms/month"}],
    [2, {name: "SILVER_ID",Price:process.env.SILVER_ID, Features: "Basic Plan (Yearly): 1000sms/month"}],
    [3, {name:"GOLD_ID", Price:process.env.GOLD_ID, Features: "Preimium Plan (Monthly) : Unlimited sms/month"}],
    [4, {name:"DIAMOND_ID", Price:process.env.DIAMOND_ID, Features: "Premium Plan (Yearly) : Unlimited sms/month"}]
])

// setting up some handels

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());








app.get('*', (req, res, next) => {
    res.render('index');
});


app.post('*', (req, res, next) => {
    res.render('index');
});








app.listen(PORT, () => {
    console.log('serever is live at  port  no: %s', PORT )
});










function formVailidation(req,res,next){

    usersname=req.body.name
    email=req.body.email
    password=req.body.password
    pan_number=req.body.pan_number
    contact_number=req.body.contact_number
    subscription_type=req.body.subscription_type,
    business_name=req.body.business_name,
    business_webiste=req.body.business_webiste
 

    if(nameValidation(usersname)&& emailValidation(email)  && passwordVailidation(password)  && panVailidation(pan_number) && contactVailidation(contact_number) && nameValidation(business_name)  && websiteVailidation(business_webiste)){
        
        return next();
    }

    else{

        // console.log(nameValidation(usersname))
        // console.log(emailValidation(email))

        // console.log(passwordVailidation(password))

        // console.log(panVailidation(pan_number))

        // console.log(contactVailidation(contact_number))

        // console.log(websiteVailidation(business_webiste))

        // console.log(nameValidation(business_name))

        // console.log(email)
        console.log("Form Vailidation failed")
        res.render("register");
    }
}



function isLoggedIn(req,res,next)
{
    if(req.session.user)
    {
        return next();
    }
    res.render("login");
}
function checkForLogin(req,res,next)
{
    if(req.session.user)
    {
        res.render("profile");
        
    }
    return next();
}





 
// Vialidation are here


function nameValidation(name){
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if(nameRegex.test(name))
    {
        
        return true;
    }
    else
    {
        console.log("name verification failed")
        return false;
    }

}
function emailValidation(email){

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mailformat.test(email))
    {
        
        return true;
    }
    else
    {
        console.log("Email verification failed")
        return false;
    }


}

function passwordVailidation(password){
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-zA-Z]).{8,}$/;
    if(passwordRegex.test(password))
    {
        
        return true;
    }
    else
    {
        console.log("password verification failed")
        return false;
    }

}

function panVailidation(pan){
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    if(panRegex.test(pan))
    {
        
        return true;
    }
    else
    {
        console.log("pan verification failed")
        return false;
    }

}

function contactVailidation(contact){
    const contactRegex = /[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;

    if(contactRegex.test(contact))
    {
        
        return true;
    }
    else
    {
        console.log("contact verification failed")
        return false;
    }
}

function websiteVailidation(website){
    const websiteRegex = /^(http(s)?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if(websiteRegex.test(website))
    {
        
        return true;
    }
    else
    {
        console.log("waebsite verification failed")
        return false;
    }

}





