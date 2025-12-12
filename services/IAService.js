import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function perguntarIA(mensagem) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Responda de forma clara e objetiva." },
          { role: "user", content: mensagem } // corrigido
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Erro ao chamar a IA:", error.response?.data || error);
    return "Erro ao processar sua solicitação.";
  }
}
