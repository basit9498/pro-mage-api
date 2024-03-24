const ErrorMiddleware = require("./middlewares/errorMiddleware");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("public"));

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("access denied");
});

app.use(process.env.API_VERSION, require("./routes/index"));

// // Error Middleware
app.use(ErrorMiddleware);

app.use("*", (req, res, next) => {
  res.status(404).send("Not Found !!!!");
});

require("./db/connection");
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
