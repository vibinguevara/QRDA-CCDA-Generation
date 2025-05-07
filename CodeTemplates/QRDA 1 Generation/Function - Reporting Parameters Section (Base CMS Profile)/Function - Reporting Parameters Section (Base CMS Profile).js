function generateReportingParams(period) {
	
    return (
            <component>
                <section>
                    <templateId root="2.16.840.1.113883.10.20.17.2.1"/>
                    <templateId extension="2016-03-01" root="2.16.840.1.113883.10.20.17.2.1.1"/>
                    <code code="55187-9" codeSystem="2.16.840.1.113883.6.1"/>
                    <title>Reporting Parameters</title>
                    <entry>
                        <act classCode="ACT" moodCode="EVN">
                            <templateId root="2.16.840.1.113883.10.20.17.3.8"/>
                            <templateId extension="2016-03-01" root="2.16.840.1.113883.10.20.17.3.8.1"/>
                            <id root={generateGuid()}/>
                            <code code="252116004" codeSystem="2.16.840.1.113883.6.96"  displayName="Observation Parameters"/>
                            <effectiveTime>
                                <low value={period.start}/>
                                <high value={period.end}/>
                            </effectiveTime>
                        </act>
                    </entry>
                </section>
            </component>);

}
