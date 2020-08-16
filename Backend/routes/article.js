"use strict";
var express = require("express");
var ArticleController = require("../controllers/article");

// Router de express
var router = express.Router();

// Multiparty
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./upload/articles" });

// POST
router.post("/datos-curso", ArticleController.datosCurso);
router.post("/save", ArticleController.save);
router.post("/upload-image/:id", md_upload, ArticleController.upload);
// GET
router.get("/test-de-controlador", ArticleController.test);
router.get("/articles/:last?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticle);
router.get("/get-image/:image", ArticleController.getImage);
router.get("/search/:search", ArticleController.search);
// PUT
router.put("/update/:id", ArticleController.update);
// DELETE
router.delete("/delete/:id", ArticleController.delete);
module.exports = router;
