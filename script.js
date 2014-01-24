function calcCheckpoints(){
	var resultsSection = document.getElementById("results");
	var values = getValues();
	var docum
	var table = document.createElement("table");
	table.id="table_of_results";
	

		var thead = document.createElement("thead");
		thead.insertRow(0);
		thead.rows[0].insertCell(0);
		thead.rows[0].cells[0].appendChild(document.createTextNode("#"));
		thead.rows[0].insertCell(1);
		thead.rows[0].cells[1].appendChild(document.createTextNode("Distance in " + values[4]));
		thead.rows[0].insertCell(2);
		thead.rows[0].cells[2].appendChild(document.createTextNode("Time"));
		table.appendChild(thead);
		
		var tbody = document.createElement("tbody");
		table.appendChild(tbody);

	for(var i = 0; i < values[5]; i++){
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0);
		tbody.rows[i].cells[0].appendChild(document.createTextNode(i + 1));
		tbody.rows[i].insertCell(1);
		tbody.rows[i].cells[1].appendChild(document.createTextNode((values[3] * (i+1)) + " " + values[4]));
		tbody.rows[i].insertCell(2);
		tbody.rows[i].cells[2].appendChild(document.createTextNode(transformSecondsInText(values[2])));
		}
	resultsSection.removeChild(resultsSection.firstChild);
	resultsSection.appendChild(table);
	
	
}
	
function getValues(){
	var form = document.getElementById("form_1");
	var distance = form.elements['distance'].value;
	var distanceUnit = form.elements['distance_unit'].value;
	var TimeInSeconds = form.elements['time_hour'].value * 3600
										+ form.elements['time_minute'].value * 60
										+ parseInt(form.elements['time_second'].value);
	
	var steps = form.elements['checkpoint'].value;
	var stepsUnit = form.elements['checkpoint_unit'].value;
	var numberOfCheckpoints = Math.floor(distance / steps);
	var allTheValues = new Array(distance, distanceUnit, TimeInSeconds, steps, stepsUnit, numberOfCheckpoints);
	return allTheValues ;
}

function getSecondsForCheckpoints(totalDistance, checkpointDistance, totalTime){
	return (totalTime/(totalDistance/checkpointDistance));
}

function transformSecondsInText(totalSeconds){
	var hours = Math.floor(totalSeconds/3600);
	var minutes = Math.floor((totalSeconds - (3600 * hours))/60);
	var seconds = totalSeconds - (3600 * hours) - (60 * minutes);
	hours = (hours == 0) ? "" : hours + ":";
	minutes = (minutes < 10) ? "0" + minutes + ":" :  minutes + ":";
	seconds =(seconds < 10) ? "0" + seconds : seconds;
	return hours + minutes + seconds;
}