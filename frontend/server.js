const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  console.log("sad");
  return res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () =>
  console.log("Express server is running on localhost:5000")
);
