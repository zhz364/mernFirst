// mongodb+srv://dev:f1IgnyWrl6gVj2w4@cluster0.y9x0w.mongodb.net/MERNdb?retryWrites=true&w=majority


const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Wolves gravesto"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));