const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Gossip Model
const Gossips = require('../../models/Gossip');

// Load Gossip,Comment Validator
const validateGossipInput = require('../../validation/gossip');
const validateCommentInput = require('../../validation/comment');
const e = require("express");

// @route   GET /api/gossips/test
// @desc    test users route
// @access  public
router.get("/test", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      Username: "Hello",
      Message: "World Gossip",
    });
  });

// @route   POST /api/gossips
// @desc    Creates a new gossip
// @access  Private
router.post('/', passport.authenticate('jwt',{ session: false }), (req,res) => {

  const { errors,isValid } = validateGossipInput(req.body);

  //Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

  const newGossip = new Gossips({
    title : req.body.title,
    spiceLevel : req.body.spiceLevel,
    details : req.body.details,
    user: req.user.id,
    image: req.body.image
  });

  newGossip.save()
  .then(gossip => res.json(gossip));

});

// @route   GET /api/gossips
// @desc    Fetch all gossips
// @access  Private
router.get('/', passport.authenticate('jwt',{ session: false }), (req,res) => {

  Gossips.find()
    .populate('user', ['name', 'avatar'])
    .sort({datetime:-1})
    .then(gossips => res.json(gossips))
    .catch(err => res.status(404));

});

// @route   GET /api/gossips/:goss_id
// @desc    Fetch gossip with gossip id
// @access  Private
router.get('/:goss_id', passport.authenticate('jwt',{ session: false }), (req,res) => {

  Gossips.findById(req.params.goss_id)
  .populate('user')
  .populate('comments.user')
  .populate('comments.replies.user')
    .then(gossip =>{

      if(!gossip){
        res.status(404).json({message: "Gossip does not exist."});
      }
      let usersInLastLogins = (gossip.lastLogins.length > 0 ? gossip.lastLogins.map(e => e.user.toString()) : []);
      let index = usersInLastLogins.indexOf(req.user._id.toString());
      if(index === -1){
        gossip.lastLogins.push({user:req.user,lastLogin: Date.now()});
        gossip
          .save()
          .then((gossipss) => {res.json(gossipss)})
          .catch((err) => console.log(err));

      }else{
        gossip.lastLogins[index].lastLogin = Date.now();
        gossip
          .save()
          .then((gossip) => res.json(gossip))
          .catch((err) => res.status(500));
      }

    })
    .catch(err => res.status(404));

});

// @route   DELETE /api/gossips/:goss_id
// @desc    Delete a Gossip
// @access  Private
router.delete('/:goss_id', passport.authenticate('jwt',{ session: false }), (req,res) => {

  Gossips.findById(req.params.goss_id)
  .then(gossip => {

    if(!gossip){
      res.status(404).json({ message: "Does not exist." })
    }
    if(!( gossip.user.toString() === req.user.id.toString())){
      return res.status(403).json({ message: "You can only delete your gossips." });
    }

    Gossips.findByIdAndRemove(req.params.goss_id)
    .then(() => {
      res.status(200).json({ success: true });
    })

  })
  .catch(err => res.status(400));
});

// @route   POST /api/gossips/like/:goss_id
// @desc    Like a gossip
// @access  Private
router.post("/like/:goss_id", passport.authenticate("jwt", { session: false }), (req,res) => {

  Gossips.findById(req.params.goss_id)
  .then(gossip => {

    if(!gossip){
      res.status(404).json({ message: "Gossip does not exist." });
    }

    if(gossip.likes.filter(item => item.user.toString() === req.user.id).length > 0){
      res.status(400).json({ alreadyLiked: "User already liked this post." });
    }

    gossip.likes.push({user: req.user.id});
    gossip.save()
    .then(gossip => res.json(gossip));

  })
  .catch(err => {console.log(err);res.status(400)});

});

// @route   DELETE /api/gossips/like/:goss_id
// @desc    Unlike a gossip
// @access  Private
router.delete("/like/:goss_id", passport.authenticate("jwt", { session: false }), (req,res) => {

  Gossips.findById(req.params.goss_id)
  .then(gossip => {

    if(!gossip){
      res.status(404).json({ message: "Gossip does not exist." });
    }

    if(!(gossip.likes.filter(item => item.user.toString() === req.user.id).length > 0)){
      res.status(400).json({ hasNotLiked: "User has not liked this post." });
    }

    // Remove a like
    const removeIndex = gossip.likes.map(item => item.user.toString()).indexOf(req.user.id);
    gossip.likes.splice(removeIndex,1);

    // Saving back
    gossip.save()
    .then(gossip => res.json(gossip));

  })
  .catch(err => {console.log(err);res.status(400)});

});

// @route   POST /api/gossips/comment/:goss_id
// @desc    Add a comment to a gossip
// @access  Private
router.post("/comment/:goss_id", passport.authenticate("jwt", { session: false }), (req,res) => {

  const { errors,isValid } = validateCommentInput(req.body);

  //Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

  Gossips.findById(req.params.goss_id)
  .then(gossip => {

    const newComment = {
      user: req.user.id,
      comment: req.body.comment
    }

    // Add to comments array
    gossip.comments.push(newComment);

    // Saving the gossip
    gossip.save()
    .then(gossip => res.json(gossip));

  })
  .catch(err => res.status(404).json(err));

});

// @route   DELETE /api/gossips/comment/:goss_id/:comment_id
// @desc    Delete a comment to a gossip
// @access  Private
router.delete("/comment/:goss_id/:comment_id", passport.authenticate("jwt", { session: false }), (req,res) => {

  const errors = {};

  Gossips.findById(req.params.goss_id)
  .then(gossip => {

    //Check if comment exists
    if(gossip.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
      return res.status(404).json({ commentNotFound: "Comment does not exist." });
    }

    // removeIndex for comment
    const removeIndex = gossip.comments.map(comment => comment._id).indexOf(req.params.comment_id);

    // Checking for comment owner
    if(gossip.comments[removeIndex].user.toString() !== req.user.id){
      return res.status(403).json({ forbidden: "You may only delete your own comments" });
    }

    // Splicing the array
    gossip.comments.splice(removeIndex,1);

    // Saving the gossip

    gossip.save()
    .then((gossip) => res.json(gossip));

  })
  .catch(err => res.status(404));

});

// @route   POST /api/gossips/comment/reply/:goss_id/:comment_id
// @desc    Add a reply to a comment
// @access  Private
router.post("/comment/reply/:goss_id/:comment_id", passport.authenticate("jwt", { session: false }), (req,res) => {

  const { errors,isValid } = validateCommentInput(req.body);

  //Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

  Gossips.findById(req.params.goss_id)
  .then(gossip => {

  //Check if comment exists
  if(gossip.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
    res.status(404).json({ commentNotFound: "Comment does not exist." });
  }

    const newReply = {
      user: req.user.id,
      comment: req.body.comment
    }

    // Index of comment
    const indexReply = gossip.comments.map(comment => comment._id).indexOf(req.params.comment_id);

    // Add to comments array
    gossip.comments[indexReply].replies.push(newReply);

    // Saving the gossip
    gossip.save()
    .then(gossip => res.json(gossip));

  })
  .catch(err => {console.log(err);res.status(404).json(err)});

});

// @route   DELETE /api/gossips/comment/reply/:goss_id/:comment_id/:reply_id
// @desc    Delete a reply to a comment
// @access  Private
router.delete(  "/comment/reply/:goss_id/:comment_id/:reply_id", passport.authenticate("jwt", { session: false }),  (req, res) => {

  Gossips.findById(req.params.goss_id)
    .then((gossip) => {
      //Check if comment exists
     if (gossip.comments.filter((comment) => comment._id.toString() === req.params.comment_id).length === 0) {
      res.status(404).json({ commentNotFound: "Comment does not exist." });
     }

    // Index of comment
    const indexReply = gossip.comments.map(comment => comment._id).indexOf(req.params.comment_id);

    //Check if reply exists
     if (gossip.comments[indexReply].replies.filter((comment) => comment._id.toString() === req.params.reply_id).length === 0) {
      res.status(404).json({ replyNotFound: "Reply does not exist." });
     }

    // removeIndex for reply
    const removeIndex = gossip.comments[indexReply].replies
      .map((reply) => reply._id)
      .indexOf(req.params.reply_id);

    // Checking for comment reply owner
    if(gossip.comments[indexReply].replies[removeIndex].user.toString() !== req.user.id){
      return res.status(403).json({ forbidden: "You may only delete your own replies." });
      }

    // Splicing the array
    gossip.comments[indexReply].replies.splice(removeIndex, 1);

    // Saving the gossip
    gossip.save().then((gossip) => res.json(gossip));

    })
    .catch((err) => {console.log(err);res.status(404)});

  }
);

module.exports = router;
