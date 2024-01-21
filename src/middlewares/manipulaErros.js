import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroRequisicao from "../erros/ErroRequisicao.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import ErroPag from "../erros/ErroPag.js";

// eslint-disable-next-line no-unused-vars
function manipulaErros(erro, req, res, next) {
  console.log(erro);
  //res.status(500).send({message: "Erro interno do servidor"});
  if (erro instanceof mongoose.Error.CastError) {
    //res.status(400).send({message: {message: "Dados fornecidos são inválidos"}});
    new ErroRequisicao().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    //console.log(erro.errors);
    // const mensagemErro = Object.values(erro.errors)
    //   .map(erro => erro.message)
    //   .join("; ");
    //res.status(400).send({message: `Erro(s) encontrado(s): ${mensagemErro}`});
    new ErroValidacao(erro).enviarResposta(res);
  } else if(erro instanceof ErroPag) {
    erro.enviarResposta(res);
  } else {
    //res.status(500).send({message: `${erro.message} - Erro interno de servidor`});
    new ErroBase().enviarResposta(res);
  }
}
export default manipulaErros;