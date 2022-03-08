const { Schema, model } = require('mongoose');

 const scoreSchema = new Schema({
     score:{
         type:String,
     },
     gamevalue:{
         type: Number,
         required: true

     }
   
 }, { timestamps: true })


const Score = model('Score', scoreSchema);

module.exports = Score;