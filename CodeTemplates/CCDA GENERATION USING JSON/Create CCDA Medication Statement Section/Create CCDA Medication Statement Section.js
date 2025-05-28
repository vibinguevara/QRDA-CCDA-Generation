function createMedicationStatementSectionCCDA(msg){
	
var parseMedicationStatement 		= JSON.parse(msg);
var newPatientMedicationData 		= new XML("<component></component>");

if(parseMedicationStatement['data'].length!=0){
	
var sectionData				= new XML("<section></section>");
createSegment('templateId',sectionData)
createSegment('templateId',sectionData,1)
sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.1.1";
sectionData['templateId'][1]['@extension']	= '2014-06-09';
sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.1.1";
sectionData['code']['@code']				= "10160-0";
sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
sectionData['code']['@codeSystemName']		= "LOINC";
sectionData['code']['@displayName']		= "History of Medication Use";
sectionData['title']					= "History of Medication Use";
var textPortionOfMedicationStatement		= new XML('<text></text>');
var tablePortion 						= new XML('<table></table>');
tablePortion['@border']					= "1";
tablePortion['@width']					= "100%";
var tableHeaderContent					= new XML('<thead>'+
									'<tr>'+
									'<th>Brand Name - Generic Name</th>'+
									'<th>Strength/Unit</th>'+
									'<th>Route</th>'+
									'<th>Dose</th>'+
									'<th>Directions</th>'+
									'<th>Effective Date</th>'+
									'<th>Taking</th>'+
									'</tr>'+
									'</thead>');
tablePortion.appendChild(tableHeaderContent);

var tempData = parseMedicationStatement['data'];

var tbody								= new XML("<tbody></tbody>");

for(x=0;x<tempData.length;x++){

	var finalData = tempData[x];
	
	var effective_date="";
	if(finalData['start_date']==null || finalData['start_date']==""){
		effective_date = "-"
	}else{
		effective_date = finalData['start_date'];
	}
	
	var strength						= finalData['strength'];
	var strengthUnit					= finalData['period_unit'];
	var medicineName					= finalData['medication_name'];
	var tbodyTr						= new XML('<tr></tr>');
	tbodyTr['td'][0]					= finalData['medication_name'];
	
	if(strength==null){
		tbodyTr['td'][1]					= strengthUnit;
	}else{
		tbodyTr['td'][1]					= strength;
	}

	if(finalData['route']){
	tbodyTr['td'][2]					= finalData['route'];
	}else{
	tbodyTr['td'][2]					= "-";	
	}

	if(finalData['qty']){
		tbodyTr['td'][3]   					= finalData['qty'];
	}else{
		tbodyTr['td'][3]   					= "-";
	}


	
	if(finalData['directions']){
		tbodyTr['td'][4]   					= finalData['directions'];
	}else{
		tbodyTr['td'][4]   					= "-";
	}
	
	if(effective_date!='-'){
		tbodyTr['td'][5]				= DateUtil.convertDate("MM/dd/yyyy",'MMM dd, yyyy',effective_date);
	}else{
		tbodyTr['td'][5]				= "-";
	}
	
	tbodyTr['td'][6]   					= "Yes";
	tbody.appendChild(tbodyTr);
  
	
}
tablePortion.appendChild(tbody);
textPortionOfMedicationStatement.appendChild(tablePortion);
sectionData.appendChild(textPortionOfMedicationStatement);

for(x=0;x<tempData.length;x++){

	var effective_date="";
	
	if(finalData['start_date']==null || finalData['start_date']==""){
		effective_date = "-"
	}else{
		effective_date = finalData['start_date'];
	}
	
	var strength													= finalData['strength'];
	var finalData 													= tempData[x];	
	var entrySectionData 											= new XML('<entry></entry>');
	entrySectionData['@typeCode']										= "DRIV";
	var substanceAdministrationSectionData								= new XML('<substanceAdministration></substanceAdministration>');
	substanceAdministrationSectionData['@classCode'] 						= "SBADM";
	substanceAdministrationSectionData['@moodCode'] 						= "EVN";
	createSegment('templateId',substanceAdministrationSectionData)
	createSegment('templateId',substanceAdministrationSectionData,1)
	substanceAdministrationSectionData['templateId'][0]['@root']			= "2.16.840.1.113883.10.20.22.4.16";
	substanceAdministrationSectionData['templateId'][1]['@root']			= "2.16.840.1.113883.10.20.22.4.16";
	substanceAdministrationSectionData['templateId'][1]['@extension']		= '2014-06-09';
	substanceAdministrationSectionData['id']['@root']						= "2.16.840.1.113883.3.3388.1.1.1.644339.3.157873079.1.4.1";
	substanceAdministrationSectionData['id']['@extension']					= UUIDGenerator.getUUID();
	substanceAdministrationSectionData['statusCode']['@code']				= "completed";
	var effectiveTimeXml											= new XML('<effectiveTime></effectiveTime>');
	effectiveTimeXml['@type']										= "IVL_TS";
	if(effective_date!='-'){
		effectiveTimeXml['low']['@value']								= DateUtil.convertDate("MM/dd/yyyy",'yyyyMMdd',effective_date);
	}else{
		effectiveTimeXml['low']['@nullFlavor']							= 'NI';
	}
	effectiveTimeXml['high']['@nullFlavor']								= 'NI';
	substanceAdministrationSectionData.appendChild(effectiveTimeXml);
	substanceAdministrationSectionData['doseQuantity']['@nullFlavor']		= 'UNK';
	var consumable													= new XML('<consumable></consumable>');
	var manufacturedProduct											= new XML('<manufacturedProduct></manufacturedProduct>');
	manufacturedProduct['@classCode']									= "MANU";
	createSegment('templateId',manufacturedProduct)
	createSegment('templateId',manufacturedProduct,1)
	manufacturedProduct['templateId'][0]['@root']						= "2.16.840.1.113883.10.20.22.4.23";
	manufacturedProduct['templateId'][1]['@root']						= "2.16.840.1.113883.10.20.22.4.23";
	manufacturedProduct['templateId'][1]['@extension']					= '2014-06-09';
	manufacturedProduct['id']['@root']									= "2.16.840.1.113883.3.3388.1.1.1.644339.3.157873079.1.4.1";
	manufacturedProduct['id']['@extension']								= UUIDGenerator.getUUID();
	var manufacturedMaterial											= new XML('<manufacturedMaterial></manufacturedMaterial>');
	var manufacturedMaterialCode										= new XML('<code></code>');
	manufacturedMaterialCode['@code']									= finalData['rxnorm_code'];
	manufacturedMaterialCode['@displayName']							= finalData['medication_name'];
	manufacturedMaterialCode['@codeSystem']								= "2.16.840.1.113883.6.88";
	manufacturedMaterialCode['@codeSystemName']							= "RxNorm";
	manufacturedMaterial.appendChild(manufacturedMaterialCode);
	manufacturedProduct.appendChild(manufacturedMaterial);
	consumable.appendChild(manufacturedProduct);
	substanceAdministrationSectionData.appendChild(consumable);
	entrySectionData.appendChild(substanceAdministrationSectionData);
	sectionData.appendChild(entrySectionData);


}
newPatientMedicationData.appendChild(sectionData);

return newPatientMedicationData;

}else if(parseMedicationStatement['data'].length==0){
	var sectionData						= new XML('<section nullFlavor="NI"/>');
	createSegment('templateId',sectionData)
	createSegment('templateId',sectionData,1)
	sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.1.1";
	sectionData['templateId'][1]['@extension']	= '2014-06-09';
	sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.1.1";
	sectionData['code']['@code']				= "10160-0";
	sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
	sectionData['code']['@codeSystemName']		= "LOINC";
	sectionData['code']['@displayName']		= "History of Medication Use";
	sectionData['title']					= "History of Medication Use";
	sectionData['text']					= "No Medication Found";

	newPatientMedicationData.appendChild(sectionData);

	return newPatientMedicationData;
}
}