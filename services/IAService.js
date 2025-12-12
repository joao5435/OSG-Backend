// backend-proxy/services/IAService.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function perguntarIA(mensagem) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini", // modelo válido
        messages: [
          { role: "system", content: "Responda de forma clara e objetiva." },
          { role: "user", content: mensagem }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000 // 15s de timeout para não travar
      }
    );

    if (!response.data || !response.data.choices) {
      console.error("Resposta inesperada da API:", response.data);
      return "Erro ao processar sua solicitação.";
    }

    return response.data.choices[0].message.content;

  } catch (error) {
    if (error.response) {
      // Resposta recebida mas com erro (ex.: 401, 400)
      console.error("Erro da API OpenRouter:", error.response.status, error.response.data);
    } else if (error.request) {
      // Requisição feita, mas sem resposta
      console.error("Nenhuma resposta recebida da API:", error.request);
    } else {
      // Outro erro
      console.error("Erro configurando a requisição:", error.message);
    }
   return error.response?.data || error.message || "Erro desconhecido";
  }
}
