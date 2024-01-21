//import mongoose from "mongoose";
import express from "express";
import conectaDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipulaErros from "./middlewares/manipulaErros.js";
import manipulaErro404 from "./middlewares/manipulaErro404.js";
//import livro from "./models/livro.js"; substituido pelo src/routes/index.js

const conexao = await conectaDB();

conexao.on("error", (erro) => {
  console.error("erro de conexao", erro);
});

conexao.once("open", () => {
  console.log("Conexao bem sucedida");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulaErro404);

// eslint-disable-next-line no-unused-vars
app.use(manipulaErros);
//app.use((erro, req, res, next) => {
//res.status(500).send({message: "Erro interno do servidor"});
// if (erro instanceof mongoose.Error.CastError) {
//   res.status(400).json({message: {message: "Dados fornecidos são inválidos"}});
// } else {
//   res.status(500).json({message: `${erro.message} - Erro interno de servidor`});
// }
//});

export default app;
//app.use(express.json());


// ***** substituídos pelo banco mongodb
//const livros = [
//    {
//        id: 1,
//        titulo: "O Senhor dos Anéis"
//    },
//    {
//        id: 2,
//        titulo: "O Hobbit"
//    }
//];//
//function buscaLivro(id) {
//    return livros.findIndex(livro => {
//        return livro.id === Number(id);
//    });
//}; 

//app.get("/", (req, res) => {
//    res.status(200).send("Curso de Node.js");
//}); substituído pelo src/routes/index.js

//app.get("/livros", async (req, res) => {
//    const listaLivros = await livro.find({});
//    res.status(200).json(listaLivros);
//});  substituído pelo livroController (controllers)

//app.get("/livros/:id", (req, res) => {
//    const index = buscaLivro(req.params.id);
//    res.status(200).json(livros[index]);
//});
//
//app.put("/livros/:id", (req, res) => {
//    const index = buscaLivro(req.params.id);
//    livros[index].titulo = req.body.titulo;
//    res.status(200).json(livros);
//});
//
//app.post("/livros", (req, res)=> {
//    livros.push(req.body);
//    res.status(201).send("livro cadastrado com sucesso");
//}); substituídos pelo controller

//app.delete("/livros/:id", (req, res) => {
//    const index = buscaLivro(req.params.id);
//    livros.splice(index, 1);
//    res.status(200).send("livro deletado com sucesso");
//});



