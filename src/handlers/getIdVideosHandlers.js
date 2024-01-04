const {
  getIdVideosControllers,
} = require("../controllers/getIdVideosController");

const getIdVideogamesHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  try {
    const idVideogames = await getIdVideosControllers(id, source);
    res.status(200).json(idVideogames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getIdVideogamesHandler };
