function generateBloodPressureObservation(bp) {
	// CMS Measure Specific to CMS165v13
    return (
        <entry>
            <organizer classCode="CLUSTER" moodCode="EVN">
                <templateId root="2.16.840.1.113883.10.20.24.3.34"/>
                <id root={generateGuid()}/>
                <statusCode code="completed"/>
                <effectiveTime value={bp.date}/>

               <!-- Systolic -->
                <component>
                    <observation classCode="OBS" moodCode="EVN">
                        <templateId root="2.16.840.1.113883.10.20.24.3.28"/>
                        <id root={generateGuid()}/>
                        <code code="8480-6" codeSystem="2.16.840.1.113883.6.1" displayName="Systolic blood pressure"/>
                        <statusCode code="completed"/>
                        <effectiveTime value={bp.date}/>
                        <value type="PQ" value={bp.systolic.value} unit={bp.systolic.unit}/>
                    </observation>
                </component>

              <!-- Diastolic -->
                <component>
                    <observation classCode="OBS" moodCode="EVN">
                        <templateId root="2.16.840.1.113883.10.20.24.3.26"/>
                        <id root={generateGuid()}/>
                        <code code="8462-4" codeSystem="2.16.840.1.113883.6.1" displayName="Diastolic blood pressure"/>
                        <statusCode code="completed"/>
                        <effectiveTime value={bp.date}/>
                        <value type="PQ" value={bp.diastolic.value} unit={bp.diastolic.unit}/>
                    </observation>
                </component>
            </organizer>
        </entry>
    );
}