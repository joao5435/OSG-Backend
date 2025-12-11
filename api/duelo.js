// /api/duelo.js
import { perguntarIA } from "../services/IAService.js";

export default async function handler(req, res) {
  // Vercel Functions recebem req e res diretamente
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { mensagem } = req.body;
    if (!mensagem) {
      return res.status(400).json({ error: "Mensagem não enviada" });
    }

    const respostaIA = await perguntarIA(mensagem);

    return res.status(200).json({ resposta: respostaIA });

  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}
