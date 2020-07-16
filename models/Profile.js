const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Profile Schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  handle: {
    type: String,
    required: true,
    max: 30,
    unique: true,
  },
  mostHatedPerson: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  feeling: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  gossipExperience: [
    {
        title: {
            type: String,
            required: true,
        },
        aboutWhom: {
           type: String,
           required: true
        }
    },
  ],
  caughtGossips: [{
      title:{
        type: String,
        required: true
    },
    details:{
        type:String,
        required:true
    }
  }]
});