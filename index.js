const express = require('express');
const cookieParser = require('cookie-parser');
const app  = express();
const port  = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport  = require('passport');
const passportLocal = require('./config/passport-local');
const mongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:"expanded",
    prefix:'/css'
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views','./views')


app.use(session({
    name:'SocioFy',
    secret:'sleepingdogs',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new mongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        }, function(err){
            console.log(err || "connect-mongodb setup");
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



app.use('/', require('./routes'));




app.listen(port, function(err){
    if(err){
        console.log(`error in running the server : ${err}`);
        return;
    }
    console.log(`server is running at port number : ${port}`);


});