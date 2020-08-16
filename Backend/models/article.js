const { use } = require("../app");

("use strict");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleSchema = Schema({
  title: String,
  content: String,
  // Meter más de un parametro
  date: { type: Date, default: Date.now },
  image: String,
});

// Creo el modelo y lo exporto
module.exports = mongoose.model("Article", ArticleSchema);
// Articles --> guarda documentos de este tipo y con esta estructura dentro de la colección.
