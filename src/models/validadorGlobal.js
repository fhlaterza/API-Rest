import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor.trim() !== "", 
  message: ({path}) => `Campo (${path}) com valor vazio, não foi aceito`
});
