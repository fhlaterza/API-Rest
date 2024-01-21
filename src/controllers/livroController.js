import {livro} from "../models/index.js";
import {autor} from "../models/index.js";
import ErroPag from "../erros/ErroPag.js";
//import ErroRequisicao from "../erros/ErroRequisicao.js";

class LivroController {
  static async listarLivros (req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
      // let {limite=5, pagina=1, ordenacao= "_id: -1"} = req.query;
      // let [campoOrdenacao, ordem]= ordenacao.split(":");
      // limite = parseInt(limite);
      // pagina = parseInt(pagina);
      // ordem = parseInt(ordem);
      // if (limite>0 && pagina >0) {
      //   const listaLivros = await livro.find()
      //     .sort({[campoOrdenacao]: ordem})
      //     .skip((pagina-1)*limite)
      //     .limit(limite)
      //     .populate("autor")
      //     .exec();
      //   res.status(200).json(listaLivros);
      // } else{
      //   next(new ErroRequisicao());
      // }
    } catch (erro) {
      next(erro);
      //res.status(500).json({message: `${erro.message} - falha na requisição`});
    }
  }

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id) //(id, {}, {autopoulate:false});desabilitar autopopulate
        .exec();
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        //res.status(404).json({message: "ID do livro não encontrado"});
        next(new ErroPag("Id do livro não encontrado"));
      }
    } catch (erro) {
      //res.status(500).json({message: `${erro.message} - falha na requisição do livro`});
      next(erro);
    }
  }

  static async addLivro (req, res, next) {
    const novoLivro = req.body;  //adicionado para poder incluir autor
    try { 
      //const novoLivro = await livro.create(req.body); - substituído para poder add autor
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {...novoLivro, autor: { ...autorEncontrado._doc } };
      // eslint-disable-next-line no-unused-vars
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({message: "Livro adicionado com sucesso", livro: novoLivro  });
    } catch (erro) {
      next(erro);
      //res.status(500).json({message: `${erro.message} - falha ao add livro`});
    }  

  }

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado=await livro.findByIdAndUpdate(id, req.body);
      if (livroEncontrado !==null){
        res.status(200).json({message: "livro atualizado com sucesso"});
      } else {
        next(new ErroPag("Id do livro não encontrado"));
      }
    } catch (erro) {
      //res.status(500).json({message: `${erro.message} - falha na atualização do livro`});
      next(erro);
    }
  }

  static async excluirLivro (req, res,next) {
    try {
      const id = req.params.id;
      const livroEncontrado= await livro.findByIdAndDelete(id);
      if (livroEncontrado !==null){
        res.status(200).json({message: "livro excluído com sucesso"});
      } else {
        next(new ErroPag("Id do livro não encontrado"));
      }
    } catch (erro) {
      //res.status(500).json({message: `${erro.message} - falha na exclusão do livro`});
      next(erro);
    }
  }


  static async listarLivrosPorFiltro (req, res, next) {
    try { 
      const busca = await processaBusca(req.query);
      
      if (busca !== null) {
        const livrosPorFiltro = livro
          .find(busca)
          .populate("autor");
        req.resultado = livrosPorFiltro;
        //res.status(200).send(livrosPorFiltro);
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }  
  }
}

async function processaBusca(parametros) {
  const {editora, titulo, minPag, maxPag, nomeAutor} = parametros;

  //const regex = new RegExp(titulo, "i"); //modelo feito pelo java Script
  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};   //solução do mongodb - operador de busca 
  //if (titulo) busca.titulo = regex;  //modelo Java Script

  if (minPag || maxPag) busca.paginas = {};
  //gte = greater than or equal = maior ou igual que
  //if (minPag) busca.paginas = {$gte: minPag};  //formato normal mas não usual pois min e mx usam o mesmo nome de variavel
  if (minPag) busca.paginas.$gte = minPag;
  //lte = less than or equal = menor ou igual que
  if (maxPag) busca.paginas.$lte = maxPag;

  if (nomeAutor) {
    const nAutor = await autor.findOne({nome: nomeAutor});
    if (nAutor !== null) {
      busca.autor= nAutor._id;
      //console.log(`busca.autor=${busca.autor}`);
    } else {
      busca = null;
    }
  }
  return busca;
}


 

// static async listarLivrosPorEditora (req, res, next) {
//   const editora = req.query.editora;
//   try {
//     const livrosPorEditora = await livro.find({editora: editora}); //se for o mesmo nome do campo,  poderia ficar apenas ...find({editora})
//     res.status(200).json(livrosPorEditora);
//   } catch (erro) {
//     //res.status(500).json({message: `${erro.message} - falha na busca por editora`});
//     next(erro);
//   }
// }

export default LivroController;