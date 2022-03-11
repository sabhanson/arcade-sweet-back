const { Schema, model } = require('mongoose');

 const reviewSchema = new Schema({
     gamevalue:{
         type: Number,
         required: true
     },
     username:{
        type: String,
        required: true
     },
     review:{
        type: String,
        required: true
     },
     imgSrc:{
        type: String,
        required: true  
     }
 }, { timestamps: true })

const Review = model('Review', reviewSchema);

module.exports = Review;