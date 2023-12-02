document.addEventListener('DOMContentLoaded', function () {
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const playerData = data.split('\n').slice(1).map(entry => entry.trim());

            const playerNames = playerData.map(entry => entry.split(',')[0]);
            const playerPoints = playerData.map(entry => parseFloat(entry.split(',')[1]));
            const playerEFF = playerData.map(entry => parseFloat(entry.split(',')[3]));
            const playerPER = playerData.map(entry => parseFloat(entry.split(',')[4])).filter(val => !isNaN(val)); // Filter out invalid PER values

            // Bar Chart for Points
            const barCtx = document.getElementById('barChart').getContext('2d');
            new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: playerNames,
                    datasets: [{
                        label: 'Overall Points',
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

            // Scatter Chart for Efficiency
            const scatterCtx = document.getElementById('scatterChart').getContext('2d');
            const scatterData = playerEFF.map((efficiency, index) => ({
                x: index,
                y: efficiency
            }));

            new Chart(scatterCtx, {
                type: 'scatter',
                data: {
                    labels: playerNames,
                    datasets: [{
                        label: 'Overall Efficiency',
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

            // Histogram of Player Efficiency Rating (PER)
            const perHistogramCtx = document.getElementById('perHistogram').getContext('2d');
            const perHistogramData = playerPER.map(per => Math.round(per / 100) * 100); // Round to the nearest hundred

            new Chart(perHistogramCtx, {
                type: 'bar',
                data: {
                    labels: playerNames,
                    datasets: [{
                        label: 'Player Efficiency Rating (PER)',
                        data: playerPER,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
