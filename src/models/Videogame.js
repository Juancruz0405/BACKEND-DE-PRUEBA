const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      plataformas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      imagen: { type: DataTypes.STRING, allowNull: false },
      lanzamiento: { type: DataTypes.DATE, allowNull: false },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0, max: 10 },
      },
      created: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { timestamps: true } //me eleimina la fecha de creacion del , es una columna extramodelo
  );
};
