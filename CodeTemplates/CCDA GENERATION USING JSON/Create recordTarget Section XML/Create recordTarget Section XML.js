
function recordTargetSection(jsonData,doctorEmail){
	
var parseJsonData = JSON.parse(jsonData);
var cityName 		= "";

var suffixName = "";
if(parseJsonData['data'][0]['resource']['nameSuffix']!=""){
	suffixName= '<suffix>'+parseJsonData['data'][0]['resource']['nameSuffix']+'</suffix>';
}
if(parseJsonData['data'][0]['resource']['address']==undefined || parseJsonData['data'][0]['resource']['address']==""){
	cityName = '-';
}else{
	cityName = parseJsonData['data'][0]['resource']['address'][0]['city']
}

var middle_name = "";
if(parseJsonData['data'][0]['resource']['name'][0]['given'][1]){
	middle_name = '<given>' + parseJsonData['data'][0]['resource']['name'][0]['given'][1] + '</given>' ;
}

var stateName	= "";

if(parseJsonData['data'][0]['resource']['address'][0]['state']==undefined || parseJsonData['data'][0]['resource']['address'][0]['state']==""){
	stateName = '';
}else{
	stateName = parseJsonData['data'][0]['resource']['address'][0]['state']
}

var postalCode = "";

if(parseJsonData['data'][0]['resource']['address'][0]['postalCode']==undefined || parseJsonData['data'][0]['resource']['address'][0]['postalCode'] == ""){
	postalCode = "";
}else{
	postalCode = parseJsonData['data'][0]['resource']['address'][0]['postalCode'];
}

var line = "";
if(parseJsonData['data'][0]['resource']['address']==undefined || parseJsonData['data'][0]['resource']['address']==""){
	line = "-";
}else{
	line = parseJsonData['data'][0]['resource']['address'][0]['line'][0];
}

// Add language Dynamic
var patient_language = "";
if(parseJsonData['data'][0]['resource']['communication'][0]['language']['coding'][0]['code']=='en'){
	patient_language = '<languageCommunication>'+
                '<languageCode code="en"/>'+
               ' <modeCode code="ESP" displayName="Expressed spoken" codeSystem="2.16.840.1.113883.5.60" codeSystemName="LanguageAbilityMode"/>'+
                '<proficiencyLevelCode code="E" displayName="Excellent" codeSystem="2.16.840.1.113883.5.61" codeSystemName="LanguageAbilityProficiency"/>'+
                '<preferenceInd value="true"/>'+
            '</languageCommunication>'
}



var homePhone = "";
var homePhoneXml = "";
var secondPhone = "";
var secondPhoneXml = "";
var email = "";
var directDoctorEmail = doctorEmail;

for(var communicationValue=0;communicationValue < parseJsonData['data'][0]['resource']['telecom'].length;communicationValue++){

	if(parseJsonData['data'][0]['resource']['telecom'][communicationValue]['system']){
		
		if(parseJsonData['data'][0]['resource']['telecom'][communicationValue]['system']=="PHONE")
		{
			
			homePhone = '+'+parseJsonData['data'][0]['resource']['telecom'][communicationValue]['country_code']+' '+parseJsonData['data'][0]['resource']['telecom'][communicationValue]['value'];
			homePhoneXml = '<telecom value="tel:' + homePhone + '" use="MC"/>' ;
		}else{
			homePhone = "";
		}
		if(parseJsonData['data'][0]['resource']['telecom'][communicationValue]['system']=="EMAIL")
		{
			email = parseJsonData['data'][0]['resource']['telecom'][communicationValue]['value'];
		}
		if(parseJsonData['data'][0]['resource']['telecom'][communicationValue]['system']=="WORK-PHONE")
		{
			secondPhone = '+'+parseJsonData['data'][0]['resource']['telecom'][communicationValue]['country_code']+' '+parseJsonData['data'][0]['resource']['telecom'][communicationValue]['value'];
			secondPhoneXml = '<telecom value="tel:' + secondPhone + '" use="HP"/>' ;
		}else{
			secondPhone = null;
		}
		
	}
}


    var recordTargetXml = new XML('<recordTarget>' +
        '<patientRole>' +
        '<id root="2.16.840.1.113883.3.3388.1.1.1.1117548.3" extension="' + UUIDGenerator.getUUID() + '" />' +
        '<id root="2.16.840.1.113883.3.3388.3.3" extension="' + parseJsonData['data'][0]['resource']['mrid'] + '" />' +
        '<id root="2.16.840.1.113883.3.3388.3.4" extension="' + parseJsonData['data'][0]['id'] + '" />' +
        '<addr use="HP">' +
        '<city>' + cityName.toString().replace(/undefined/g, '') + '</city>' +
        '<streetAddressLine>' + line.toString().replace(/undefined/g, '') + '</streetAddressLine>' +
        '<state>' + stateName.toString().replace(/undefined/g, '') + '</state>' +
        '<country>USA</country>' +
        '<postalCode>' + postalCode.toString().replace(/undefined/g, '') + '</postalCode>' +
        '</addr>' +
        homePhoneXml + 
       secondPhoneXml + 
        '<patient>' +
        '<name use="L">' +
        '<given>' + parseJsonData['data'][0]['resource']['name'][0]['given'][0] + '</given>' +
        middle_name +
        '<family>' + parseJsonData['data'][0]['resource']['name'][0]['family'] + '</family>' +
        suffixName+
        '</name>' +
        '<administrativeGenderCode code="' + determineGender(parseJsonData['data'][0]['resource']['gender']) + '" codeSystem="2.16.840.1.113883.5.1"/>' +
        '<birthTime value="' + DateUtil.convertDate('yyyy-MM-dd', 'yyyyMMdd', parseJsonData['data'][0]['resource']['birthDate']) + '"/>' +
        '<raceCode nullFlavor="NASK" />' +
        '<ethnicGroupCode nullFlavor="NASK" />' +
        patient_language +
        '</patient>' +
        '<providerOrganization>' +
        '<id root="2.16.840.1.113883.3.3388.1.1.1.1117548" />' +
        '<name>Medical Office Force, LLC.</name>' +
        '<telecom use="WP" value="tel:+1(877)581-8810" />' +
        '<addr use="WP">' +
        '<streetAddressLine>2005 Prince Ave</streetAddressLine>' +
        '<city>Athens</city>' +
        '<state>GA</state>' +
        '<postalCode>30606</postalCode>' +
        '<country>United States of America</country>' +
        '</addr>' +
        '</providerOrganization>' +
        '</patientRole>' +
        '</recordTarget>');

	// Hard coded with Medical Office Force EHR details
    var authorXml = new XML('<author>' +
        '<time value="20150722" />' +
        '<assignedAuthor>' +
        '<id extension="111111" root="2.16.840.1.113883.4.6"/>' +
        '<code code="200000000X" codeSystem="2.16.840.1.113883.6.101" displayName="Allopathic &amp; Osteopathic Physicians"/>' +
        '<addr use="WP">' +
        '<streetAddressLine>731 Market St #400</streetAddressLine>' +
        '<city>San Francisco</city>' +
        '<state>CA</state>' +
        '<postalCode>94103</postalCode>' +
        '<country>US</country>' +
        '</addr>' +
        '<telecom use="WP" value="tel:+1(555)-555-1002" />' +
        '<assignedAuthoringDevice>' +
        '<manufacturerModelName>Neighborhood Physicians Practice EMR</manufacturerModelName>' +
        '<softwareName>Amb EMR v1.0</softwareName>' +
        '</assignedAuthoringDevice>' +
        '<representedOrganization>' +
        '<id root="2.16.840.1.113883.19.5"/>'+
        '<name>Neighborhood Physicians Practice</name>'+
        /*
        '<id root="2.16.840.1.113883.3.3388.3.1" extension="43a8e450-2a5f-4bcc-82b7-87a7e24e2641" />' +
        '<id nullFlavor="UNK" root="2.16.840.1.113883.4.6" />' +
        '<id root="2.16.840.1.113883.3.3388.1.1.1.1117548" />' +
        '<name>Medical Office Force, LLC.</name>' +
        '<addr use="WP">' +
        '<streetAddressLine>2005 Prince Ave</streetAddressLine>' +
        '<city>Athens</city>' +
        '<state>GA</state>' +
        '<postalCode>30606</postalCode>' +
        '<country>United States of America</country>' +
        '</addr>' +
        */
        '</representedOrganization>' +
        '</assignedAuthor>' +
        '</author>');

	// Note: 2.16.840.1.113883.3.3388 is the registered OID for Practice Fusion
    var dataEnterer = new XML('<dataEnterer>' +
        '<assignedEntity>' +
        '<id root="2.16.840.1.113883.4.6" extension="1962167874" />' +
        '<id root="2.16.840.1.113883.3.3388.3.9" extension="5e6c1978-10b6-47ab-a453-1a66d83c3514" />' +
        '<id root="2.16.840.1.113883.3.3388.3.2" extension="925d01f1-b254-46e8-84a0-4dee0cd4fc75" />' +
        '<id root="2.16.840.1.113883.3.3388.3.6" extension="UFDT-HAWW4" />' +
        '<addr use="WP">' +
        '<streetAddressLine>2005 Prince Ave</streetAddressLine>' +
        '<city>Athens</city>' +
        '<state>GA</state>' +
        '<postalCode>30606</postalCode>' +
        '<country>United States of America</country>' +
        '</addr>' +
        '<telecom use="WP" value="tel:+1(877)581-8810" />' +
        '<assignedPerson>' +
        '<name>' +
        '<given>Subodh</given>' +
        '<family>Agrawal</family>' +
        '</name>' +
        '</assignedPerson>' +
        '</assignedEntity>' +
        '</dataEnterer>');

// Note: 2.16.840.1.113883.3.3388 is the registered OID for Practice Fusion
    var custodian = new XML('<custodian>' +
        '<assignedCustodian>' +
        '<representedCustodianOrganization>' +
        '<id root="2.16.840.1.113883.3.3388.1.1.1.1117548" extension="POCD_HD000040" />' +
        '<name>Medical Office Force, LLC.</name>' +
        '<telecom use="WP" value="tel:+1(312)208-9377" />' +
        '<addr use="WP">' +
        '<streetAddressLine>2005 Prince Ave</streetAddressLine>' +
        '<city>Athens</city>' +
        '<state>GA</state>' +
        '<postalCode>30606</postalCode>' +
        '<country>United States of America</country>' +
        '</addr>' +
        '</representedCustodianOrganization>' +
        '</assignedCustodian>' +
        '</custodian>');

    var documentationOf = new XML('<documentationOf>' +
        '<serviceEvent classCode="PCPR" moodCode="EVN">' +
        //'<effectiveTime type="IVL_TS">' +
        '<effectiveTime>'+
        '<low value="'+DateUtil.getCurrentDate('yyyyMMddHHmmss')+'+0000'+'" />' +
        '<high nullFlavor="NI" />' +
        '</effectiveTime>' +
        '</serviceEvent>' +
        '</documentationOf>');

    var componentOf = new XML('<componentOf>' +
        '<encompassingEncounter>' +
        '<id root="2.16.840.1.113883.3.3388.1.1.1.1117548.4.1.4" extension="560719788" />' +
        //'<effectiveTime type="IVL_TS">' +
        '<effectiveTime>'+
        '<low value="'+DateUtil.getCurrentDate('yyyyMMddHHmmss')+'+0000'+'" />' +
        '<high value="'+DateUtil.getCurrentDate('yyyyMMddHHmmss')+'+0000'+'" />' +
        '</effectiveTime>' +
        '</encompassingEncounter>' +
        '</componentOf>');

     // Concatenate all the E4X XML nodes into one XMLList and return
	return new XMLList(recordTargetXml + authorXml + dataEnterer + custodian + documentationOf + componentOf);


}