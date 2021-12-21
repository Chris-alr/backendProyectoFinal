// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT // 5000;

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('uploads'));

//conectar con base de datos

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,

}).then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.log(err));
//prefijos de rutas

app.use("/api/post", require("./routes/routes"));
app.use("/api/user", require("./routes/routesUser"));
//start server
app.listen(port, () => console.log('Servidor corriendo en http://localhost:'+port));