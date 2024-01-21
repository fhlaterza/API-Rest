import mongoose from "mongoose";
import { autorSchema } from "./autor.js";

const livroSchema= new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  titulo: {
    type: String, 
    required: [true, "O título do livro é obrigatório"]},
  editora:{
    type: String,
    required: [true, "Necessário informar a Editora"],
    enum: {
      values: ["Alura", "Laterza"],
      message: "A Editora {VALUE} não está relacionada para ser gravada"
    }
  },
  preco: {type: Number},
  paginas: {
    type: Number,
    // min: [10,"O número de páginas deve estar entre 10 e 5000. Valor informado {VALUE}"],
    // max: [5000,"O número de páginas deve estar entre 10 e 5000.Valor informado {VALUE}"] 
    validate: {
      validator: (valor) => {
        return valor >=10 && valor <=5000;
      }, 
      message: "O número de página deve estar entre 10 e 5000. Valor informado {VALUE}"
    }
  },
  autor: autorSchema
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export {livro};
