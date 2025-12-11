import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { perguntarIA} from "./services/IAService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/duelo/enviar", async (req, res) => {
  try {
    const { mensagem } = req.body;

    const respostaIA = await perguntarIA(mensagem);

    return res.json({
      resposta: respostaIA,
    });

  } catch (error) {
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));