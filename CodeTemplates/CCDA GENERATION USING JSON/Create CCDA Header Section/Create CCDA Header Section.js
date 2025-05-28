
function generateCcdaHeader(orgId){

var currentDate = DateUtil.getCurrentDate('yyyy-MM-dd');
var currentDateTime = DateUtil.getCurrentDate('yyyyMMddHHmmss');

var ccdaHeaderSection = new XML('<realmCode code="US"/>'+
	'<typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>'+
	'<templateId root="2.16.840.1.113883.10.20.22.1.1"/>'+
	'<templateId root="2.16.840.1.113883.10.20.22.1.1" extension="'+currentDate+'"/>'+
	'<templateId root="2.16.840.1.113883.10.20.22.1.2"/>'+
	'<templateId root="2.16.840.1.113883.10.20.22.1.2" extension="'+currentDate+'"/>'+
	'<id root="2.16.840.1.113883.3.3388.1.1.1.1117548" extension="'+UUIDGenerator.getUUID()+'/>'+
	'<code code="34133-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="SUMMARIZATION OF EPISODE NOTE"/>'+
	'<title>Transition of care</title>'+
	'<effectiveTime value="'+currentDateTime+'"/>'+
	'<confidentialityCode code="R" codeSystem="2.16.840.1.113883.5.25" codeSystemName="Confidentiality" displayName="Restricted"/>'+
	'<languageCode code="en-US"/>')

return ccdaHeaderSection;
}