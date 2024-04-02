const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

  const thoughtSchema = new Schema(
  {
    thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(timestamp) {
      return new Date(timestamp).toLocaleDateString();
  }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
  
});

// const Reaction = model('reaction', reactionSchema);
// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;