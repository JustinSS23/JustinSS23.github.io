document.addEventListener('DOMContentLoaded', function () {
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const playerData = data.split('\n').slice(1).map(entry => entry.trim());

            const playerNames = playerData.map(entry => entry.split(',')[0]);
            const playerPoints = playerData.map(entry => parseFloat(entry.split(',')[1]));
            const playerEFF = playerData.map(entry => parseFloat(entry.split(',')[3]));
            const playerGP = playerData.map(entry => parseFloat(entry.split(',')[1]));

            // Bar Chart
            const barCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: playerNames,
                    datasets: [{
                        label: 'Points',
                        data: playerPoints,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Scatter Chart
            const scatterCtx = document.getElementById('scatterChart').getContext('2d');
            const scatterData = playerEFF.map((name, index) => ({
                x: index,
                y: playerEFF[index]
            }));

            new Chart(scatterCtx, {
                type: 'scatter',
                data: {
                    labels: playerNames,
                    datasets: [{
                        label: 'Efficiency',
                        data: scatterData,
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
