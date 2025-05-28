function generateLabResult(hba1cData) {
    return (
        <component>
            <structuredBody>
                <component>
                    <section>
                        <templateId root="2.16.840.1.113883.10.20.24.2.3"/>
                        <code code="18769-0" codeSystem="2.16.840.1.113883.6.1" displayName="HbA1c Test"/>
                        <entry>
                            <observation classCode="OBS" moodCode="EVN">
                                <templateId root="2.16.840.1.113883.10.20.24.3.18"/>
                                <code code="4548-4" codeSystem="2.16.840.1.113883.6.1" displayName="Hemoglobin A1c/Hemoglobin.total in Blood"/>
                                <value type="PQ" value={hba1cData.value} unit="%"/>
                                <effectiveTime value={hba1cData.date}/>
                            </observation>
                        </entry>
                    </section>
                </component>
            </structuredBody>
        </component>
    );
}
