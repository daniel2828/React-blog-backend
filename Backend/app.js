"use strict";
// Cargar modulos de node para crear servidor
var express = require("express");
var bodyParser = require("body-parser");

// Ejecutar Express
var app = express();
// Cargar ficheros rutas
var article_routes = require("./routes/article");
// Cargar Middlewares (Algo que se ejecuta antes de cargar la ruta de la aplicación)

app.use(bodyParser.urlencoded({ extended: false })); // Cargar el body parser
app.use(bodyParser.json()); // Convertir lo que venga en JSON

// CORS , permitir peticiones desde el frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Añadir prefijos a rutas / Cargar rutas
app.use("/api", article_routes);

// Rutas
/*
app.get("/probando", (req, res) => {
  console.log("Hola mundo");
  let hola = req.body.hola;
  return res.status(200).send({
    test: hola,
    name: "daniel",
    surname: "tendero garcía",
  });
});*/
// Exportar el módulo app.js

module.exports = app;
