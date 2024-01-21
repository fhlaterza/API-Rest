import ErroRequisicao from "./ErroRequisicao.js";

class ErroValidacao extends ErroRequisicao {
  constructor(erro){
    const mensagemErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");


    super(`Erro(s) encontrado(s): ${mensagemErro}`);
  }
}

export default ErroValidacao;