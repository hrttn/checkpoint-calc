function calcCheckpoints(){
	var resultsDiv = document.getElementById("results_div");
	var values = getValues();
	var table = document.createElement("table");
	table.id="table_of_results";
	
	var thead = document.createElement("thead");
	thead.insertRow(0);
	thead.rows[0].insertCell(0);
	thead.rows[0].cells[0].appendChild(document.createTextNode("#"));
	thead.rows[0].insertCell(1);
	thead.rows[0].cells[1].appendChild(document.createTextNode("Time in " + values[4]));
	thead.rows[0].insertCell(2);
	thead.rows[0].cells[2].appendChild(document.createTextNode("Distance"));
	table.appendChild(thead);
	
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	for(var i = 0; i < values[5]; i++){
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0);
		tbody.rows[i].cells[0].appendChild(document.createTextNode(i + 1));
		tbody.rows[i].insertCell(1);
		tbody.rows[i].cells[1].appendChild(document.createTextNode(formatSeconds(values[3] * (i+1))));
		tbody.rows[i].insertCell(2);
		tbody.rows[i].cells[2].appendChild(document.createTextNode(convertInto(getMetersForCheckpoints(values[2], values[3]* (i+1), values[0]), "m", values[1]) + " " + values[1]));
		}
		
	if( values[2] % values[3] != 0){
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0);
		tbody.rows[i].cells[0].appendChild(document.createTextNode(i + 1));
		tbody.rows[i].insertCell(1);
		tbody.rows[i].cells[1].appendChild(document.createTextNode(formatSeconds(values[2])));
		tbody.rows[i].insertCell(2);
		tbody.rows[i].cells[2].appendChild(document.createTextNode(convertInto(values[0] , "m", values[1]) + " " + values[1]));
	}
		
	resultsDiv.removeChild(resultsDiv.firstChild);
	resultsDiv.appendChild(table);
}
	
function getValues(){
	var form = document.getElementById("form_1");
	
	var distanceUnit = form.elements['distance_unit'].value;
	var distanceInMeters = convertInto(form.elements['distance'].value, distanceUnit, 'm');
	var hoursInSeconds = parseInt((isNaN(form.elements['time_hour'].value)) ? 0 : form.elements['time_hour'].value * 3600);
	var minutesInSeconds = parseInt((isNaN(form.elements['time_minute'].value)) ? 0 : form.elements['time_minute'].value * 60);
	var secondsInSeconds = parseInt((isNaN(form.elements['time_second'].value)) ? 0 : form.elements['time_second'].value * 1);
							
	var TimeInSeconds = hoursInSeconds + minutesInSeconds + secondsInSeconds;
	
	var stepsUnit = form.elements['checkpoint_unit'].value;
	var stepsInSeconds = convertTimeIntoSeconds(form.elements['checkpoint'].value, stepsUnit);
	
	var numberOfCheckpoints = Math.floor(TimeInSeconds / stepsInSeconds);
	var allTheValues = new Array(distanceInMeters, distanceUnit, TimeInSeconds, stepsInSeconds, stepsUnit, numberOfCheckpoints);
	return allTheValues ;
}

function getMetersForCheckpoints(totalTime, checkpointTime, totalDistance){
	return Math.round(totalDistance/(totalTime/checkpointTime));
}

function formatSeconds(totalSeconds){
	var hours = Math.floor(totalSeconds/3600);
	var minutes = Math.floor((totalSeconds - (3600 * hours))/60);
	var seconds = totalSeconds - (3600 * hours) - (60 * minutes);
	hours = (hours == 0) ? "" : hours + ":";
	minutes = (minutes < 10) ? "0" + minutes + ":" :  minutes + ":";
	seconds =(seconds < 10) ? "0" + seconds : seconds;
	return hours + minutes + seconds;
}

function convertInto(distance, fromUnit, toUnit){
	if(fromUnit == 'km' && toUnit == 'm') {
			return (distance * 1000);
	} else if (fromUnit == 'm' && toUnit == 'km') {
			return (distance / 1000);
	} else {
			return distance;
	}
}

function convertTimeIntoSeconds(time, fromUnit){
	if(fromUnit == 'hour') {
			return (time * 3600);
	} else if (fromUnit == 'minute') {
			return (time * 60);
	} else {
			return time;
	}
}