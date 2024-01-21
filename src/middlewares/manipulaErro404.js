import ErroPag from "../erros/ErroPag.js";

function manipulaErro404(req, res, next) {
  //res.status(404).send({messagem: "Página não encontrada"});
  const erro404 = new ErroPag();
  next(erro404);

}

export default manipulaErro404;