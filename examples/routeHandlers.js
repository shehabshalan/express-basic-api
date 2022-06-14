// route handlers

app.get(
  "/hello",
  (req, res, next) => {
    console.log("we will server new page next");
    next();
  },
  (req, res) => {
    res.send("Hello World");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("done");
};

app.get("/chain", [one, two, three]);
