const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const mainRouter = require("./routes/index");

app.use(express.json());
//all request that will come here will go to main router
app.use("/api", mainRouter);

app.listen(3000);