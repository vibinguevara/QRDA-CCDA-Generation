function generatePatient(patientData) {
    return (<recordTarget>
        <patientRole>
            <id extension={patientData.id} root="2.16.840.1.113883.4.1"/>
             <addr>
                    <streetAddressLine>{patientData.address.street}</streetAddressLine>
                    <city>{patientData.address.city}</city>
                    <state>{patientData.address.state}</state>
                    <postalCode>{patientData.address.postalCode}</postalCode>
                </addr>
            <patient>
                <name>
                    <given>{patientData.firstName}</given>
                    <family>{patientData.lastName}</family>
                </name>
                <administrativeGenderCode code={patientData.gender} codeSystem="2.16.840.1.113883.5.1"/>
                <birthTime value={patientData.birthTime}/>
            </patient>
        </patientRole>
    </recordTarget>);
}
