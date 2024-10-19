async function buscaPreco() {
    const btcBrl = document.getElementById('btcBrl');
    const btcUsdInput = document.getElementById('inputUSD');

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl,usd');
        const data = await response.json();
        const bitcoinPriceBRL
            = data.bitcoin.brl;

        const bitcoinPriceUSD
            = data.bitcoin.usd;


        btcBrlValue = bitcoinPriceBRL;
        btcBrl.value = btcBrlValue;
        btcBrl.disabled = true;

        btcUsdValue = bitcoinPriceUSD;
        btcUsd.value = btcUsdValue;
        btcUsd.disabled = true;




    } catch (error) {
        console.error('Error fetching Bitcoin price in BRL:', error);
        btcBrl.value = -1;
        btcUsdInput.value = -1;

    }

    try {
        setTimeout(function () {
        }, 1500);
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=brl');
        const data = await response.json();
        const BRLusdPrice
            = data.usd.brl;

        btcUsdInput.value = BRLusdPrice;
        btcUsdInput.disabled = true;


    } catch (error) {
        console.error('Error fetching Bitcoin price in BRL:', error);
        labelElement.value = -1;

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

    if (campo === 'satoshis') {
        const bitcoin = satoshisInput.value / 100000000;
        bitcoinInput.value = bitcoin.toFixed(8);
        brlInput.value = (btcBrl.value * bitcoinInput.value).toFixed(2);
        usdInput.value = (brlInput.value / usd.value).toFixed(2);

    } else if (campo === 'bitcoin') {
        const bitcoin = parseFloat(bitcoinInput.value);
        const satoshis = bitcoin * satoshisPorBitcoin;
        satoshisInput.value = satoshis.toFixed(0);
        brlInput.value = (bitcoinInput.value * btcBrl.value).toFixed(2);
        usdInput.value = (brlInput.value / usd.value).toFixed(2);


    } else if (campo === 'brl') {
        bitcoinInput.value = brlInput.value / btcBrl.value;
        satoshisInput.value = (bitcoinInput.value * satoshisPorBitcoin).toFixed(0);
        usdInput.value = (brlInput.value / usd.value).toFixed(2);


    } else if (campo === 'usd') {
        bitcoinInput.value = usdInput.value / ((btcBrl.value / usd.value));
        satoshisInput.value = (bitcoinInput.value * satoshisPorBitcoin).toFixed(0);
        brlInput.value = (bitcoinInput.value * btcBrl.value).toFixed(2);
    }


}