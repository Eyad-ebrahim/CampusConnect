require("dotenv").config();

const app = require("./app");

// Connect to database
require("./config/db");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});