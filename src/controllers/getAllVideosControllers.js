const { Videogame, Genres } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const getAllVideosControllers = async () => {
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
  let videogameAPI = [];

  // Limitar a las primeras 4 solicitudes
  for (let i = 0; i < 4; i++) {
    const { data } = await axios.get(url);

    const batchVideogames = data.results.map((video) => {
      return {
        id: video.id,
        name: video.name,
        description: video.description,
        plataformas: video.platforms.map((nombre) => {
          return nombre.platform.name;
        }),
        imagen: video.background_image,
        lanzamiento: video.released,
        rating: video.rating,
        Genres: video.genres.map((gen) => {
          return gen.name;
        }),
        created: false,
      };
    });

    videogameAPI = [...videogameAPI, ...batchVideogames];
    url = data.next;

    // Salir del bucle si no hay más páginas
    if (!url) {
      break;
    }
  }

  const allVideos = await Videogame.findAll({
    //traemos todos los VG y ademas incluyan los Genres
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  const allVideosBdd = allVideos.map((vd) => {
    //mapeamos los genres para filtrar mejor la informaicion
    const generos = vd.Genres.map((gen) => {
      return gen.name;
    });
    return { ...vd.get(), Genres: generos };
  });
  const arreglo = [...videogameAPI, ...allVideosBdd];

  return arreglo;
};

module.exports = { getAllVideosControllers };
