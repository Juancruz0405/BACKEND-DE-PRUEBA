const { getGenresController } = require("../controllers/getGenresController");

const getGenresHandler = async (req, res) => {
  try {
    const genresVideogame = await getGenresController();
    res.status(200).json(genresVideogame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getGenresHandler };
