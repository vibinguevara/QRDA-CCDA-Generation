function generateMeasureSection(measureType) {

var guid_specific_to_measure = "";
var id_root_extension_specific_to_measure = "";
if(measureType=="CMS165v13"){
	guid_specific_to_measure = "ABDC37CC-BAC6-4156-9B91-D1BE2C8B7268";
	id_root_extension_specific_to_measure = "2C928083-8907-CE68-0189-2BBD31D6064E";
}

    return (<component>
    <!-- Begin Measure Component -->
                <section>
                <!-- Begin Measure Section -->
                	<templateId root="2.16.840.1.113883.10.20.24.2.2"/>
                    <templateId root="2.16.840.1.113883.10.20.24.2.3"/>
                    <code code="55186-1" codeSystem="2.16.840.1.113883.6.1"/>
                    <title>Measure Section</title>
                    <entry>
                        <organizer classCode="CLUSTER" moodCode="EVN">
                            <templateId root="2.16.840.1.113883.10.20.24.3.98"/>
                            <templateId root="2.16.840.1.113883.10.20.24.3.97"/>
                            <statusCode code="completed"/>
                            <reference typeCode="REFR">
                                <externalDocument classCode="DOC" moodCode="EVN">
                                    <id root="2.16.840.1.113883.4.738" extension={id_root_extension_specific_to_measure}/>
                                     <!--abdc37cc-bac6-4156-9b91-d1be2c8b7268 is specific to CMS165v13-->
                                    <setId root="2.16.840.1.113883.4.738" extension={guid_specific_to_measure}/>
                                    <versionNumber value="13"/>
                                </externalDocument>
                            </reference>
                        </organizer>
                    </entry>
                    <!-- Begin Measure Section -->
                </section>
                 <!-- End Measure Component -->
            </component>);
}
