const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const App = require("./src/config/firebase-config");
const middleware = require("./src/middleware");
const routes = require("./src/routes/userRout");

const port = process.env.PORT||8080
const app = express();

app.use(bodyparser.json())
app.use(express.json())
app.use(cors())
app.use(routes)



app.listen(port,()=>console.log(`app listening on port :: ${port}`))