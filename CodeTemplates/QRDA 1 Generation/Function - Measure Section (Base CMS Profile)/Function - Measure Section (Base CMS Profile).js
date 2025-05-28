function generateMeasureSection(measureType) {

var guid_specific_to_measure = "";
var id_root_extension_specific_to_measure = "";
var text = "";

if(measureType=="CMS165v13"){
	guid_specific_to_measure = "ABDC37CC-BAC6-4156-9B91-D1BE2C8B7268";
	id_root_extension_specific_to_measure = "2C928083-8907-CE68-0189-2BBD31D6064E";
	cms_measure_text = "Percentage of patients 18-85 years of age who had a diagnosis of essential hypertension starting before and continuing into, or starting during the first six months of the measurement period, and whose most recent blood pressure was adequately controlled (&lt;140/90 mmHg) during the measurement period";
}

    return (<component>
    <!-- Begin Measure Component -->
                <section>
                <!-- Begin Measure Section -->
                	<templateId root="2.16.840.1.113883.10.20.24.2.2"/>
                    <templateId root="2.16.840.1.113883.10.20.24.2.3"/>
                    <code code="55186-1" codeSystem="2.16.840.1.113883.6.1"/>
                    <title>Measure Section</title>
                    <text>
	                    <table border="1" width="100%">
	                    <thead>
		                    <tr>
		                    	<th>Version specific identifier</th>
		                    </tr>
	                    </thead>
	                    <tbody>
		                    <tr>
		                    	<td>{id_root_extension_specific_to_measure}</td>
		                    </tr>
	                    </tbody>
	                    </table>
                    </text>
                    <entry>
                        <organizer classCode="CLUSTER" moodCode="EVN">
                            <templateId root="2.16.840.1.113883.10.20.24.3.98"/>
                            <templateId root="2.16.840.1.113883.10.20.24.3.97"/>
                            <id extension={generateGuid()} root="1.3.6.1.4.1.115"/>
                            <statusCode code="completed"/>
                            <reference typeCode="REFR">
                                <externalDocument classCode="DOC" moodCode="EVN">
                                    <id root="2.16.840.1.113883.4.738" extension={id_root_extension_specific_to_measure}/>
                                     <!--abdc37cc-bac6-4156-9b91-d1be2c8b7268 is specific to CMS165v13-->
                                     <text>{cms_measure_text}</text>
                                    <setId root="2.16.840.1.113883.4.738" extension={guid_specific_to_measure}/>
                                </externalDocument>
                            </reference>
                        </organizer>
                    </entry>
                    <!-- Begin Measure Section -->
                </section>
                 <!-- End Measure Component -->
            </component>);
}
