
function createImmunizationSectionCCDA(msg){

var parseImmunizations 					= JSON.parse(msg);
var newPatientImmunizationData 			= new XML("<component></component>");

if(parseImmunizations['data'].length!=0){

var sectionData						= new XML("<section></section>");
createSegment('templateId',sectionData)
createSegment('templateId',sectionData,1)
sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.2.1";
sectionData['templateId'][1]['@extension']	= '2015-08-01';//DateUtil.getCurrentDate('yyyy-MM-dd');
sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.2.1";
sectionData['code']['@code']				= "11369-6";
sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
sectionData['code']['@codeSystemName']		= "LOINC";
sectionData['code']['@displayName']		= "History of immunizations";
sectionData['title']					= "History of immunizations";
var textPortionOfImmunizations			= new XML('<text></text>');
var tablePortion 						= new XML('<table></table>');
tablePortion['@border']					= "1";
tablePortion['@width']					= "100%";
// header of the table
var tableHeaderContent					= new XML('<thead>'+
									'<tr>'+
									'<th>Vaccine Name</th>'+
									'<th>Date Received</th>'+
									'</tr>'+
									'</thead>');
tablePortion.appendChild(tableHeaderContent);
//if(parseImmunizations.data && parseImmunizations.data.length > 0 ){
	var tbody								= new XML("<tbody></tbody>");
	for(x=0;x<parseImmunizations['data'].length;x++){
		// UI portion that reflects in PDF
		if(parseImmunizations['data'][x]['vaccine_display_name'] && parseImmunizations['data'][x]['received_date']){
			var tbodyTr						= new XML('<tr></tr>');
			tbodyTr['td'][0]					= parseImmunizations['data'][x]['vaccine_display_name'];	
			tbodyTr['td'][1]					= DateUtil.convertDate('yyyy-MM-dd', 'MMM dd, yyyy', parseImmunizations['data'][x]['received_date']);
			tbody.appendChild(tbodyTr);
		}
	}
	tablePortion.appendChild(tbody);
//}
textPortionOfImmunizations.appendChild(tablePortion);
sectionData.appendChild(textPortionOfImmunizations);
for(x=0;x<parseImmunizations['data'].length;x++){
	if(parseImmunizations['data'][x]['vaccine_display_name']!=""){
		var entrySectionData 											= new XML('<entry></entry>');
		entrySectionData['@typeCode']										= "DRIV";
		var substanceAdministrationSectionData								= new XML('<substanceAdministration></substanceAdministration>');
		substanceAdministrationSectionData['@classCode'] 						= "SBADM";
		substanceAdministrationSectionData['@moodCode'] 						= "EVN";
		substanceAdministrationSectionData['@negationInd'] 					= "false";
		createSegment('templateId',substanceAdministrationSectionData);
		createSegment('templateId',substanceAdministrationSectionData,1);
		substanceAdministrationSectionData['templateId'][0]['@root']			= "2.16.840.1.113883.10.20.22.4.52";
		substanceAdministrationSectionData['templateId'][1]['@root']			= "2.16.840.1.113883.10.20.22.4.52";
		substanceAdministrationSectionData['templateId'][1]['@extension']		= '2015-08-01';
		substanceAdministrationSectionData['id']['@root']						= "2.16.840.1.113883.3.3388.1.1.1.644339.3.157873079.1.4.1";
		substanceAdministrationSectionData['id']['@extension']					= parseImmunizations['data'][x]['immunization_id'];
		substanceAdministrationSectionData['statusCode']['@code']				= "completed";
		var effectiveTimeXml											= new XML('<effectiveTime></effectiveTime>');
		// API is missing immuization taken date
		effectiveTimeXml['@value']										= DateUtil.getCurrentDate('yyyyMMdd');
		substanceAdministrationSectionData.appendChild(effectiveTimeXml);
		substanceAdministrationSectionData.appendChild(<doseQuantity nullFlavor='UNK'/>);
		var consumable													= new XML('<consumable></consumable>');
		var manufacturedProduct											= new XML('<manufacturedProduct></manufacturedProduct>');
		manufacturedProduct['@classCode']									= "MANU";
		createSegment('templateId',manufacturedProduct)
		createSegment('templateId',manufacturedProduct,1)
		manufacturedProduct['templateId'][0]['@root']							= "2.16.840.1.113883.10.20.22.4.54";
		manufacturedProduct['templateId'][1]['@root']							= "2.16.840.1.113883.10.20.22.4.54";
		manufacturedProduct['templateId'][1]['@extension']						= '2015-08-01';
		var manufacturedMaterial											= new XML('<manufacturedMaterial></manufacturedMaterial>');
		var manufacturedMaterialCode										= new XML('<code></code>');
		manufacturedMaterialCode['@code']									= '208';
		manufacturedMaterialCode['@displayName']							= parseImmunizations['data'][x]['vaccine_display_name'];
		manufacturedMaterialCode['@codeSystem']								= "2.16.840.1.113883.12.292";
		manufacturedMaterialCode['@codeSystemName']							= "CVX";
		manufacturedMaterial.appendChild(manufacturedMaterialCode);
		manufacturedProduct.appendChild(manufacturedMaterial);
		consumable.appendChild(manufacturedProduct);
		substanceAdministrationSectionData.appendChild(consumable);
		entrySectionData.appendChild(substanceAdministrationSectionData);
		sectionData.appendChild(entrySectionData);
	}
}

newPatientImmunizationData.appendChild(sectionData);

return newPatientImmunizationData;

}else if(parseImmunizations['data'].length==0){
	var sectionData						= new XML('<section nullFlavor="NI"/>');
	createSegment('templateId',sectionData)
	createSegment('templateId',sectionData,1)
	sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.2.1";
	sectionData['templateId'][1]['@extension']	= '2015-08-01';//DateUtil.getCurrentDate('yyyy-MM-dd');
	sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.2.1";
	sectionData['code']['@code']				= "11369-6";
	sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
	sectionData['code']['@codeSystemName']		= "LOINC";
	sectionData['code']['@displayName']		= "History of immunizations";
	sectionData['title']					= "History of immunizations";
	sectionData['text']						= "NO Immunization Found";

	newPatientImmunizationData.appendChild(sectionData);

	return newPatientImmunizationData;
}

}