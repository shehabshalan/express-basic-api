const express = require("express");
const path = require("path");
const app = express();
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHanlder = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3000;

// ** MIDDLEWARE **
app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// ** STATIC WEBPAGE SERVER **
app.use("/", require("./routes/root"));

///  REST API
app.use("/employees", require("./routes/api/employees"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.get("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.send({ error: "40 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

// ** ERROR HANDLER MIDDLEWARE **
app.use(errorHanlder);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
