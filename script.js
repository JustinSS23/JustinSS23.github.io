document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have the data in the same order as the players
    const playerData = [
        'Karl-Anthony Towns,37',
        'Stephen Curry,34.2',
        'Luka Dončić,33.2',
        'Giannis Antetokounmpo,32.7',
        'Joel Embiid,31.7',
        'Kevin Durant,29.3',
        'Bradley Beal,29.2',
        'LeBron James,29',
        'Nikola Jokić,26.4',
        'Trae Young,25.3',
        'Devin Booker,25.1',
        'James Harden,25',
        'Zach LaVine,24.1',
        'Ja Morant,24',
        'Malcolm Brogdon,21.2',
        'Fred VanVleet,20.2',
        'DeMar DeRozan,19.7',
        'CJ McCollum,19.5',
        'Chris Duarte,19.4',
        'De'Aaron Fox,19.3',
        'Norman Powell,19',
        'Khris Middleton,18.8',
        'Terry Rozier,18.7',
        'Shai Gilgeous-Alexander,18.6',
        'Kyle Lowry,17.4'
    ];

    const playerNames = playerData.map(entry => entry.split(',')[0]);
    const playerPoints = playerData.map(entry => parseFloat(entry.split(',')[1]));

    // Bar Chart
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
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

    // Add code to create another chart on the second canvas (secondChart)
    // ...

    // Scatter Plot (just to check)
    const scatterCtx = document.getElementById('scatterChart').getContext('2d');
    new Chart(scatterCtx, {
        type: 'scatter',
        data: {
            labels: playerNames,
            datasets: [{
                label: 'Points',
                data: playerPoints,
                backgroundColor: 'rgba(255, 99, 132, 1)'
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
});
