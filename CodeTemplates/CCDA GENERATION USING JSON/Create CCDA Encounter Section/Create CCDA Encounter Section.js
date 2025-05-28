
function createEncounterSectionCCDA(msg){

var parseEncounter 						= JSON.parse(msg);
var newPatientEncounterData 				= new XML("<component></component>");

if(parseEncounter['data'].length!=0){
	
var sectionData						= new XML("<section></section>");
createSegment('templateId',sectionData)
createSegment('templateId',sectionData,1)
sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.22.1";
sectionData['templateId'][1]['@extension']	= '2015-08-01';
sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.22.1";
sectionData['code']['@code']				= "46240-8";
sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
sectionData['code']['@codeSystemName']		= "LOINC";
sectionData['code']['@displayName']		= "History of encounters";
sectionData['title']					= "History Of Encounters";
var textPortionOfEncounters				= new XML('<text></text>');
var encounterWarning					= new XML('<paragraph>'+
              '<content>WARNING:The information contained in this section is historical and is provided for information only and taken from valid electronic medical system . Please verify the information with the holder of the legal document before using it for clinical purposes.</content>'+
            '</paragraph>');
var tablePortion 						= new XML('<table></table>');
tablePortion['@border']					= "1";
tablePortion['@width']					= "100%";
var tableHeaderContent					= new XML('<thead>'+
									'<tr>'+
									'<th>Encounter Code</th>'+
									'<th>Reason for Visit</th>'+
									'<th>Start Date</th>'+
									'</tr>'+
									'</thead>');
tablePortion.appendChild(tableHeaderContent);
var tbody								= new XML("<tbody></tbody>");
for(x=0;x<parseEncounter['data'].length;x++){

	if(parseEncounter['data'][x]['display_name']!=""){
		var encounterStartDate = parseEncounter['data'][x]['start_date'];
		var tbodyTr						= new XML('<tr></tr>');
		tbodyTr['td'][0]					= parseEncounter['data'][x]['code'];
		tbodyTr['td'][1]					= parseEncounter['data'][x]['display_name'];
		
		if(encounterStartDate==null||encounterStartDate==""){
			tbodyTr['td'][2]					= '-';
		}else{
			tbodyTr['td'][2]					= DateUtil.convertDate('yyyy-MM-dd', 'MMM dd, yyyy', parseEncounter['data'][x]['start_date']);
		}
		
		tbody.appendChild(tbodyTr);
	}
}
tablePortion.appendChild(tbody);
textPortionOfEncounters.appendChild(tablePortion);
textPortionOfEncounters.appendChild(encounterWarning);
sectionData.appendChild(textPortionOfEncounters);

for(x=0;x<parseEncounter['data'].length;x++){

	if(parseEncounter['data'][x]['display_name']!=""){
		
	var entrySectionData 							= new XML('<entry></entry>');
	entrySectionData['@typeCode']						= "DRIV";
	var encounterSectionData							= new XML('<encounter></encounter>');
	encounterSectionData['@classCode'] 				= "ENC";
	encounterSectionData['@moodCode'] 					= "EVN";
	createSegment('templateId',encounterSectionData)
	createSegment('templateId',encounterSectionData,1)
	encounterSectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.4.49";
	encounterSectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.4.49";
	encounterSectionData['templateId'][1]['@extension']	= '2015-08-01';
	encounterSectionData['id']['@root']				= UUIDGenerator.getUUID();
	encounterSectionData['code']['@code']				= '185349003';
	encounterSectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.96";
	encounterSectionData['code']['@codeSystemName']		= "SNOMED CT";
	encounterSectionData['code']['@displayName']			= parseEncounter['data'][x]['display_name'];
	encounterSectionData['statusCode']['@code']			= "completed";
	var effectiveTimeXml							= new XML('<effectiveTime></effectiveTime>');
	
	if(parseEncounter['data'][x]['start_date']==null || parseEncounter['data'][x]['start_date']==""){
		
		effectiveTimeXml['@nullFlavor']		= 'UNK';
		
	}else{
		
	effectiveTimeXml['@value']						= DateUtil.convertDate('yyyyMMdd', 'yyyyMMdd', parseEncounter['data'][x]['start_date']);
	
	}
	encounterSectionData.appendChild(effectiveTimeXml);
	entrySectionData.appendChild(encounterSectionData);
	sectionData.appendChild(entrySectionData);
	
	}
}
newPatientEncounterData.appendChild(sectionData);

return newPatientEncounterData;

}else if(parseEncounter['data'].length==0){
	var sectionData						= new XML('<section nullFlavor="NI"/>');
	createSegment('templateId',sectionData)
	createSegment('templateId',sectionData,1)
	sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.22.1";
	sectionData['templateId'][1]['@extension']	= '2015-08-01';
	sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.22.1";
	sectionData['code']['@code']				= "46240-8";
	sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
	sectionData['code']['@codeSystemName']		= "LOINC";
	sectionData['code']['@displayName']		= "History of encounters";
	sectionData['title']					= "History Of Encounters";
	sectionData['text']						= "Encounters Does Not Exist";
	newPatientEncounterData.appendChild(sectionData);
	return newPatientEncounterData;	
}
}