const {Schema , model, Types} = require('mongoose');

//create schema
const jokeRateSchema = Schema(
  {
    _id: {
      type: Types.ObjectId,
    },
    jokeText: {
      type: String,
      required: true,
    },
    jokeHasHumor: {
      type: Boolean,
      required: true,
    },
    jokeRate: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    collection: "jokeRate",
  }
);


module.exports = model("JokeRate", jokeRateSchema);
