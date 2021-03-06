const passport  = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new LocalStrategy({

    usernameField:"email"
},
function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user ---> passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log("invalid usernanme/password");
            return done(null,false);
        }

        return done(null,user);
    });
}

));

passport.serializeUser(function(user,done){
    done(null,user.id);
})


passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user ---> passport');
            return done(err);

        }
        return  done(null,user);
    })
})


//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if authenticated
    if(req.isAuthenticated()){
        return next();
    }
    // if not authenticated
    return   res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;