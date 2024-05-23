const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(bodyParser.json());



const setupProductRoutes = require("./products");
const setupIndexRoutes = require("./index");
const setupMyClubsRoutes = require("./myclubs");
const setupCartRoutes = require("./cart")
const setupUserRoutes = require("./user")


setupProductRoutes(app);
setupIndexRoutes(app);
setupMyClubsRoutes(app)
setupCartRoutes(app)
setupUserRoutes(app)


const port = 8081;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
