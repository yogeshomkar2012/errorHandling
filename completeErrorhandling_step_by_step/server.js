const app = require("./app");
const PORT = process.env.PORT
const dbConnection = require("./config/db");
dbConnection(PORT);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} `);
});
