function generateQRDA1(patientData, measuretype) {
 
    var patientDataParsed = JSON.parse(patientData);
	
    var qrda = <ClinicalDocument xmlns="urn:hl7-org:v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>;
    qrda.appendChild(<realmCode code="US"/>);
    qrda.appendChild(<typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040"/>);
    qrda.appendChild(<templateId root="2.16.840.1.113883.10.20.22.1.1" extension="2015-08-01"/>);
    qrda.appendChild(<templateId root="2.16.840.1.113883.10.20.24.1.1" extension="2017-08-01"/>);
    qrda.appendChild(<templateId root="2.16.840.1.113883.10.20.24.1.2" extension="2021-08-01"/>);
    qrda.appendChild(<templateId root="2.16.840.1.113883.10.20.24.1.3" extension="2022-02-01"/>);
    qrda.appendChild(<id root={generateGuid()}/>)
    qrda.appendChild(<code code="55182-0" codeSystem="2.16.840.1.113883.6.1"/>)
    qrda.appendChild(<title>QRDA Incidence Report</title>);
    qrda.appendChild(<effectiveTime value={DateUtil.getCurrentDate('yyyyyMMddHHmmsss')}/>);
    qrda.appendChild(<confidentialityCode code="N" codeSystem="2.16.840.1.113883.5.25"/>);
    qrda.appendChild(<languageCode code="en"/>);

    // Append Record Target Section
    // Before <Component> Begins
    qrda.appendChild(generatePatient(patientDataParsed.patient));
    var componentBody = (<component/>);
    var structuredBodyData = (<structuredBody/>);
    structuredBodyData.appendChild(generateMeasureSection(measuretype));
    structuredBodyData.appendChild(generatePatientData(patientDataParsed.patientData,measuretype));
    structuredBodyData.appendChild(generateReportingParams(patientDataParsed.reportingPeriod));
    componentBody.appendChild(structuredBodyData);
    qrda.appendChild(componentBody);

    return qrda.toXMLString();
}