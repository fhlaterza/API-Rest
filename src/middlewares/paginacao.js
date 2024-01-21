import ErroRequisicao from "../erros/ErroRequisicao.js";

async function paginacao(req, res, next) {
  try {
    let {limite=5, pagina=1, ordenacao= "_id: -1"} = req.query;
    let [campoOrdenacao, ordem]= ordenacao.split(":");
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite>0 && pagina >0) {
      const listaLivrosPaginado = await resultado.find()
        .sort({[campoOrdenacao]: ordem})
        .skip((pagina-1)*limite)
        .limit(limite)
        .exec();
      res.status(200).json(listaLivrosPaginado);
    } else{
      next(new ErroRequisicao());
    }
  } catch (erro) {
    next(erro);
  }  
}

export default paginacao;