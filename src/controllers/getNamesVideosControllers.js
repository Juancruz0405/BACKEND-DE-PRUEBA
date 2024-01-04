const { Videogame } = require("../db");
const { API_KEY } = process.env;
require("dotenv").config(); //para acceder a las variables de entorno
const axios = require("axios");
const { Op } = require("sequelize");
// GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
const getNamesVideosControllers = async (name) => {
  const namesOfVideogameBDD = await Videogame.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    limit: 15,
  });
  try {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&page_size=15&key=${API_KEY}`
    );

    let namesOfVideogameAPI = data.results.map((jueg) => {
      return {
        id: jueg.id,
        name: jueg.name,
        description: jueg.description,
        plataformas: jueg.platforms.map((nombre) => nombre.platform.name),
        imagen: jueg.background_image,
        lanzamiento: jueg.released,
        rating: jueg.rating,
        genres: jueg.genres.map((gen) => gen.name),
      };
    });
    console.log("Games from API:", namesOfVideogameAPI);
    if (!namesOfVideogameAPI && !namesOfVideogameBDD) {
      throw Error("No existe el videojuego");
    } else {
      return [...namesOfVideogameAPI, ...namesOfVideogameBDD];
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return { error: "Failed to fetch data from the API" };
  }
};

module.exports = { getNamesVideosControllers };
