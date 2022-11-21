import axios from "axios";

export default class PalavraService {

  getPalavras() {
    return axios.get('http://localhost:8081/search/palavras')
      .then((response) => {
        if (response.data) {
          return response.data.map(linha => ({
            ...linha,
            aprovada: linha.aprovada ? 'sim' : 'não'
          }));
        } else {
          return [];
        }
      })
  }

}
