const searchInput = document.getElementById('search');
const glossary = document.getElementById('glossary');

const terms = [
    { term: ' 	1.  Custódia	', definition: '	 A palavra custódia significa a guarda, a proteção ou a responsabilidade por algo ou alguém. O termo possui significados diferentes dependendo da área em que é usado: no mercado financeiro, no direito ou em questões familiares. 	' } ,
    { term: ' 	2.  Autocustódia	', definition: '	 O modelo onde o próprio usuário gera e guarda a sua chave privada, possuindo controle total do saldo na rede sem depender de permissão de terceiros. 	' } ,
    { term: ' 	3.  Chave Privada	', definition: '	 Um número inteiro muito grande de 128 ou 256 bits gerado pelo usuário. É o segredo matemático que consegue assinar uma transação e provar a propriedade dos bitcoins. 	' } ,
    { term: ' 	4.  Carteira Quente (hot wallet)	', definition: '	 Um aplicativo fácil de usar onde a chave é do usuário ou de um terceiro, porém conectada à internet. Ideal para valores pequenos e uso no dia a dia. 	' } ,
    { term: ' 	5.  Carteira Fria (cold wallet)	', definition: '	 O degrau mais importante da jornada de segurança, onde a chave do usuário é guardada fisicamente fora da internet para máxima proteção. 	' } ,
    { term: ' 	6.  Multisig	', definition: '	 Um formato de cofre que exige múltiplas chaves (ex: 2 de 3 chaves) para assinar uma transação na mesma carteira, exigindo mais experiência. 	' } ,
    { term: ' 	7.  Seed Phrase (Frase Mnemônica)	', definition: '	 Uma lista fechada de 12 ou 24 palavras (padrão BIP39) que os humanos conseguem copiar. Elas guardam o número aleatório que dá origem à chave privada e a todos os endereços da carteira. 	' } ,
    { term: ' 	8.  Entropia	', definition: '	 A medida, em bits, do quão aleatória e imprevisível de verdade é a sua chave. São necessários 128 bits para 12 palavras e 256 bits para 24 palavras. 	' } ,
    { term: ' 	9.  Passphrase	', definition: '	 Uma 13ª ou 25ª palavra extra que funciona como camada de segurança. Ela não faz parte da sua seed original e cria uma carteira completamente diferente a partir das mesmas palavras base. 	' } ,
    { term: ' 	10. Dispositivo de assinatura (Hardware) AirGapped	', definition: '	 Equipamentos (como Coldcard, Krux ou Jade) onde a chave nasce (ideal ser inserida), vive e assina transações sem nunca tocar em um computador conectado à internet. 	' } ,
    { term: ' 	11. UTXO	', definition: '	 Unspent Transaction Output. São as moedas reais e individuais que o usuário tem na rede. A carteira não guarda um saldo unificado, mas sim a soma desses UTXOs. 	' } ,
    { term: ' 	12. Mempool	', definition: '	 A fila de espera da rede Bitcoin. Quando está cheia, quem paga mais passa na frente para ter sua transação processada e confirmada. 	' } ,
    { term: ' 	13. Taxa (sat/vB)	', definition: '	 O custo em satoshis por byte virtual pago por espaço no bloco (para os mineradores). Não é calculado com base no valor da transferência, mas no tamanho do arquivo da transação. 	' } ,
    { term: ' 	14. PSBT	', definition: '	 Partially Signed Bitcoin Transaction. Um formato de arquivo que permite que a transação viaje entre um computador online e o dispositivo offline para ser assinada sem expor a chave privada. 	' } ,
    { term: ' 	15. Coin Control	', definition: '	 A prática manual de etiquetar origens e escolher exatamente quais UTXOs (moedas) gastar numa transação, evitando misturá-las e protegendo o histórico e a privacidade do usuário. 	' } ,
    { term: ' 	16. Xpub	', definition: '	 A chave pública da carteira. Se compartilhada publicamente ou vazada, permite que qualquer pessoa veja todo o histórico e o saldo da carteira, mas não permite gastar as moedas. 	' }];

// Função para criar um elemento de termo
function createTermElement(term) {
  const termElement = document.createElement('div');
  termElement.classList.add('term');

  const termTitle = document.createElement('h3');
  termTitle.textContent = term.term;

  const termDefinition = document.createElement('p');
  termDefinition.textContent = term.definition;

  termElement.appendChild(termTitle);
  termElement.appendChild(termDefinition);

  return termElement;
}

// Função para filtrar e exibir os termos
function filterTerms() {
  const searchTerm = searchInput.value.toLowerCase();
  glossary.innerHTML = '';

  terms.forEach(term => {
    if (term.term.toLowerCase().includes(searchTerm)) {
      glossary.appendChild(createTermElement(term));
    }
  });
}

// Adiciona os termos iniciais ao glossário
terms.forEach(term => {
  glossary.appendChild(createTermElement(term));
});

// Escuta o evento de input no campo de pesquisa
searchInput.addEventListener('input', filterTerms);