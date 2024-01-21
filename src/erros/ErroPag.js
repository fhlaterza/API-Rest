import ErroBase from "./ErroBase.js";

class ErroPag extends ErroBase {
  constructor(mensagem = "Página não encontrada") {
    super(mensagem,404);
  }
}

export default ErroPag;