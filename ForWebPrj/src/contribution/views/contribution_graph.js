

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawCharts);

function drawCharts() {
    let tLength = JSON.parse(document.getElementById("tLength").getAttribute("team-list-length"));
    console.log("tLength:", tLength);
    for(let i = 0; i < tLength; i++) {
        let contributionsData = JSON.parse(document.getElementById("bd" + i).getAttribute("data-contribution-list"));
        let teamListData = JSON.parse(document.getElementById("tl" + i).getAttribute("data-team-list"));
       
        console.log("Contributions data for chart " + i + ":", contributionsData);
        console.log("teamList " + i + ":", teamListData);
        var data = google.visualization.arrayToDataTable(contributionsData);
        var options = {
            title: teamListData
        };
        var chart = new google.visualization.PieChart(document.getElementById("employee_piechart" + i));
        chart.draw(data, options);
    }
}
