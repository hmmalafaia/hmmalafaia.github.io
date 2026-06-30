// Exemplo de configuração aplicada a um dos seus gráficos
new Chart(ctxDiff, {
    type: 'bar',
    data: { /* Seus dados mockados */ },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Permite que o gráfico preencha o container flexível
        plugins: {
            legend: { display: false } // Ocultar legendas longas economiza espaço vertical
        }
    }
});
