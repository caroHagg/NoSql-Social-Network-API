const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minLength:1,
      maxLength:280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


thoughtSchema
  .virtual('getReactions')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
