import express from "express";
import LivroController from "../controllers/livroController.js";
import paginacao from "../middlewares/paginacao.js";

const routes = express.Router();

//CRUD
routes 
  .get("/livros",LivroController.listarLivros, paginacao)
  .get("/livros/busca", LivroController.listarLivrosPorFiltro, paginacao)
  .get("/livros/:id",LivroController.listarLivroPorId)
  .post("/livros",LivroController.addLivro)
  .put("/livros/:id",LivroController.atualizarLivro)
  .delete("/livros/:id",LivroController.excluirLivro);


export default routes;