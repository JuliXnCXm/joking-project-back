const {Router} = require('express');
const JokesController = require("../controllers/JokesController.js");

class JokesRouter {
  constructor() {
    this.router = new Router();
    this.#config();
  }

  #config() {
    const objPhotoC = new JokesController();
    this.router.get("/user/jokes", objPhotoC.getJokes);
    this.router.post("/all/jokes", objPhotoC.insertAllJokes);
    this.router.post("/user/jokes", objPhotoC.insertJokes);
    this.router.put("/user/jokesRates", objPhotoC.updateAllRatesCounts);
  }
}

module.exports = JokesRouter;