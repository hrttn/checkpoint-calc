function calcCheckpoints(){
	var submitButton = document.getElementById("submit");
	submitButton.disabled = true;
	var values = getValues();
	var table = document.getElementById("table_of_results");
	

	var tbody = document.createElement("tbody");
	tbody.name = "tbody";
	table.appendChild(tbody);

	for(var i = 0; i < values[5]; i++){
		tbody.insertRow(i);
		tbody.rows[i].insertCell(0);
		tbody.rows[i].cells[0].appendChild(document.createTextNode(i + 1));
		tbody.rows[i].insertCell(1);
		tbody.rows[i].cells[1].appendChild(document.createTextNode(values[3] * (i+1)));
		tbody.rows[i].insertCell(2);
		tbody.rows[i].cells[2].appendChild(document.createTextNode("Cell 2,2"));
	}
	//add the table to the document body
	
	}
	
function getValues(){
	var form = document.getElementById("form_1");
	var distance = form.elements['distance'].value;
	var distanceUnit = form.elements['distance_unit'].value;
	var TimeInSeconds = form.elements['time_hour'].value * 3600
										+ form.elements['time_minute'].value * 60
										+ form.elements['time_second'].value * 3600;
	
	var steps = form.elements['checkpoint'].value;
	var stepsUnit = form.elements['checkpoint_unit'].value;
	var numberOfCheckpoints = Math.floor(distance / steps);
	var allTheValues = new Array(distance, distanceUnit, TimeInSeconds, steps, stepsUnit, numberOfCheckpoints);
	return allTheValues ;
}

