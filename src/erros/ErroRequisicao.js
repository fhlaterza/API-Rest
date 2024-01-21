import ErroBase from "./ErroBase.js";

class ErroRequisicao extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}

export default ErroRequisicao;