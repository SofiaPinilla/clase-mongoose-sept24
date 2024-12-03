const express = require("express");
const app = express();
require("dotenv").config()//para poder usar las variables de entorno
const PORT = process.env.PORT || 3000;
const { dbConnection } = require("./config/config")

app.use(express.json())

app.use("/products",require("./routes/products"))
app.use("/users",require("./routes/users"))
app.use("/orders",require("./routes/orders"))

dbConnection()

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
