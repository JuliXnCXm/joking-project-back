const { Router } = require("express");
const Joke = require("../models/JokeModel");
const JokeRate = require("../models/JokeRatesModel");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

class JokesController {
  getJokes = async (req, res) => {
    try {
      const filteredJokes = await Joke.find({ jokeRateCount: { $ne: 4 } })
        .sort({ jokeRateCount: 1 })
        .exec();
      const randomJokes = filteredJokes
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      res.status(200).json(randomJokes);
    } catch (error) {
      console.error("Error al obtener los chistes:", error);
      res.status(500).json({ message: "Error al obtener los chistes." });
    }
  };

  insertJokes = (req, res) => {
    JokeRate.create(
      {
        _id: req.body._id,
        jokeText: req.body.jokeText,
        jokeHasHumor: req.body.jokeHasHumor,
        jokeRate: req.body.jokeRate,
      },
      (error, data) => {
        if (!error) {
          data.save();
          res.status(201).json({ message: "Joke Rate added", data });
        } else {
          console.log(error);
          res.status(500).json({ message: "Error" });
        }
      }
    );
  };

  insertJokes = async (req, res) => {
    const jokesList = req.body.jokes;
    let insertedJokes = [];
    let errors = [];

    for (const joke of jokesList) {
      try {
        const jokeRate = new JokeRate({
          _id: joke._id,
          jokeText: joke.jokeText,
          jokeHasHumor: joke.jokeHasHumor,
          jokeRate: joke.jokeRate,
        });
        await jokeRate.save();
        insertedJokes.push(jokeRate);
        await Joke.updateOne(
          { _id: joke._id },
          { $inc: { jokeRateCount: 1 } } 
        );
      } catch (error) {
        console.error(
          "Error al insertar el chiste o actualizar el count:",
          error
        );
        errors.push({ joke, error });
      }
    }

    if (errors.length > 0) {
      res.status(207).json({
        message: "Algunos chistes no se pudieron insertar o actualizar.",
        insertedJokes,
        errors,
      });
    } else {
      res
        .status(201)
        .json({
          message:
            "Todos los chistes fueron insertados y actualizados exitosamente",
          insertedJokes,
        });
    }
  };

  insertAllJokes = (req, res) => {
    const jokes = [];
    fs.createReadStream("src/chistes_clean.csv")
      .pipe(csv())
      .on("data", (row) => {
        jokes.push({
          jokeText: row.text,
          jokeRateCount: parseInt(row.jokeRateCount, 10) || 0,
        });
      })
      .on("end", async () => {
        try {
          await Joke.insertMany(jokes);
          res.status(200).json({ message: "Chistes guardados exitosamente" });
        } catch (error) {
          console.error("Error al insertar los chistes:", error);
          res.status(500).json({
            message: "Error al guardar los chistes en la base de datos",
          });
        }
      })
      .on("error", (error) => {
        console.error("Error al leer el archivo CSV:", error);
        res.status(500).json({ message: "Error al leer el archivo CSV" });
      });
  };
}

module.exports = JokesController;
