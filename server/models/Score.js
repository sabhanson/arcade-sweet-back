const { Schema, model } = require('mongoose');

 const scoreSchema = new Schema({
     score:{
         type:String,
     },
     
    // timestamps: {
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at'
    //   }
 })


const Score = model('Score', scoreSchema);

module.exports = Score;