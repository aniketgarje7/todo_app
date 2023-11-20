const express = require("express");
const userRoutes = require("./routes/user");
const listRoutes = require("./routes/list");
const taskRoutes = require("./routes/task");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
const PORT = process.env.PORT;
const CORS = process.env.CORS_URL;

app.use(
  cors({
    origin: CORS,
  })
);

// db
const db = require("./models/index");

// routes
app.use("/user", userRoutes);
app.use("/list", listRoutes);
app.use("/task", taskRoutes);


app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
