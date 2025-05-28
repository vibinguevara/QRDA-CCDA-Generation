function generateVitalSignsSection(msg) {

var parseVitalSigns 					= JSON.parse(msg);
var newVitalSignsData 				= new XML("<component></component>");
if(parseVitalSigns['data'].length!=0){

var created_date = 	parseVitalSigns['data'][0]['created_date'].toString().split('T')[0];
var altered_created_date = DateUtil.convertDate('yyyy-MM-dd', 'yyyyMMdd', created_date);
var blood_pressure = parseVitalSigns['data'][0]['blood_pressure'].toString();
var diastolic = blood_pressure.split('/')[1];
var systolic = blood_pressure.split('/')[0];
var height = parseVitalSigns['data'][0]['height'].toString();
var weight = parseVitalSigns['data'][0]['weight'].toString();
	
    return(<component>
                <section>
                    <!-- Vital Signs Section templateId (R1.1 + R2.1) -->
                    <templateId root="2.16.840.1.113883.10.20.22.2.4.1"/>
                    <templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.2.4.1"/>
                    <code code="8716-3" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Vital signs"/>
                    <title>Vital Signs</title>
                    <text>
                        <table border="1" width="100%">
                            <thead>
                                <tr>
                                    <th>Date/Time</th>
                                    <th>Vital Sign</th>
                                    <th>Value</th>
                                    <th>Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{created_date}</td>
                                    <td>Blood Pressure</td>
                                    <td>{diastolic}</td>
                                    <td>mm[Hg]</td>
                                </tr>
                                <tr>
                                    <td>{created_date}</td>
                                    <td>Blood Pressure</td>
                                    <td>{systolic}</td>
                                    <td>mm[Hg]</td>
                                </tr>
                                <tr>
                                    <td>{created_date}</td>
                                    <td>Height</td>
                                    <td>{height}</td>
                                    <td>cm</td>
                                </tr>
                                <tr>
                                    <td>{created_date}</td>
                                    <td>Weight</td>
                                    <td>{weight}</td>
                                    <td>kg</td>
                                </tr>
                            </tbody>
                        </table>
                    </text>
                    <entry>
                        <organizer classCode="CLUSTER" moodCode="EVN">
                            <templateId root="2.16.840.1.113883.10.20.22.4.26"/>
                            <templateId extension="2015-08-01" root="2.16.840.1.113883.10.20.22.4.26"/>
                            <id root="1111aaa1-1111-1111-1111-111111111111"/>
                            <code code="46680005" codeSystem="2.16.840.1.113883.6.96" displayName="Vital signs">
							<translation code="74728-7" codeSystem="2.16.840.1.113883.6.1" displayName="Vital signs panel"/>
  						</code>
                            <statusCode code="completed"/>
                            <effectiveTime value={altered_created_date}/>
                            <!-- Blood Pressure (systolic) -->
                            <component>
								<observation classCode="OBS" moodCode="EVN">
									<!-- ** Vital sign observation ** -->
									<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
									<templateId root="2.16.840.1.113883.10.20.22.4.27"/>
									<id root={UUIDGenerator.getUUID()}/>
									<code code="8480-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Intravascular Systolic"/>
									<statusCode code="completed"/>
									<effectiveTime value={altered_created_date}/>
									<value type="PQ" value={systolic} unit="mm[Hg]"/>
									<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>
								</observation>
							</component>
                            <!-- Blood Pressure (Diastolic) -->
                            <component>
								<observation classCode="OBS" moodCode="EVN">
									<!-- ** Vital sign observation ** -->
									<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
									<templateId root="2.16.840.1.113883.10.20.22.4.27"/>
									<id root={UUIDGenerator.getUUID()}/>
									<code code="8462-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="BP Diastolic"/>
									<statusCode code="completed"/>
									<effectiveTime value={altered_created_date}/>
									<value type="PQ" value={diastolic} unit="mm[Hg]"/>
									<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>
								</observation>
							</component>	
                            <!-- Height -->
                            <component>
								<observation classCode="OBS" moodCode="EVN">
									<!-- ** Vital sign observation (V2) ** -->
									<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
									<templateId root="2.16.840.1.113883.10.20.22.4.27"/>
									<id root={UUIDGenerator.getUUID()}/>
									<code code="8302-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Height"/>
									<statusCode code="completed"/>
									<effectiveTime value={altered_created_date}/>
									<value type="PQ" value={height} unit="cm"/>
									<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>
								</observation>
						</component>
                            <!-- Weight -->
                            <component>
								<observation classCode="OBS" moodCode="EVN">
									<!-- ** Vital sign observation ** -->
									<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
									<templateId root="2.16.840.1.113883.10.20.22.4.27"/>
									<id root={UUIDGenerator.getUUID()}/>
									<code code="29463-7" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Patient Body Weight - Measured"/>
									<statusCode code="completed"/>
									<effectiveTime value={altered_created_date}/>
									<value type="PQ" value={weight} unit="kg"/>
									<interpretationCode code="N" codeSystem="2.16.840.1.113883.5.83"/>
								</observation>
						</component>
                        </organizer>
                    </entry>
                </section>
            </component>);

}else if(parseVitalSigns['data'].length==0){
	var sectionData						= new XML('<section nullFlavor="NI"/>');
	createSegment('templateId',sectionData);
	createSegment('templateId',sectionData,1);
	sectionData['templateId'][0]['@root']		= "2.16.840.1.113883.10.20.22.2.4.1";
	sectionData['templateId'][1]['@extension']	= '2015-08-01';
	sectionData['templateId'][1]['@root']		= "2.16.840.1.113883.10.20.22.2.4.1";
	sectionData['code']['@code']				= "8716-3";
	sectionData['code']['@codeSystem']			= "2.16.840.1.113883.6.1";
	sectionData['code']['@codeSystemName']		= "LOINC";
	sectionData['code']['@displayName']		= "Vital Signs";
	sectionData['title']					= "Vital Signs";
	sectionData['text']						= "No Vitals found";

	newVitalSignsData.appendChild(sectionData);

	return newVitalSignsData;
}

    
}
