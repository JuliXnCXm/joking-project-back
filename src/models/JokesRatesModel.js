const {Schema , model, Types} = require('mongoose');

const jokesRatesSchema = Schema(
  {
    _id: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    jokeId: {
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
    collection: "jokesRates",
  }
);


module.exports = model("JokesRates", jokesRatesSchema);
