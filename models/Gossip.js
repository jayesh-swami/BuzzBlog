const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Gossip Schema
const gossipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  spiceLevel: {
    type: String,
    default: "S",
    max: 2,
  },
  image: {
    type: String,
    default: null,
  },
  lastLogins: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      lastLogin: {
        type: Date,
        default: null
      }
    },
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  details: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      datetime: {
        type: Date,
        default: Date.now,
      },
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
            required: true,
          },
          datetime: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  datetime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Gossips = mongoose.model("Gossip",gossipSchema);