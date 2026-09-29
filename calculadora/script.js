async function buscaPreco() {
    const btcBrl = document.getElementById('btcBrl');
    const btcUsdField = document.getElementById('btcUsd');
    const usdInput = document.getElementById('inputUSD');

    try {
        // Tentativa principal usando CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl,usd');
        if (!response.ok) throw new Error('Erro na resposta da CoinGecko');
        
        const data = await response.json();
        const bitcoinPriceBRL = data.bitcoin.brl;
        const bitcoinPriceUSD = data.bitcoin.usd;

        btcBrl.value = bitcoinPriceBRL;
        btcBrl.disabled = true;

        if (btcUsdField) {
            btcUsdField.value = bitcoinPriceUSD;
            btcUsdField.disabled = true;
        }

        const brlUsdRate = bitcoinPriceBRL / bitcoinPriceUSD;
        if (usdInput) {
            usdInput.value = brlUsdRate.toFixed(4);
            usdInput.disabled = true;
        }
    } catch (error) {
        console.warn('Falha na API primária, tentando fallback...', error);
        
        // Fallback alternativo caso a API principal falhe (ex: Mempool / Preço médio)
        try {
            const fallbackRes = await fetch('https://mempool.space/api/v1/pricing');
            const fallbackData = await fallbackRes.json();
            
            const bitcoinPriceUSD = fallbackData.USD;
            // Estimativa baseada em cotação de USD se necessário, ou define um valor seguro
            if (btcUsdField) btcUsdField.value = bitcoinPriceUSD;
            if (btcBrl.value <= 0 || !btcBrl.value) btcBrl.value = 450000; // Valor aproximado de segurança
            if (usdInput && !usdInput.value) usdInput.value = 5.20;
        } catch (fallbackError) {
            console.error('Erro crítico ao buscar preços:', fallbackError);
            // Garante valores padrão seguros para a calculadora não quebrar
            if (btcBrl && (!btcBrl.value || btcBrl.value == -1)) btcBrl.value = 450000;
            if (btcUsdField && (!btcUsdField.value || btcUsdField.value == -1)) btcUsdField.value = 85000;
            if (usdInput && !usdInput.value) usdInput.value = 5.20;
        }
    }
}

async function converter(campo) {
    const satoshisPorBitcoin = 100000000;
    const satoshisInput = document.getElementById('satoshis');
    const bitcoinInput = document.getElementById('bitcoin');
    const brlInput = document.getElementById('brl');
    const usdInput = document.getElementById('usd');
    const btcBrl = document.getElementById('btcBrl');
    const usd = document.getElementById('inputUSD');

    // Validação de segurança para evitar NaN se o preço estiver vazio ou zerado
    const taxaBtcBrl = parseFloat(btcBrl.value) || 0;
    const taxaUsd = parseFloat(usd.value) || 1;

    if (taxaBtcBrl <= 0) return;

    if (campo === 'satoshis') {
        const bitcoin = (parseFloat(satoshisInput.value) || 0) / satoshisPorBitcoin;
        bitcoinInput.value = bitcoin.toFixed(8);
        brlInput.value = (taxaBtcBrl * bitcoin).toFixed(2);
        usdInput.value = (brlInput.value / taxaUsd).toFixed(2);
    } else if (campo === 'bitcoin') {
        const bitcoin = parseFloat(bitcoinInput.value) || 0;
        const satoshis = bitcoin * satoshisPorBitcoin;
        satoshisInput.value = satoshis.toFixed(0);
        brlInput.value = (bitcoin * taxaBtcBrl).toFixed(2);
        usdInput.value = (brlInput.value / taxaUsd).toFixed(2);
    } else if (campo === 'brl') {
        const brl = parseFloat(brlInput.value) || 0;
        const bitcoin = brl / taxaBtcBrl;
        bitcoinInput.value = bitcoin.toFixed(8);
        satoshisInput.value = (bitcoin * satoshisPorBitcoin).toFixed(0);
        usdInput.value = (brl / taxaUsd).toFixed(2);
    } else if (campo === 'usd') {
        const valUsd = parseFloat(usdInput.value) || 0;
        const brl = valUsd * taxaUsd;
        brlInput.value = brl.toFixed(2);
        const bitcoin = brl / taxaBtcBrl;
        bitcoinInput.value = bitcoin.toFixed(8);
        satoshisInput.value = (bitcoin * satoshisPorBitcoin).toFixed(0);
    }
}

function copiarDados() {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    
    const getVal = (id) => document.getElementById(id)?.value || '0';

    const bitcoin = getVal('bitcoin').replace('.', ',');
    const satoshis = getVal('satoshis');
    const brl = getVal('brl').replace('.', ',');
    const usd = getVal('usd').replace('.', ',');
    const inputUSD = getVal('inputUSD').replace('.', ',');
    const btcUsd = getVal('btcUsd').replace('.', ',');
    const btcBrl = getVal('btcBrl').replace('.', ',');

    const textoParaCopiar = `${dataFormatada}\t${bitcoin}\t${satoshis}\t${brl}\t${usd}\t${inputUSD}\t${btcUsd}\t${btcBrl}`;

    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert("Dados copiados com sucesso!");
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Inicializa a busca de preço ao carregar o script
window.addEventListener('DOMContentLoaded', () => {
    buscaPreco();
});
