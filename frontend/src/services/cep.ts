/**
 * Obtém o endereço correspondente a um CEP brasileiro.
 *
 * Parâmetro: cep - String que representa o CEP, podendo conter caracteres não numéricos.
 * Retorno: Um objeto com os dados retornados pela API ViaCEP ou `null` em caso de CEP inválido,
 * erro de rede ou se o CEP não for encontrado.
 *
 * A função limpa o CEP de todos os caracteres não numéricos, valida se possui exatamente
 * 8 dígitos e faz uma requisição à API ViaCEP. Se a resposta indicar erro ou ocorrer qualquer
 * exceção, retorna `null`.
 */
export async function getAddressByCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return null;

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        return data.erro ? null : data;
    } catch {
        return null;
    }
}