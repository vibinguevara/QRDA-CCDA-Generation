/**
	Modify the description here. Modify the function name and parameters as needed. One function per
	template is recommended; create a new code template for each new function.

	@param {String} arg1 - arg1 description
	@return {String} return description
*/
function createObservationSection(msg) {

var parseObservationData 					= JSON.parse(msg);
var newPatientObservationData 			= new XML("<component></component>");

if(parseObservationData['data'].length!=0){
var sectionData						= new XML("<section></section>");
createSegment('templateId',sectionData)
createSegment('templateId',sectionData,1)
sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.3.1";
sectionData['templateId'][1]['@extension']	= '2015-08-01';//DateUtil.getCurrentDate('yyyy-MM-dd');
sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.3.1";
sectionData['code']['@code']				= "30954-2";
sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
sectionData['code']['@codeSystemName']		= "LOINC";
sectionData['code']['@displayName']		= "History of Observation";
sectionData['title']					= "History of Observation";
var textPortionOfObservation			= new XML('<text></text>');
var tablePortion 						= new XML('<table></table>');
tablePortion['@border']					= "1";
tablePortion['@width']					= "100%";
// header of the table
var tableHeaderContent					= new XML('<thead>'+
									'<tr>'+
									'<th>Observation Date</th>'+
									'<th>Lab Result Name</th>'+
									'<th>Refrence Range Low</th>'+
									'<th>Refrence Range Normal</th>'+
									'<th>Refrence Range High</th>'+
									'<th>Lab Result Unit</th>'+
									'<th>Lab Result Value</th>'+
									'<th>Lab Name</th>'+
									'</tr>'+
									'</thead>');
tablePortion.appendChild(tableHeaderContent);
if(parseObservationData.data && parseObservationData.data.length > 0 ){
var tbody								= new XML("<tbody></tbody>");
for(x=0;x<parseObservationData['data'].length;x++){

	var labType                             = parseObservationData['data'][x]['lab_type'];

	var observationDate                     = "" //parseObservationData['data'][x]['result_values'][0]['name'].split('T')[0]
	var unitValue                           = "" //parseObservationData['data'][x]['result_unit'];
	var observationValue                    = "" //parseObservationData['data'][x]['result_values'][0]['value'];
	var refrenceLow					= ""   //parseObservationData['data'][x]['reference_range']['low'];
	var resultName 					= ""   //parseObservationData['data'][x]['result_name'];
	var labName                             = "";
	var refrenceNormal           			= "";
	var refrenceHigh 					= "";


	if(labType == 1 || labType == 3 || labType == 4){
	 observationDate                     = parseObservationData['data'][x]['result_values'][0]['name'].split('T')[0]
	 unitValue                           = parseObservationData['data'][x]['result_unit'];
	 observationValue                    = parseObservationData['data'][x]['result_values'][0]['value'];
	 refrenceLow					= parseObservationData['data'][x]['reference_range']['low'];
	 refrenceNormal				= ""//parseObservationData['data'][x]['reference_range']['low'];
	 refrenceHigh				= parseObservationData['data'][x]['reference_range']['high'];
	 resultName 					= parseObservationData['data'][x]['result_name'];	
	}else if(labType == 2){
	 observationDate                     = parseObservationData['data'][x]['result_values'][0]['name'].split('T')[0]
	 unitValue                           = parseObservationData['data'][x]['result_unit'];
	 observationValue                    = parseObservationData['data'][x]['result_values'][0]['value'];
	 refrenceLow					= parseObservationData['data'][x]['reference_range'][0]['low'];
	 refrenceNormal				= ""//parseObservationData['data'][x]['reference_range']['low'];
	 refrenceHigh				= parseObservationData['data'][x]['reference_range'][0]['high'];
	 resultName 					= parseObservationData['data'][x]['result_name'];	
		
	}

	

	if(observationValue.startsWith('>') || observationValue.startsWith('<')){
		observationValue  = observationValue.replace(/[<>]/g, '')
	}

	if(labType == 1){
		labName = 'Accureference';
	}else if(labType == 2){
		labName  = 'Luxor';
	}else if(labType == 3){
		labName = 'Xlab'
	}else{
		labName = 'Quest';
	}
	
	var tbodyTr						= new XML('<tr></tr>');
	tbodyTr['td'][0]                        =  DateUtil.convertDate('yyyy-MM-dd', 'MMM dd, yyyy', observationDate); 
	tbodyTr['td'][1]                        = resultName;
	tbodyTr['td'][2]					= refrenceLow;
	tbodyTr['td'][3]					= refrenceNormal;
	tbodyTr['td'][4]					= refrenceHigh;
			
	tbodyTr['td'][5]                        =  unitValue;
	tbodyTr['td'][6]					=  observationValue;
	tbodyTr['td'][7]					=  labName;
	
	
	tbody.appendChild(tbodyTr);
	
}
tablePortion.appendChild(tbody);
}
textPortionOfObservation.appendChild(tablePortion);
sectionData.appendChild(textPortionOfObservation);



newPatientObservationData.appendChild(sectionData);

return newPatientObservationData;
}else if (parseObservationData['data'].length==0){
	var sectionData						= new XML('<section nullFlavor="NI"/>');
	createSegment('templateId',sectionData)
	createSegment('templateId',sectionData,1)
	sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.3.1";
	sectionData['templateId'][1]['@extension']	= '2015-08-01';
	sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.3.1";
	sectionData['code']['@code']				= "30954-2";
	sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
	sectionData['code']['@codeSystemName']		= "LOINC";
	sectionData['code']['@displayName']		= "History of Observation";
	sectionData['title']					= "History of Observation";
	sectionData['text']					= "No Lab information found";
	newPatientObservationData.appendChild(sectionData);

return newPatientObservationData;
}

}