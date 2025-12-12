import api from "./api";

export async function enviarMensagemParaIA(mensagem) {
  try {
    const resposta = await api.post("/duelo/enviar", { mensagem });
    return resposta.data.resposta;
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return "Erro ao conectar com a IA.";
  }
}
