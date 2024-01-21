//import mongoose from "mongoose";
import ErroPag from "../erros/ErroPag.js";
//import {autor} from "../models/autor.js";
import {autor} from "../models/index.js";

class autorController {
  static async listarAutores (req, res, next) {
    try {
      const listaAutores = autor.find({});
      req.resultado = listaAutores;
      next();
      //res.status(200).json(listaAutores);
    } catch (erro) {
      //res.status(500).json({message: `${erro.message} - falha na requisição`});
      next(erro);
    }
  }

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        //res.status(404).json({message: "ID do Autor não encontrado"});
        next(new ErroPag("Id do Autor não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async addAutor (req, res, next) {
    try { 
      const novoAutor = await autor.create(req.body);
      res.status(201).json({message: "autor adicionado com sucesso", autor: novoAutor  });
    } catch (erro) {
      //res.status(500).json({message: `${erro.message} - falha ao add autor`});
      next(erro);
    }  

  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);
      if (autorEncontrado !== null) {
        res.status(200).json({message: "Autor atualizado com sucesso"});
      } else {
        //res.status(404).json({message: "ID do Autor não encontrado"});
        next(new ErroPag("Id do Autor não encontrado"));
      }
    } catch (erro) {
      //res.status(500).json({message: `${erro.message} - falha na atualização do autor`});
      next(erro);
    }
  }

  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndDelete(id);
      if (autorEncontrado !== null) {
        res.status(200).json({message: "autor excluído com sucesso"});
      } else {
        //res.status(404).json({message: "ID do Autor não encontrado"});
        next(new ErroPag("Id do Autor não encontrado"));
      }
    } catch (erro) {
      //res.status(500).json({message: `${erro.message} - falha na exclusão do autor`});
      next(erro);
    }
  }

}

export default autorController;