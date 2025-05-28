// Create Payor Section

function createPayorSectionCCDA(msg){

var parseInsurance 						= JSON.parse(msg);
var newPatientInsuranceData 				= new XML("<component></component>");

if(parseInsurance['data'].length!=0){
	
var sectionData						= new XML("<section></section>");
createSegment('templateId',sectionData);
createSegment('templateId',sectionData,1);
sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.18";
sectionData['templateId'][1]['@extension']	= '2015-08-01';
sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.18";
sectionData['code']['@code']				= "48768-6";
sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
sectionData['code']['@codeSystemName']		= "LOINC";
sectionData['code']['@displayName']		= "Payers";
sectionData['title']					= "Payers";
var textPortionOfInsurance				= new XML('<text></text>');
var tablePortion 						= new XML('<table></table>');
tablePortion['@border']					= "1";
tablePortion['@width']					= "100%";
var tableHeaderContent					= new XML('<thead>'+
									'<tr>'+
									'<th>Insurance Plan Name</th>'+
									'<th>Policy Number</th>'+
									'<th>Group ID</th>'+
									'<th>Insurance Plan Phone</th>'+
									'<th>Insurance Plan Address</th>'+
									'</tr>'+
									'</thead>');
									
tablePortion.appendChild(tableHeaderContent);

var tbody								= new XML("<tbody></tbody>");

for(x=0;x<parseInsurance['data'].length;x++){
	
	var insurance_plan_address = "";
	if(parseInsurance['data'][x]['insurance_plan_address']==null){
		insurance_plan_address = "-";
	}else{
		insurance_plan_address = parseInsurance['data'][x]['insurance_plan_address'];
	}
	
	var insurance_plan_phone = "";
	if(parseInsurance['data'][x]['insurance_plan_phone']==null){
		insurance_plan_phone = "-";
	}else{
		insurance_plan_phone = parseInsurance['data'][x]['insurance_plan_phone'];
	}
	
	var policy_number = "";
	if(parseInsurance['data'][x]['policy_number']==null){
		policy_number = "-";
	}else{
		policy_number = parseInsurance['data'][x]['policy_number'];
	}
	
	var group_id = "";
	if(parseInsurance['data'][x]['group_id']==null){
		group_id = "-";
	}else{
		group_id = parseInsurance['data'][x]['group_id'];
	}
	
	var tbodyTr						= new XML('<tr></tr>');
	tbodyTr['td'][0]					= parseInsurance['data'][x]['insurance_plan_name'];
	tbodyTr['td'][1]					= policy_number;
	tbodyTr['td'][2]					= group_id;
	tbodyTr['td'][3]					= insurance_plan_phone;
	tbodyTr['td'][4]					= insurance_plan_address;
	tbody.appendChild(tbodyTr);
	
}

tablePortion.appendChild(tbody);
textPortionOfInsurance.appendChild(tablePortion);
sectionData.appendChild(textPortionOfInsurance);

for(x=0;x<parseInsurance['data'].length;x++){
	
	var entrySectionData 							= new XML('<entry></entry>');
	entrySectionData['@typeCode']						= "DRIV";
	
	var actSectionData								= new XML('<act></act>');
	actSectionData['@classCode'] 						= "ACT";
	actSectionData['@moodCode'] 						= "EVN";
	createSegment('templateId',actSectionData)
	createSegment('templateId',actSectionData,1)
	actSectionData['templateId'][0]['@root']			= "2.16.840.1.113883.10.20.22.4.60";
	actSectionData['templateId'][1]['@root']			= "2.16.840.1.113883.10.20.22.4.60";
	actSectionData['templateId'][1]['@extension']		= '2015-08-01';
	actSectionData['id']['@root']						= "2.16.840.1.113883.4.391";
	actSectionData['code']['@code']					= "48768-6";
	actSectionData['code']['@codeSystem']				= "2.16.840.1.113883.6.1";
	actSectionData['code']['@codeSystemName']			= "LOINC";
	actSectionData['code']['@displayName']				= "Payment sources";
	actSectionData['statusCode']['@code']				= "completed";
	
	var entryRelationshipData						= new XML('<entryRelationship></entryRelationship>');
	entryRelationshipData['@typeCode']					= "COMP";
	entryRelationshipData['sequenceNumber']['@value'] 	= "1";
	
	var secondActRelationshipData						= new XML('<act></act>');
	secondActRelationshipData['@classCode']				= "ACT";
	secondActRelationshipData['@moodCode']				= "EVN";
	createSegment('templateId',secondActRelationshipData)
	createSegment('templateId',secondActRelationshipData,1)
	secondActRelationshipData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.4.61";
	secondActRelationshipData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.4.61";
	secondActRelationshipData['templateId'][1]['@extension']	= '2015-08-01';
	secondActRelationshipData['id']['@root']			= "2.16.840.1.113883.4.391";
	secondActRelationshipData['id']['@extension']		= UUIDGenerator.getUUID();

	secondActRelationshipData.appendChild(<code type="CE" code="CI" codeSystem="2.16.840.1.113883.6.255.1336">
										<translation code="7" codeSystem="2.16.840.1.113883.3.221.5" codeSystemName="Source of Payment Typology (PHDSC)" displayName={parseInsurance['data'][x]['insurance_plan_name']}/>
									</code>);
	secondActRelationshipData['statusCode']['@code']		= "completed";
	var performerPayorData							= new XML('<performer></performer>');
	performerPayorData['@typeCode']					= "PRF";
	createSegment('templateId',performerPayorData)
	createSegment('templateId',performerPayorData,1)
	performerPayorData['templateId'][0]['@root']			= "2.16.840.1.113883.10.20.22.4.87";
	performerPayorData['templateId'][1]['@root']			= "2.16.840.1.113883.10.20.22.4.87";
	performerPayorData['templateId'][1]['@extension']		= '2015-08-01';
	var assignedEntity								= new XML('<assignedEntity></assignedEntity>');
	assignedEntity['id']['@root']						= "2.16.840.1.113883.4.391";
	assignedEntity['id']['@extension']					= UUIDGenerator.getUUID();
	assignedEntity['code']['@code']					= "PAYOR";
	assignedEntity['code']['@codeSystem']				= "2.16.840.1.113883.5.110";
	assignedEntity['code']['@codeSystemName']			= "RoleClass";
	assignedEntity['code']['@displayName']				= "Invoice Payor";
	var representedOrganization						= new XML('<representedOrganization></representedOrganization>');
	representedOrganization['name']					= parseInsurance['data'][x]['insurance_plan_name'];
	representedOrganization['telecom']['@value']			= parseInsurance['data'][x]['insurance_plan_phone'];
	var orgAddr									= new XML('<addr></addr>');
	orgAddr['@use']								= "PST";
	orgAddr['city']								= "hardcoded";
	orgAddr['streetAddressLine']						= parseInsurance['data'][x]['insurance_plan_address'];
	orgAddr['state']								= "hardcoded";
	orgAddr['country']								= "US";
	orgAddr['postalCode']							= "hardcoded";
	representedOrganization.appendChild(orgAddr);
	assignedEntity.appendChild(representedOrganization);
	performerPayorData.appendChild(assignedEntity);
	secondActRelationshipData.appendChild(performerPayorData);
	// participant
	var participantXml								= new XML('<participant></participant>');
	participantXml['@typeCode']						= "COV";
	createSegment('templateId',participantXml)
	createSegment('templateId',participantXml,1)
	participantXml['templateId'][0]['@root']				= "2.16.840.1.113883.10.20.22.4.89";
	participantXml['templateId'][1]['@root']				= "2.16.840.1.113883.10.20.22.4.89";
	participantXml['templateId'][1]['@extension']			= '2015-08-01';
	var participantTime								= new XML('<time></time>');
	participantTime['low']['@nullFlavor']				= 'NI';
	var participantRole								= new XML('<participantRole></participantRole>');
	participantRole['id']['@root']					= '2.16.840.1.113883.19';
	participantRole['id']['@extension']				= parseInsurance['data'][x]['insurance_id'];
	participantRole['code']['@code']					= 'SELF';
	participantRole['code']['@codeSystem']				= '2.16.840.1.113883.5.111';
	participantRole['code']['@codeSystemName']			= 'RoleCode';
	participantRole['code']['@displayName']				= 'Self';
	var orgAddr									= new XML('<addr></addr>');
	orgAddr['@use']								= "PST";
	orgAddr['city']								= "hardcoded";
	orgAddr['streetAddressLine']						= parseInsurance['data'][x]['insurance_plan_address'];
	orgAddr['state']								= "hardcoded";
	orgAddr['country']								= "US";
	orgAddr['postalCode']							= "hardcoded";
	participantRole.appendChild(orgAddr);
	participantXml.appendChild(participantTime);
	participantXml.appendChild(participantRole);
	secondActRelationshipData.appendChild(participantXml);
	entryRelationshipData.appendChild(secondActRelationshipData);
	actSectionData.appendChild(entryRelationshipData);
	entrySectionData.appendChild(actSectionData);
	
sectionData.appendChild(entrySectionData);
}


newPatientInsuranceData.appendChild(sectionData);

return newPatientInsuranceData;

}else if(parseInsurance['data'].length==0){
	var sectionData						= new XML('<section nullFlavor="NI"/>');
	createSegment('templateId',sectionData);
	createSegment('templateId',sectionData,1);
	sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.18";
	sectionData['templateId'][1]['@extension']	= '2015-08-01';
	sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.18";
	sectionData['code']['@code']				= "48768-6";
	sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
	sectionData['code']['@codeSystemName']		= "LOINC";
	sectionData['code']['@displayName']		= "Payers";
	sectionData['title']					= "Payers";
	sectionData['text']						= "No Payers found";

	newPatientInsuranceData.appendChild(sectionData);

	return newPatientInsuranceData;
}
}