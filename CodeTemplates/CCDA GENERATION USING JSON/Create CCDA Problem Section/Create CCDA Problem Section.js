function createProblemSectionCCDA(msg){

var parseProblems 						= JSON.parse(msg);
var newPatientProblemData 				= new XML("<component></component>");
var sectionData						= new XML("<section></section>");

createSegment('templateId',sectionData);
createSegment('templateId',sectionData,1);
sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.5.1";
sectionData['templateId'][1]['@extension']	= '2015-08-01';
sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.5.1";
sectionData['code']['@code']				= "11450-4";
sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
sectionData['code']['@codeSystemName']		= "LOINC";
sectionData['code']['@displayName']		= "Problem List";
sectionData['title']					= "Problem List";

var textPortionOfProblems				= new XML('<text></text>');
var tablePortion 						= new XML('<table></table>');
tablePortion['@border']					= "1";
tablePortion['@width']					= "100%";
var tableHeaderContent					= new XML('<thead>'+
									'<tr>'+
									'<th>Condition</th>'+
									'<th>ICD10-CM Code</th>'+
									'<th>Onset Dates</th>'+
									'<th>Recorded Date</th>'+
									'<th>Notes</th>'+
									'</tr>'+
									'</thead>');
tablePortion.appendChild(tableHeaderContent);
var tbody								= new XML("<tbody></tbody>");

for(x=0;x<parseProblems['data'].length;x++){
	var problemOnsetDateTime = "";
	if(parseProblems['data'][x]['onsetdatetime']==null||parseProblems['data'][x]['onsetdatetime']==""){
		problemOnsetDateTime = '-';
	}else{
		problemOnsetDateTime = DateUtil.convertDate('yyyy-MM-dd', 'MMM dd, yyyy', parseProblems['data'][x]['onsetdatetime']);
	}
	var tbodyTr						= new XML('<tr></tr>');
	tbodyTr['td'][0]					= parseProblems['data'][x]['text'];
	tbodyTr['td'][1]					= parseProblems['data'][x]['code'];
	tbodyTr['td'][2]					= problemOnsetDateTime;
	if(parseProblems['data'][x]['daterecorded']==null||parseProblems['data'][x]['daterecorded']==""){
		tbodyTr['td'][3] = "";
	}else{
		tbodyTr['td'][3]					= DateUtil.convertDate('yyyy-MM-dd', 'MMM dd, yyyy',parseProblems['data'][x]['daterecorded']);
		
	}
	tbodyTr['td'][4]					= "ICD 10 Code : "+parseProblems['data'][x]['code']+" - "+parseProblems['data'][x]['text'];
	tbody.appendChild(tbodyTr);
}
tablePortion.appendChild(tbody);
textPortionOfProblems.appendChild(tablePortion);
sectionData.appendChild(textPortionOfProblems);

for(x=0;x<parseProblems['data'].length;x++){
	
	if(parseProblems['data'][x]['text']!=null){
		
		var entrySectionData 							= new XML('<entry></entry>');
		entrySectionData['@typeCode']						= "DRIV";
		var actSectionData								= new XML('<act></act>');
		actSectionData['@classCode'] 						= "ACT";
		actSectionData['@moodCode'] 						= "EVN";
		createSegment('templateId',actSectionData);
		createSegment('templateId',actSectionData,1);
		actSectionData['templateId'][0]['@root']			= "2.16.840.1.113883.10.20.22.4.3";
		actSectionData['templateId'][1]['@root']			= "2.16.840.1.113883.10.20.22.4.3";
		actSectionData['templateId'][1]['@extension']		= '2015-08-01';
		actSectionData['id']['@root']						= UUIDGenerator.getUUID();
		actSectionData['code']['@code']					= "CONC";
		actSectionData['code']['@codeSystem']				= "2.16.840.1.113883.5.6";
		actSectionData['code']['@displayName']				= "Concerns";
		actSectionData['statusCode']['@code']				= "active";
		var effectiveTimeXml							= new XML('<effectiveTime></effectiveTime>');
		effectiveTimeXml['low']['@nullFlavor']				= 'NI';
		actSectionData.appendChild(effectiveTimeXml);
		var entryRelationshipData						= new XML('<entryRelationship></entryRelationship>');
		entryRelationshipData['@typeCode']					= "SUBJ";
		var observationXmlContent						= new XML('<observation></observation>');
		observationXmlContent['@classCode']				= 'OBS';
		observationXmlContent['@moodCode']					= 'EVN';
		createSegment('templateId',observationXmlContent);
		createSegment('templateId',observationXmlContent,1);
		observationXmlContent['templateId'][0]['@root']			= '2.16.840.1.113883.10.20.22.4.4';
		observationXmlContent['templateId'][1]['@root']			= '2.16.840.1.113883.10.20.22.4.4';
		observationXmlContent['templateId'][1]['@extension']		= '2015-08-01';
		observationXmlContent['id']['@root']				= UUIDGenerator.getUUID();
		var problemCode								= (<code code="55607006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED CT" displayName="Problem">
														<translation code="75326-9"  codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Problem"/>
															</code>);
	
		observationXmlContent.appendChild(problemCode);
		var effectiveTimeInsideObservation					= new XML('<effectiveTime></effectiveTime>');
		effectiveTimeInsideObservation['low']['@nullFlavor']	= 'NI';
		observationXmlContent.appendChild(<statusCode code="completed"/>);
	 	observationXmlContent.appendChild(effectiveTimeInsideObservation);

		var valueProblemData = (<value code="55607006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" type="CD">
							<translation code={parseProblems['data'][x]['code']} codeSystem="2.16.840.1.113883.6.90" codeSystemName="ICD-10-CM" displayName={parseProblems['data'][x]['text']}/>
							</value>);

		observationXmlContent.appendChild(valueProblemData);
	 	/*
		observationXmlContent['value']['@code']				= parseProblems['data'][x]['code'];
		observationXmlContent['value']['@codeSystem']		= "2.16.840.1.113883.6.90";
		observationXmlContent['value']['@type']				= "CD";
		observationXmlContent['value']['@codeSystemName']		= "ICD-10-CM";
		observationXmlContent['value']['@displayName']		= parseProblems['data'][x]['text'];
		*/
		
		entryRelationshipData.appendChild(observationXmlContent);
		actSectionData.appendChild(entryRelationshipData);
		entrySectionData.appendChild(actSectionData);
		sectionData.appendChild(entrySectionData);
		
	}
	
}
	newPatientProblemData.appendChild(sectionData);
	return newPatientProblemData;
}