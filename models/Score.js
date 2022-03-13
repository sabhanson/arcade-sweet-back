const { Schema, model } = require('mongoose');

 const scoreSchema = new Schema({
     score:{
         type:Number,
         required: true
     },
     gamevalue:{
         type: Number,
         required: true
     },
     username:{
        type: String,
        required: true
     }
 }, { timestamps: true })

const Score = model('Score', scoreSchema);

module.exports = Score;