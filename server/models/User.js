const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


 const userSchema = new Schema({
     username :{
         type: String,
         required: true,
         unique: true,
         minlength: 3,
         maxlength: 20,
     },
     email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: props => `${props.value} is not a valid email address`
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     },
     password:{
        type: String,
        required: true,
        unique: false,
        minlength: 8,
        maxlength: 20,
     },
     file_name: {
        type: String,
        required: true,
        default:'https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg ',
      },

      scores:[
          {
              type: Schema.Types.ObjectId,
              ref: 'Score',
          }
      ],
 })

 // set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
  // compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;