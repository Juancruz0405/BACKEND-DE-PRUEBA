const { Videogame, Genres } = require("../db");

require("dotenv").config(); //para acceder a las variables de entorno

// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).

const postVideoControllers = async (
  name,
  description,
  plataformas,
  imagen,
  lanzamiento,
  rating,
  genres
) => {
  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      plataformas,
      imagen,
      lanzamiento,
      rating,
    });

    let findGenero = await Genres.findAll({ where: { name: genres } });

    newVideogame.addGenres(findGenero);
    console.log("genres", genres);
    console.log("findGenero:", await Genres.findAll());
    return newVideogame;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { postVideoControllers };
