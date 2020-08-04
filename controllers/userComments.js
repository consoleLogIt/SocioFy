const Comment = require('../models/comment');
const Post = require('../models/posts');
module.exports.create  = function(req,res){
console.log(req.body.post);
  Post.findById(req.body.post ,function(err,post){
      console.log(post);
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                Post:post._id
            },
            function(err,comment){
                console.log(comment);
                if(err){
                    console.log("error in commenting...");
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            
            })

        }
    })
  
}