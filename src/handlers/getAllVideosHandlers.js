const {
  getAllVideosControllers,
} = require("../controllers/getAllVideosControllers");
const getAllVideogamesHandler = async (req, res) => {
  try {
    const allVideogames = await getAllVideosControllers();
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { getAllVideogamesHandler };
