document.addEventListener('DOMContentLoaded', function () {
    // Fetch the CSV file
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            // Convert CSV to array of objects
            const players = CSVtoJSON(data);

            // Extract player names and points for the bar chart
            const playerNames = players.map(player => player.Player);
            const points = players.map(player => parseFloat(player.Points));

            // Create bar chart
            const ctx = document.getElementById('barChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: playerNames,
                    datasets: [{
                        label: 'NBA Player Points',
                        data: points,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        })
        .catch(error => console.error('Error fetching the CSV file:', error));

    // Function to convert CSV to JSON
    function CSVtoJSON(csv) {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        return result;
    }
});
