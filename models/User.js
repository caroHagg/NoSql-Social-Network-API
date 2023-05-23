const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique:true,
      trimmed:true
    }, 
    email: {
      type: String,
      require:true,
      unique:true,
      validate: {
        validator: function(v) {
          //iqcode and mongoose documentation
          return [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/].test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    thoughts: [ {
      type: Schema.Types.ObjectId,
      ref: 'thought',
    },
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
   
    toJSON: {
      virtuals: true,
    }
  }
);

// Create a virtual property
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
 
// Initialize User model
const User = model('user', userSchema);

module.exports = User;
