/* Para seguir mejores prácticas en JS */
"use strict";
// Importar mongoose
var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;
// Desactivar la forma de trabajar antigua

mongoose.set("useFindAndModify", false);
// Promesas para que todo funcione mejor

mongoose.Promise = global.Promise;
// El userNewUrlParser para utilizar las nuevas funciones de Mongoose

mongoose
  .connect("mongodb://localhost:27017/api_rest_blog", { useNewUrlParser: true })
  .then(() => {
    console.log("La conexión a la BBDD se ha hecho bien.");
    // Crear servidor y ponerme a escuchar peticiones http
    app.listen(port, () => {
      console.log("Servidor corriendo en http://localhost:" + port);
    });
  });
