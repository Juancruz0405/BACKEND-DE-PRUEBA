const { Genres } = require("../db");
require("dotenv").config(); //para acceder a las variables de entorno
const { API_KEY } = process.env; //con process.env accedemos a la variable de entorno que queramos

const axios = require("axios");
// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
const getGenresController = async () => {
  try {
    const { data } = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const generosApi = data.results.map((genero) => {
      return { name: genero.name };
    });

    // Comprueba si puedes imprimir los datos antes de bulkCreate

    await Genres.bulkCreate(generosApi, {
      ignoreDuplicates: true,
    });
    const misGeneros = await Genres.findAll();
    return misGeneros;
  } catch (error) {
    // Imprime el error para identificar la causa
    console.error(
      "Error al obtener y guardar los géneros en la base de datos:",
      error
    );
    throw new Error(
      "Error al obtener y guardar los géneros en la base de datos."
    );
  }
};

module.exports = { getGenresController };
