const User = require('../models/user');
const passport  = require('passport');

module.exports.login = function(req,res){
    // console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('login_page.ejs',{layout:false});
}

module.exports.create_user = function(req,res){

    User.findOne({email: req.body.email}, function(err,user){

if(err){
    console.log('error in finding  user in signning up')
    return;
}

if(!user){
    User.create(req.body, function(err,user){

        if(err){
            console.log('error in creating user in signning up')
            return;
        }





        return res.redirect('back');


    })
}
else{
    return res.redirect('back');
}



    })



  
}



module.exports.create_session = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.sign_out = function(req,res){
    req.logout();
    return res.redirect('/');
}