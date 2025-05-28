// Create AllergyIntolerance section

function createAllergyIntoleranceSectionCCDA(msg){

var parseAllergyIntolerance 				= JSON.parse(msg);
var newAllergyIntoleranceData 			= new XML("<component></component>");

if(parseAllergyIntolerance['data'].length!=0){
	
var sectionData						= new XML("<section></section>");

createSegment('templateId',sectionData);
createSegment('templateId',sectionData,1);
sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.6.1";
sectionData['templateId'][1]['@extension']	= '2015-08-01';
sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.6.1";
sectionData['code']['@code']				= "48765-2";
sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
sectionData['code']['@codeSystemName']		= "LOINC";
sectionData['code']['@displayName']		= "Allergies, Adverse Reactions, Alerts";
sectionData['title']					= "Allergies and Intolerances";

var textPortionOfProblems				= new XML('<text></text>');
var tablePortion 						= new XML('<table></table>');
tablePortion['@border']					= "1";
tablePortion['@width']					= "100%";
var tableHeaderContent					= new XML('<thead>'+
									'<tr>'+
									'<th>Allergy</th>'+
									'<th>Onset Date</th>'+
									'<th>Reaction</th>'+
									'<th>Severity</th>'+
									'<th>Status</th>'+
									'<th>Author</th>'+
									'</tr>'+
									'</thead>');
tablePortion.appendChild(tableHeaderContent);

if(parseAllergyIntolerance['data'].length==0){
	
	var tbody								= new XML("<tbody></tbody>");
	var tbodyTr							= new XML('<tr></tr>');
	tbodyTr['td'][0]						= '';
	tbodyTr['td'][1]						= '';
	tbodyTr['td'][3] 						= '';
	tbodyTr['td'][4]						= '';
	tbodyTr['td'][5]						= '';
	tbody.appendChild(tbodyTr);

}else{

	var tbody								= new XML("<tbody></tbody>");

}

for(x=0;x<parseAllergyIntolerance['data'].length;x++){
	
	var allergyOnsetDateTime = "";
	var dateValue = null;
	if(parseAllergyIntolerance['data'][x]['set_date']!=null){
		 dateValue = parseAllergyIntolerance['data'][x]['set_date'].toString().replace('T','').split('.')[0];
		allergyOnsetDateTime = DateUtil.convertDate("yyyy-MM-ddHH:mm:ss", 'MMM dd, yyyy', dateValue);
	}
	
	var tbodyTr						= new XML('<tr></tr>');
	tbodyTr['td'][0]					= parseAllergyIntolerance['data'][x]['allergy_name'];
	tbodyTr['td'][1]					= allergyOnsetDateTime;
	tbodyTr['td'][2]					= parseAllergyIntolerance['data'][x]['reaction_names'];
	
	if(parseAllergyIntolerance['data'][x]['severity_reaction']!=null){
		tbodyTr['td'][3] 					= parseAllergyIntolerance['data'][x]['severity_reaction']['label'];
	}else{
		tbodyTr['td'][3] 					= '';
	}
	
	tbodyTr['td'][4]					= 'active';
	tbodyTr['td'][5]					= '';
	tbody.appendChild(tbodyTr);
}
	tablePortion.appendChild(tbody);
	textPortionOfProblems.appendChild(tablePortion);
	sectionData.appendChild(textPortionOfProblems);

for(x=0;x<parseAllergyIntolerance['data'].length;x++){
	
	var entrySectionData 							= new XML('<entry></entry>');
	entrySectionData['@typeCode']						= "DRIV";
	var actSectionData								= new XML('<act></act>');
	actSectionData['@classCode'] 						= "ACT";
	actSectionData['@moodCode'] 						= "EVN";
	createSegment('templateId',actSectionData);
	createSegment('templateId',actSectionData,1);
	actSectionData['templateId'][0]['@root']			= "2.16.840.1.113883.10.20.22.4.30";
	actSectionData['templateId'][1]['@root']			= "2.16.840.1.113883.10.20.22.4.30";
	actSectionData['templateId'][1]['@extension']		= '2015-08-01';
	actSectionData['id']['@root']						= '2.16.840.1.113883.3.3388.1.1.1.1117548.3';
	actSectionData['code']['@code']					= "CONC";
	actSectionData['code']['@codeSystem']				= "2.16.840.1.113883.5.6";
	actSectionData['code']['@codeSystemName']			= "HL7ActClass";
	actSectionData['statusCode']['@code']				= "active";
	
	var effectiveTimeXml							= new XML('<effectiveTime></effectiveTime>');
	if(dateValue!=null){
		effectiveTimeXml['low']['@value']					= DateUtil.convertDate("yyyy-MM-ddHH:mm:ss", 'yyyyMMddHHmmss', dateValue);
	}else{
		effectiveTimeXml['low']['@nullFlavor']				= 'NI';
	}
	
	actSectionData.appendChild(effectiveTimeXml);
	var entryRelationshipData						= new XML('<entryRelationship></entryRelationship>');
	entryRelationshipData['@typeCode']					= "SUBJ";
	var observationXmlContent						= new XML('<observation></observation>');
	observationXmlContent['@classCode']				= 'OBS';
	observationXmlContent['@moodCode']					= 'EVN';
	createSegment('templateId',observationXmlContent);
	createSegment('templateId',observationXmlContent,1);
	observationXmlContent['templateId'][0]['@root']		= '2.16.840.1.113883.10.20.22.4.7';
	observationXmlContent['templateId'][1]['@root']		= '2.16.840.1.113883.10.20.22.4.7';
	observationXmlContent['templateId'][1]['@extension']	= '2014-06-09';
	observationXmlContent['id']['@root']				= '2.16.840.1.113883.3.3388.1.1.1.1117548.3';
	observationXmlContent['code']['@code']				= "ASSERTION";
	observationXmlContent['code']['@codeSystem']			= "2.16.840.1.113883.5.4";
	observationXmlContent['statusCode']['@code']			= "completed";
	var effectiveTimeInsideObservation					= new XML('<effectiveTime></effectiveTime>');
	
	if(dateValue!=null){
		effectiveTimeInsideObservation['low']['@value']					= DateUtil.convertDate("yyyy-MM-ddHH:mm:ss", 'yyyyMMddHHmmss', dateValue);
	}else{
		effectiveTimeInsideObservation['low']['@nullFlavor']				= 'UNK';
	}
	
 	observationXmlContent.appendChild(effectiveTimeInsideObservation);
	
	//old working code
	observationXmlContent['value']['@code']				= '419199007';
	observationXmlContent['value']['@codeSystem']		= "2.16.840.1.113883.6.96";
	observationXmlContent['value']['@type']				= "CD";
	observationXmlContent['value']['@codeSystemName']		= "SNOMED CT";
	observationXmlContent['value']['@displayName']		= 'Allergy to substance (disorder)';
	
	var participant								= (<participant typeCode="CSM">
													<participantRole classCode="MANU">
													<playingEntity classCode="MMAT">
													<code code="256349002" codeSystem="2.16.840.1.113883.6.96" displayName={parseAllergyIntolerance['data'][x]['allergy_name']}/>
													</playingEntity>
													</participantRole>
													</participant>)
	observationXmlContent.appendChild(participant);

	var entryRelationshipAllergyData					= (<entryRelationship typeCode="SUBJ" inversionInd="true">
	<observation classCode="OBS" moodCode="EVN">
	<templateId root="2.16.840.1.113883.10.20.22.4.9"/>
	<templateId root="2.16.840.1.113883.10.20.22.4.9" extension="2014-06-09"/>
	<id root="2.16.840.1.113883.3.3388.1.1.1.1117548.3" extension={UUIDGenerator.getUUID()}/>
	<code type="CE" code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>
	<statusCode code="completed"/>
	<value type="CD" code="418290006" codeSystem="2.16.840.1.113883.6.96" codeSystemName="SNOMED-CT" displayName={parseAllergyIntolerance['data'][x]['reaction_names']}/>
	</observation>
	</entryRelationship>
	);
	observationXmlContent.appendChild(entryRelationshipAllergyData);
	entryRelationshipData.appendChild(observationXmlContent);
	actSectionData.appendChild(entryRelationshipData);
	entrySectionData.appendChild(actSectionData);
	sectionData.appendChild(entrySectionData);
}
newAllergyIntoleranceData.appendChild(sectionData);

return newAllergyIntoleranceData;

}else if(parseAllergyIntolerance['data'].length==0){
	var sectionData						= new XML('<section></section>');
	createSegment('templateId',sectionData);
	createSegment('templateId',sectionData,1);
	sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.6.1";
	sectionData['templateId'][1]['@extension']	= '2015-08-01';
	sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.6.1";
	sectionData['code']['@code']				= "48765-2";
	sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
	sectionData['code']['@codeSystemName']		= "LOINC";
	sectionData['code']['@displayName']		= "Allergies, Adverse Reactions, Alerts";
	sectionData['title']					= "Allergies and Intolerances";
	sectionData['text']						= "No Allergies found";
	// No Allergy Detected <entry> section
	var allergy_no_entry_section				= (<entry typeCode="DRIV">
						<act classCode="ACT" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.30" extension="2015-08-01"/>
							<templateId root="2.16.840.1.113883.10.20.22.4.30"/>
							<id root="36e3e930-7b15-11db-9fe1-0800200c9a66"/>
							<code code="CONC" codeSystem="2.16.840.1.113883.5.6"/>
							<statusCode code="active"/>
							<effectiveTime>
								<low nullFlavor="NI"/>
							</effectiveTime>
							<entryRelationship typeCode="SUBJ">
								<observation classCode="OBS" moodCode="EVN" negationInd="true">
									<templateId root="2.16.840.1.113883.10.20.22.4.7" extension="2014-06-09"/>
									<templateId root="2.16.840.1.113883.10.20.22.4.7"/>
									<id root="4adc1020-7b16-11db-9fe1-0800200c9a66"/>
									<code code="ASSERTION" codeSystem="2.16.840.1.113883.5.4"/>
									<statusCode code="completed"/>
									<effectiveTime nullFlavor="NA"/>
									<value type="CD" code="419199007"
										displayName="Allergy to substance (disorder)"
										codeSystem="2.16.840.1.113883.6.96"
										codeSystemName="SNOMED-CT">
									</value>							
									<participant typeCode="CSM">
										<participantRole classCode="MANU">
											<playingEntity classCode="MMAT">
												<code nullFlavor="NA"/>
											</playingEntity>
										</participantRole>
									</participant>
								</observation>
							</entryRelationship>
						</act>
					</entry>);

	sectionData.appendChild(allergy_no_entry_section);

	newAllergyIntoleranceData.appendChild(sectionData);

	return newAllergyIntoleranceData;
}

}