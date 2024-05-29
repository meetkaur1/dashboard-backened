const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectdb");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");

app.use(cors());
// JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
app.use(bodyParser.urlencoded({ extended: true }));
// Database Connection
connectDb(DATABASE_URL);
// Load Routes
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listning at http://localhost:${port}`);
});
