const { postVideoControllers } = require("../controllers/postVideoControllers");
const postVideogameHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      plataformas,
      imagen,
      lanzamiento,
      rating,
      genres,
    } = req.body; //se extaen los datos necesarios enviados x el cliente
    const allVideogames = await postVideoControllers(
      name,
      description,
      plataformas,
      imagen,
      lanzamiento,
      rating,
      genres
    );
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { postVideogameHandler };
