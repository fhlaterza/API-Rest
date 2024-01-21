//import http from "http"; foi substituída pelo app.js
import "dotenv/config";
import app from "./src/app.js";


const PORT= 3000;

//const rotas = {
////    "/": "Curso de Node.js",
////    "/livros": "Rota Livros",
//    "/autores": "Rota Autores"
//};

//const server = http.createServer((req, res) => {
//    res.writeHead(200, {"Content-Type": "text/plain"});
//    res.end(rotas[req.url]);
//});   também foi substituída pelo app.js

//server.listen(PORT, () => {
app.listen(PORT, () => {
  console.log("servidor escutando!");
});
