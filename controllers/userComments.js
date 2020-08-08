const Comment = require('../models/comment');
const Post = require('../models/posts');
module.exports.create  = function(req,res){
console.log(req.body.post);
  Post.findById(req.body.post ,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:post._id
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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){

        if(comment.user == req.user.id){
            let postId  = comment.post;
            console.log(postId);
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull :{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })

        }
        else{
            return res.redirect('back');
        }
    })
}