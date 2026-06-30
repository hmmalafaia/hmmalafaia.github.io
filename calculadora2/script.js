// Suas funções originais de cálculo e API
function buscaPreco() {
    // Sua lógica do CoinGecko aqui...
    // Mock inicial para visualização do layout:
    document.getElementById('btcUsd').value = "$ 65,000.00";
    document.getElementById('btcBrl').value = "R$ 325,000.00";
    document.getElementById('inputUSD').value = "R$ 5.00";
}

function converter(origem) {
    // Sua lógica de cálculo entre SATS, BTC, BRL e USD aqui...
}

// -----------------------------------------------------
// INICIALIZAÇÃO DOS GRÁFICOS MOCKADOS (CHART.JS)
// -----------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Gráfico de Diferença de Preço (Dia, Semana, Mês, YoY)
    const ctxDiff = document.getElementById('chartPriceDiff').getContext('2d');
    new Chart(ctxDiff, {
        type: 'bar',
        data: {
            labels: ['Dia', 'Semana', 'Mês', 'YoY'],
            datasets: [{
                label: 'Variação (%)',
                data: [1.2, -3.5, 12.4, 145.8],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Verde (Positivo)
                    'rgba(255, 99, 132, 0.6)', // Vermelho (Negativo)
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: { responsive: true }
    });

    // 2. Gráfico de Variação Diária (Linha - Mock de 24h)
    const ctxDaily = document.getElementById('chartDailyVar').getContext('2d');
    new Chart(ctxDaily, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Preço BTC (USD)',
                data: [64000, 64200, 63800, 64500, 64900, 65000],
                fill: false,
                borderColor: '#f7931a',
                tension: 0.1
            }]
        },
        options: { responsive: true }
    });

    // 3. Gráfico de Volume Transacional (Barras)
    const ctxVolume = document.getElementById('chartVolume').getContext('2d');
    new Chart(ctxVolume, {
        type: 'bar',
        data: {
            labels: ['Diário', 'Semanal', 'Mensal', 'YoY'],
            datasets: [{
                label: 'Volume (Bilhões USD)',
                data: [35, 210, 950, 12000],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: { responsive: true }
    });
});
