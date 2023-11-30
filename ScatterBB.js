document.addEventListener('DOMContentLoaded', function () {
    // Fetch the CSV file
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            // Convert CSV to array of objects
            const players = CSVtoJSON(data);

            // Generate table rows
            const tableBody = document.querySelector('#playersTable tbody');
            players.forEach(player => {
                const row = tableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = player.Player;
                cell2.textContent = player.Points;
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
