const express = require("express");
const app = express();
const cors =  require('cors')

var db = require("./src/config/DB");
const route = require("./src/router");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors())
//Connect DB
db.Connect();

//use Router
route(app);

//Port
const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
