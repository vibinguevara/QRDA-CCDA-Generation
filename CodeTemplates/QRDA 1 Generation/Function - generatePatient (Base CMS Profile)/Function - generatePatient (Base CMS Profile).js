function generatePatient(patientData) {
    return (<recordTarget>
        <patientRole>
            	<id extension={patientData.mrn} root="1.3.6.1.4.1.115" />
     		<id extension={patientData.hws_id} root="2.16.840.1.113883.4.927" />
             	<addr>
                    <streetAddressLine>{patientData.address.street}</streetAddressLine>
                    <city>{patientData.address.city}</city>
                    <state>{patientData.address.state}</state>
                    <postalCode>{patientData.address.postalCode}</postalCode>
                </addr>
                <telecom use="HP" value={"tel:"+patientData.phoneNumber}/>
                <telecom use="HP" value={"mailto:"+patientData.emailID}/>
            	<patient>
	                <name>
	                    <given>{patientData.firstName}</given>
	                    <family>{patientData.lastName}</family>
	                </name>
	                <administrativeGenderCode code={patientData.gender} codeSystem="2.16.840.1.113883.5.1"/>
	                <birthTime value={patientData.birthTime}/>
	                <raceCode code={patientData.raceCode} codeSystem="2.16.840.1.113883.6.238" codeSystemName="CDCREC"/>
	                <ethnicGroupCode code={patientData.ethnicCode} codeSystem="2.16.840.1.113883.6.238" codeSystemName="CDCREC"/>
	                <languageCommunication>
	                	<templateId root="2.16.840.1.113883.3.88.11.83.2" assigningAuthorityName="HITSP/C83"/>
			        	<templateId root="1.3.6.1.4.1.19376.1.5.3.1.2.1" assigningAuthorityName="IHE/PCC"/>
			        	<languageCode code="eng"/>
	                </languageCommunication>
            	</patient>
        </patientRole>
    </recordTarget>);
}
