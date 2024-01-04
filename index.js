const server = require("./src/app.js"); //requerimos app.js que acabamos de crear
const { conn } = require("./src/db.js");
const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
