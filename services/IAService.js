// backend-proxy/services/IAService.js
import axios from "axios";
import dotenv from "dotenv";

// Carrega variáveis de ambiente (apenas localmente)
dotenv.config();

// Pega a chave da variável de ambiente
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Função principal para enviar mensagem à IA
export async function perguntarIA(mensagem) {
  // Verifica se a chave foi definida
  if (!OPENROUTER_API_KEY) {
    console.error("Erro: OPENROUTER_API_KEY não definida. Configure no Vercel ou no .env local.");
    return "Erro ao processar sua solicitação: chave de API ausente.";
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",
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
        timeout: 15000 // 15 segundos
      }
    );

    // Checa se a resposta da API está no formato esperado
    if (!response.data || !response.data.choices || !response.data.choices[0]?.message?.content) {
      console.error("Resposta inesperada da API:", response.data);
      return "Erro ao processar sua solicitação: resposta inesperada da IA.";
    }

    return response.data.choices[0].message.content;

  } catch (error) {
    if (error.response) {
      // Resposta recebida mas com erro (ex.: 401, 400)
      console.error("Erro da API OpenRouter:", error.response.status, error.response.data);
      return `Erro ao processar sua solicitação: ${error.response.data?.error?.message || "Erro de API"}`;
    } else if (error.request) {
      // Requisição feita, mas sem resposta
      console.error("Nenhuma resposta recebida da API:", error.request);
      return "Erro ao processar sua solicitação: sem resposta da API.";
    } else {
      // Outro erro
      console.error("Erro configurando a requisição:", error.message);
      return `Erro ao processar sua solicitação: ${error.message}`;
    }
  }
}
