import express from "express";

const app = express();

app.listen(3000, () => console.log("Running on port 3000"));

app.use("/test", (req, res) => {
  res.status(201).send("ok");
});
