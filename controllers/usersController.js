const Post = require('../models/posts');
const User = require('../models/user');


module.exports.homepage = function(req,res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('homepage',{
                posts:posts,
                all_users:users
            })
        })
        
    })


}
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');

        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('user_profile',{
            profile_user:user

        })


    })






}