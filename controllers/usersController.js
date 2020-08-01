const Post = require('../models/posts');

module.exports.profile = function(req,res){

    // Post.find({}, function(err,posts){
    //     console.log(posts);

    //     return res.render('user_profile',
    //    { posts:posts
        
    //    });

    // })

    Post.find({}).populate('user').exec(function(err,posts){
        console.log(posts);
        return res.render('user_profile',{
            posts:posts
        })
    })



}