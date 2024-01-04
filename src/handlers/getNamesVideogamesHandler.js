const {
  getNamesVideosControllers,
} = require("../controllers/getNamesVideosControllers");

const getNamesVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const namesVideogames = await getNamesVideosControllers(name);
    res.status(200).json(namesVideogames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getNamesVideogamesHandler };
