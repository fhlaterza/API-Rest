import express from "express";
import AutorController from "../controllers/autorController.js";
import paginacao from "../middlewares/paginacao.js";

const routes = express.Router();

//CRUD
routes
  .get("/autores",AutorController.listarAutores, paginacao)
  .get("/autores/:id",AutorController.listarAutorPorId)
  .post("/autores",AutorController.addAutor)
  .put("/autores/:id",AutorController.atualizarAutor)
  .delete("/autores/:id",AutorController.excluirAutor);


export default routes;