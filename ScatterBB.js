// ScatterBB.js

// Wait for the DOM to be ready before executing the script
document.addEventListener('DOMContentLoaded', function () {
    const players = [];

    d3.csv('NBA_Player_Stats.csv').then((data) => {
        // Convert CSV data to the desired format
        data.forEach((row) => {
            const playerName = row.Player;
            const seasonStats = {
                points: +row.PTS,
            };

            const playerIndex = players.findIndex(player => player.name === playerName);

            if (playerIndex !== -1) {
                players[playerIndex].seasons.push(seasonStats);
            } else {
                players.push({
                    name: playerName,
                    seasons: [seasonStats],
                });
            }
        });

        // Move the following code inside the d3.csv callback
        const svg = d3.select('#playerStats')
            .attr('width', 550)
            .attr('height', 400);

        const circleRadius = 6;

        function createScatterPlot() {
            svg.selectAll('*').remove();

            const xScale = d3.scaleLinear()
                .domain([0, d3.max(players, d => d3.max(d.seasons, s => s.points))])
                .range([60, 500]);

            const yScale = d3.scaleLinear()
                .domain([0, players.length])
                .range([350, 60]);

            svg.selectAll('circle')
                .data(players)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d3.max(d.seasons, s => s.points)))
                .attr('cy', (d, i) => yScale(i))
                .attr('r', circleRadius)
                .attr('fill', 'black')
                .attr('stroke', 'white')
                .on('mouseover', function (event, d) {
                    d3.select(this).attr('fill', 'orange');
                    showTooltip(event, d);
                })
                .on('mouseout', function () {
                    d3.select(this).attr('fill', 'black');
                    hideTooltip();
                });

            function showTooltip(event, player) {
                const tooltip = d3.select('body').append('div')
                    .attr('class', 'tooltip')
                    .style('top', event.clientY - 30 + 'px')
                    .style('left', event.clientX + 10 + 'px');
                tooltip.append('div')
                    .attr('class', 'tooltiptext')
                    .html(`${player.name}: ${d3.max(player.seasons, s => s.points)} points`);
            }

            function hideTooltip() {
                svg.selectAll('.tooltip').remove();
            }
        }

        createScatterPlot();
    });
});
