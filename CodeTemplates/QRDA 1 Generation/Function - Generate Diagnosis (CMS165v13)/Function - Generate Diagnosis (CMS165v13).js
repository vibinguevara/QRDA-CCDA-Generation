function generateDiagnosisData(patientDiagnosisData) {
	// Specific for the Diagnosis Section (CMS165v13)
  	
  	logger.debug("patientDiagnosisData ->> "+patientDiagnosisData);

	logger.debug("patientDiagnosisData.length ->> "+patientDiagnosisData.length);
	
	var entry_data = "";

	for(diagnosis=0;diagnosis<patientDiagnosisData.length;diagnosis++){

		logger.debug("patientDiagnosisData[enc]['code'] ->>> "+patientDiagnosisData[diagnosis]['code']);
		
			var entry_data = new XML('<entry></entry>');
			var entry_class = new XML('<act></act>');
			entry_class['@classCode'] = "ACT";
			entry_class['@moodCode'] = "EVN";
			<!--  Diagnosis activities template -->
			entry_class.appendChild(<templateId root="2.16.840.1.113883.10.20.22.4.3" extension="2015-08-01"/>);
			<!-- Diagnosis Concern Act -->
			entry_class.appendChild(<templateId root="2.16.840.1.113883.10.20.24.3.137" extension="2021-08-01"/>);
			entry_class.appendChild(<id extension={generateGuid()} root="1.3.6.1.4.1.115"/>);
			<!-- QDM Attribute: Code -->
			entry_class.appendChild(<code code="CONC" codeSystem="2.16.840.1.113883.5.6" codeSystemName="Concern"/>);
			entry_class.appendChild(<statusCode code="active"/>);
			entry_class.appendChild(<effectiveTime value={patientDiagnosisData[diagnosis]['date']}/>);
			var entry_relationship_class = new XML('<entryRelationship></entryRelationship>');
			entry_relationship_class['@typeCode']="SUBJ";
			var observation_class = new XML('<observation></observation>');
			observation_class['@classCode']="OBS";
			observation_class['@moodCode']="EVN";
			observation_class.appendChild(<templateId root="2.16.840.1.113883.10.20.22.4.4" extension="2015-08-01"/>);
			observation_class.appendChild(<templateId root="2.16.840.1.113883.10.20.24.3.135" extension="2021-08-01"/>);
			observation_class.appendChild(<id root="1.3.6.1.4.1.115" extension={generateGuid()}/>);
			var observation_class_code = new XML('<code></code>');
			observation_class_code['@code']="29308-4";
			observation_class_code['@codeSystem']="2.16.840.1.113883.6.1";
			observation_class_code.appendChild(<translation code="282291009" codeSystem="2.16.840.1.113883.6.96"/>);
			observation_class.appendChild(observation_class_code);
			observation_class.appendChild(<statusCode code="completed"/>);
			observation_class.appendChild(<effectiveTime value={patientDiagnosisData[diagnosis]['date']}/>);
			observation_class.appendChild(<value type="CD" code={patientDiagnosisData[diagnosis]['code']} codeSystem="2.16.840.1.113883.6.90" codeSystemName="ICD10CM" displayName={patientDiagnosisData[diagnosis]['display']}/>);
			entry_relationship_class.appendChild(observation_class);
			entry_class.appendChild(entry_relationship_class);
			entry_data.appendChild(entry_class);
	}

	return entry_data;
  	
}
