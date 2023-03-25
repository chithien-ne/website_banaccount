const express = require("express");
const app = express();
const cors = require("cors");

var corsOptions = {
    origin: "{http://localhost:8081}"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const swagger = require("./swagger");
//connect to db
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//Routes test port
// app.get("/", (req,res) => {
//     res.json({message: "Hello World"});
// });

//swagger(app);

require("./app/routes/game.routes")(app);
require("./app/routes/account.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`);
});