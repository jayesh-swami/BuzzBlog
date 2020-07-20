const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');

// Load Profile and User models
const Users = require('../../models/User');
const Profiles = require("../../models/Profile");

// Loading profile validator
const validateProfileInput = require('../../validation/profile');
const validateGossExpInput = require('../../validation/gossExp');
const validateCaughtGossipsInput = require('../../validation/caughtGossip');

// @route   GET /api/profiles/test
// @desc    test profile route
// @access  Public
router.get("/test", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      Username: "Hello",
      Message: "World Profile",
    });
  });

// @route   GET /api/profiles
// @desc    Return current user details
// @access  Private
router.get('/',passport.authenticate('jwt',{session:false}), (req,res) => {

  const errors = {};
  
  Profiles.findOne({ user:req.user.id })
  .populate('user',['name','avatar'])
  .then((profile)=>{
    if(!profile){
      errors.noProfile = 'There is no profile for this user.'
      return res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => {console.log(err);res.status(404).json(err)});

});

// @route   POST /api/profiles
// @desc    Create OR Edit user profile
// @access  Private
router.post('/',passport.authenticate('jwt',{session:false}), (req,res) => {

  const { errors,isValid } = validateProfileInput(req.body);

  //Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

  // Extract fields from body
  const profileFields = {};
  profileFields.user = req.user.id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.mostHatedPerson) profileFields.mostHatedPerson = req.body.mostHatedPerson;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.feeling) profileFields.feeling = req.body.feeling;

  // Skills - split into array
  if (typeof req.body.skills !== "undefined"){
    profileFields.skills = req.body.skills.split(',');
  }

  // Social Network Handles
  profileFields.social = {};
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

  Profiles.findOne({ user:req.user.id })
  .then(profile => {
    if(profile){

      // Updating the profile

      console.log('updating the profile');

      Profile.findOneAndUpdate({ user:req.user.id }, { $set: profileFields }, { new: true })
      .then(profile => {console.log(profile);res.status(200).json(profile)});

    }else{

      // Creating a profile
      
      // Checking if a handle exists
      Profiles.findOne({ handle:profileFields.handle })
      .then(profile => {
        if(profile){
          errors.handle = "Handle already exists";
          res.status(400).json(errors);
        }

        // Save Profile
        new Profiles(profileFields).save()
        .then(profile => res.json(profile));
      })
    }

  })
  .catch(err => res.status())

});

// @route   GET /api/profiles/handle/:handle
// @desc    get profile by handle
// @access  Private
router.get('/handle/:handle', passport.authenticate('jwt',{session:false}), (req,res) => {

  const errors = {};

  Profiles.findOne({ handle:req.params.handle })
  .populate('user',['name','avatar'])
  .then(profile => {
    if(!profile){
      errors.noProfile = "There is no profile for this user.";
      res.status(404).json(errors);
    }

    res.json(profile);
  })
  .catch(err => res.status(404).json(err));

});

// @route   GET /api/profiles/user/:user_id
// @desc    get profile by user ID
// @access  Private
router.get('/user/:user_id', passport.authenticate('jwt',{session:false}), (req,res) => {

  const errors = {};

  Profiles.findById( req.params.user_id )
  .populate('user',['name','avatar'])
  .then(profile => {
    if(!profile){
      errors.noProfile = "There is no profile for this user.";
      res.status(404).json(errors);
    }

    res.json(profile);
  })
  .catch(err => res.status(404).json({profile: "Does not exist."}));

});

// @route   GET /api/profiles/all
// @desc    get profiles of all users
// @access  Private
router.get('/all', passport.authenticate('jwt',{session:false}), (req,res) => {

  const errors = {};

  Profiles.find()
  .populate('user',['name','avatar'])
  .then(profiles => {
    if(!profiles){
      errors.noProfile = "There are no profiles.";
      res.status(404).json(errors);
    }

    res.json(profiles);
  })
  .catch(err => res.status(404).json({profile: "Does not exist."}));

});

// @route   POST /api/profiles/gossexp
// @desc    Add Gossip Experience
// @access  Private
router.post('/gossexp', passport.authenticate('jwt',{session:false}), (req,res) => {

  const { errors,isValid } = validateGossExpInput(req.body);

  //Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

  Profiles.findOne({ user: req.user.id })
  .then(profile => {
    if(!profile){
      errors.profile = "The profile does not exist."
    }

    const gossExp = {
      title: req.body.title,
      aboutWhom: req.body.aboutWhom,
      details: req.body.details
    };

    // Adding to gossExp array
    profile.gossipExperience.unshift(gossExp);
    profile.save()
    .then(profile => res.json(profile));
  })
  .catch(err => {console.log(err);res.status(400).json(err)});

});

// @route   POST /api/profiles/caughtgoss
// @desc    Add Caught Gossips
// @access  Private
router.post('/caughtgoss', passport.authenticate('jwt',{session:false}), (req,res) => {

  const { errors,isValid } = validateCaughtGossipsInput(req.body);

  //Check Validation
  if(!isValid){
      return res.status(400).json(errors);
  }

  Profiles.findOne({ user: req.user.id })
  .then(profile => {
    if(!profile){
      errors.profile = "The profile does not exist."
    }

    const caughtGossips = {
      title: req.body.title,
      details: req.body.details
    };

    // Adding to gossExp array
    profile.caughtGossips.unshift(caughtGossips);
    profile.save()
    .then(profile => res.json(profile));
  })
  .catch(err => res.status(400).json(err));

});

// @route   DELETE /api/profiles/gossexp/:exp_id
// @desc    Delete Gossip Experiences
// @access  Private
router.delete('/gossexp/:exp_id', passport.authenticate('jwt',{session:false}), (req,res) => {

  Profiles.findOne({ user: req.user.id })
  .populate('user',['name','avatar'])
  .then(profile => {

    // Getting index of experience to be removed
    const removeIndex = profile.gossipExperience
                              .map(gossexp => gossexp.id)
                              .indexOf(req.params.exp_id);

    // Splice out of array
    profile.gossipExperience.splice(removeIndex,1);

    // Saving back
    profile.save()
    .then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));

});

// @route   DELETE /api/profiles/caughtgoss/:cgoss_id
// @desc    Delete Caught Gossips
// @access  Private
router.delete('/caughtgoss/:cgoss_id', passport.authenticate('jwt',{session:false}), (req,res) => {

  Profiles.findOne({ user: req.user.id })
  .populate('user',['name','avatar'])
  .then(profile => {

    // Getting index of experience to be removed
    const removeIndex = profile.caughtGossips
                              .map(item => item.id)
                              .indexOf(req.params.cgoss_id);

    // Splice out of array
    profile.caughtGossips.splice(removeIndex,1);

    // Saving back
    profile.save()
    .then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));

});

// @route   DELETE /api/profiles
// @desc    Delete user and profile
// @access  Private
router.delete("/", passport.authenticate("jwt", { session: false }), (req,res) => {

  Profiles.findOneAndRemove({ user: req.user_id })
  .then(() => {
    Users.findByIdAndRemove(req.user.id)
    .then(() => {
      res.json({success: true});
    });
  })

});


module.exports = router;
