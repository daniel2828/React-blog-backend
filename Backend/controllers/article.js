"use strict";

var validator = require("validator");
var Article = require("../models/article");
// FS
var fs = require("fs");
var path = require("path");

// Controlador de rutas para hacer las operaciones
var controller = {
  datosCurso: (req, res) => {
    console.log("Hola mundo");
    return res.status(200).send({
      name: "daniel",
      surname: "tendero garcía",
    });
  },
  test: (req, res) => {
    return res.status(200).send({
      message: "Metodo test del article controller",
    });
  },
  save: (req, res) => {
    //Recoger parametros por post
    var params = req.body;
    let validate_title;
    let validate_content;
    console.log(params);
    // Validar datos (validator)
    try {
      validate_title = !validator.isEmpty(params.title);
      validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(500).send({
        status: "error",
        message: "Faltan datos por enviar!!",
      });
    }
    if (validate_title && validate_content) {
      // Crear el objeto a guardar
      var article = new Article();
      // Asignar valores al objeto

      article.title = params.title;
      article.content = params.content;
      article.image = null;
      // Guardar el artículo
      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(404).send({
            status: "error",
            message: "El artículo no se ha guardado",
          });
        }
        return res.status(200).send({ status: "success", article: article });
      });
      // Devolver una respuesta
    } else {
      return res.status(500).send({
        status: "error",
        message: "Faltan datos por enviar!!",
      });
    }
  },
  getArticles: (req, res) => {
    // Find de datos de mongo
    var query = Article.find();
    var last = req.params.last;
    if (last || last != undefined) {
      query.limit(5);
    }
    console.log(last);
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al devolver los articulos",
        });
      } else if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "No hay articulos para mostrar",
        });
      } else {
        return res.status(200).send({ status: "success", articles });
      }
    });
  },
  getArticle: (req, res) => {
    // Recoger el ID de la URL
    var articleID = req.params.id;
    // Comprobar que existe
    if (!articleID || articleID == null) {
      return res.status(404).send({
        status: "error",
        message: "No hay articulos para mostrar",
      });
    }
    // Buscar el artículo
    Article.findById(articleID, (err, article) => {
      if (err || !article) {
        return res.status(404).send({
          status: "error",
          message: "Artículo no encontrado",
        });
      } else {
        return res.status(200).send({
          status: "success",
          article,
        });
      }
    });
    // Devolver en JSON
  },
  update: (req, res) => {
    // Recoger el id del artículo por la url
    var articleID = req.params.id;

    // Recoger los datos que llegan por put
    var params = req.body;
    // Validar datos
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
      if (validate_content && validate_title) {
        // Find and update
        Article.findOneAndUpdate(
          { _id: articleID },
          params,
          { new: true },
          (err, articleUpdated) => {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error al actualizar",
              });
            } else if (!articleUpdated) {
              return res.status(404).send({
                status: "error",
                message: "Articulo no actualizado",
              });
            } else {
              return res.status(200).send({
                status: "success",
                message: "Articulo actualizado",
              });
            }
          }
        );
      } else {
        return res.status(404).send({
          status: "error",
          message: "La validacion no es correcta",
        });
      }
    } catch (err) {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
  },
  delete: (req, res) => {
    // Recoger el ID de la URL
    var articleID = req.params.id;
    // Find and delete
    Article.findOneAndDelete({ _id: articleID }, (err, articleRemoved) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error al borrar",
        });
      } else if (!articleRemoved) {
        return res.status(404).send({
          status: "error",
          message: "No se ha borrado el artículo, posiblemente no exista.",
        });
      } else {
        return res.status(200).send({
          status: "success",
          articleRemoved,
        });
      }
    });
  },
  upload: (req, res) => {
    // Configurar modulo connect multiparty router/article.js

    // Recoger el fichero de la petición
    var file_name = "Imagen no subida...";
    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }
    // Conseguir el nombre y la extensión del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split("\\");
    /* EN LINUX O MAC EN LUGAR DE \\habria que usar "/" */
    // file_path.split("/");

    // Nombre del archivo
    var file_name = file_split[2];

    // Extensión del fichero
    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];
    // Comprobar la extensión, solo imágenes, sies válida borrar el fichero.
    if (
      file_ext != "png" &&
      file_ext != "jpg" &&
      file_ext != "jpeg" &&
      file_ext != "gif"
    ) {
      // Borrar el archivo subido
      fs.unlink(file_path, (err) => {
        return res.status(200).send({
          status: "error",
          message: "La extensión de la imagen no es válida",
        });
      });
    } else {
      // Si todo es válido
      var articleID = req.params.id;
      // Bucar articulo, asignarle el nombre de la imagen y actualizarlo
      Article.findOneAndUpdate(
        { _id: articleID },
        { image: file_name },
        { new: true },
        (err, articleUpdated) => {
          if (err || !articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "Imagen de artículo no actualizada",
            });
          } else {
            return res.status(200).send({
              status: "success",
              fichero: file_split,
              file_ext,
            });
          }
        }
      );
    }
  },
  getImage: (req, res) => {
    var file = req.params.image;
    var path_file = "./upload/articles/" + file;
    fs.exists(path_file, (exists) => {
      console.log(exists);
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({
          status: "error",
          message: "La imagen no existe!!!",
        });
      }
    });
  },
  search: (req, res) => {
    // Sacar el string a buscar
    var searchString = req.params.search;
    Article.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        console.log(err);
        if (err || !articles) {
          return res.status(404).send({
            status: "error",
            message: "Error en la petición",
            searchString,
          });
        } else {
          return res.status(200).send({
            status: "success",
            articles,
          });
        }
      });
    // Find or
  },
};

module.exports = controller;
