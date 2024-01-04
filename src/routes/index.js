const { Router } = require("express");
const { getAllVideogamesHandler } = require("../handlers/getAllVideosHandlers");
const { getIdVideogamesHandler } = require("../handlers/getIdVideosHandlers");
const {
  getNamesVideogamesHandler,
} = require("../handlers/getNamesVideogamesHandler");
const { postVideogameHandler } = require("../handlers/postVideogameHandler");
const { getGenresHandler } = require("../handlers/getGenresHandler");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getAllVideogamesHandler);
router.get("/videogames/:id", getIdVideogamesHandler);
router.get("/videogames-name", getNamesVideogamesHandler);
router.post("/videogames", postVideogameHandler);
router.get("/genres", getGenresHandler);

module.exports = router;
