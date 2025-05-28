function generatePatientData(patientData,measureType) {

     var generatePatientData = new XML('<component/>');
     var generateSectionData = new XML('<section/>');
     generateSectionData.appendChild(<templateId root="2.16.840.1.113883.10.20.17.2.4"/>);
     generateSectionData.appendChild(<templateId root="2.16.840.1.113883.10.20.24.2.1" extension="2021-08-01"/>);
     generateSectionData.appendChild(<templateId root="2.16.840.1.113883.10.20.24.2.1.1" extension="2020-02-01"/>);
     generateSectionData.appendChild(<code code="55188-7" codeSystem="2.16.840.1.113883.6.1"/>);
     generateSectionData.appendChild(<title>Patient Data</title>);
     generateSectionData.appendChild(<text/>);
     if(measureType=="CMS165v13"){
     	generateSectionData.appendChild(generateEncounterData(patientData.encounter));
     	generateSectionData.appendChild(generateDiagnosisData(patientData.diagnosis));
     	generateSectionData.appendChild(generateBloodPressureObservation(patientData.bloodPressure));
     }
     generatePatientData.appendChild(generateSectionData);

     return generatePatientData;
               
}
