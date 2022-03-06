const { Schema, model } = require('mongoose');

 const gameSchema = new Schema({
     isFeatured: {
         type: Boolean
     },
      scores:[
          {
              type: Schema.Types.ObjectId,
              ref: 'Score',
          }
      ],
 })

const Game = model('Game', gameSchema);

module.exports = Game;