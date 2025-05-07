function generateEncounterData(patientEncounterData) {

	logger.debug("patientEncounterData ->> "+patientEncounterData);

	logger.debug("patientEncounterData.length ->> "+patientEncounterData.length);
	
	var encounter_data = "";

	for(enc=0;enc<patientEncounterData.length;enc++){

		logger.debug("patientEncounterData[enc]['typeCode'] ->>> "+patientEncounterData[enc]['typeCode']);
		
			var encounter_data = new XML('<entry></entry>');
			var encounter_class = new XML('<encounter></encounter>');
			encounter_class['@classCode'] = "ENC";
			encounter_class['@moodCode'] = "EVN";
			<!--  Encounter activities template -->
			encounter_class.appendChild(<templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.49"/>);
			<!-- Encounter performed template -->
			encounter_class.appendChild(<templateId extension="2021-08-01" root="2.16.840.1.113883.10.20.24.3.23"/>);
			encounter_class.appendChild(<id extension={generateGuid()} root="1.3.6.1.4.1.115"/>);
			<!-- QDM Attribute: Code -->
			encounter_class.appendChild(<code code={patientEncounterData[enc]['typeCode']} codeSystem="2.16.840.1.113883.6.12" codeSystemName="CPT"/>);
			encounter_class.appendChild(<text>{patientEncounterData[enc]['location']}</text>);
			encounter_class.appendChild(<statusCode code="completed"/>);
			<!-- QDM Attribute: Relevant Period -->
			encounter_class.appendChild(<effectiveTime value={patientEncounterData[enc]['date']}/>);
			encounter_data.appendChild(encounter_class);
	}

	return encounter_data;

}