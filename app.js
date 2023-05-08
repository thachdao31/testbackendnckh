const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

mongoose.set('strictQuery', false);

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

const userRoutes = require("./routes/user.routes");
const classRoutes = require("./routes/class.routes");
const facultyRoutes = require("./routes/faculty.routes");
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");

app.use("/api/users", userRoutes);
app.use("/api/class", classRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("app running in port " + port));
