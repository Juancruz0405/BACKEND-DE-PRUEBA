const { Videogame } = require("../db");
const { Genres } = require("../db");
require("dotenv").config(); //para acceder a las variables de entorno
const { API_KEY } = process.env; //con process.env accedemos a la variable de entorno que queramos

const axios = require("axios");

// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.
// const getIdVideosControllers = async (id, source) => {
//   let videogameData;

const getIdVideosControllers = async (id, source) => {
  let videogameData;

  if (source === "bdd") {
    videogameData = await Videogame.findByPk(id, {
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    console.log(videogameData);

    videogameData = {
      ...videogameData.get(),
      Genres: videogameData.Genres.map((g) => g.name),
    };
  } else if (source === "api") {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    videogameData = {
      id: data.id,
      name: data.name,
      description: data.description,
      plataformas: data.platforms.map((nombre) => {
        return nombre.platform.name;
      }),
      imagen: data.background_image,
      lanzamiento: data.released,
      rating: data.rating,
      Genres: data.genres.map((gen) => {
        return gen.name;
      }),
    };
  } else {
    return { error: "Invalid ID provided" };
  }
  console.log(videogameData);
  return videogameData;
};

module.exports = { getIdVideosControllers };
