import { perguntarIA } from "../services/IAService.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { mensagem } = req.body;
      const respostaIA = await perguntarIA(mensagem);
      return res.status(200).json({ resposta: respostaIA });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
