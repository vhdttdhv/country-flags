const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/feedbackdb");

const feedbackSchema = new mongoose.Schema({
  text: String,
});
const Feedback = mongoose.model("feedback", feedbackSchema);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  async function all() {
    return await Feedback.find();
  }

  all().then((docs) => {
    res.set("Content-Type", "text/html");
    docs.forEach((doc) => res.write(`<p>${doc.text} <p/>`));
    res.end();
  });
});

app.post("/", (req, res) => {
  const feed = new Feedback({
    text: `${req.body.feedback}`,
  });
  feed.save((err) => {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
  });
  res.send("Saved to feedbacks collection");
});

app.listen(3001, () => {
  console.log("port 3001 up and running!");
});
