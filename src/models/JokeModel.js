const {Schema , model, Types} = require('mongoose');

//create schema
const jokeSchema = Schema({
    
    _id: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    jokeText: {
        type: String,
    },
    jokeRateCount: {
        type: Number,
    },

},{
    collection: 'jokes'
})


module.exports = model("Joke", jokeSchema);
