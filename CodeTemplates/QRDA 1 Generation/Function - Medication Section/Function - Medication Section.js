function generateMedication(medData) {
    return <component>
        <structuredBody>
            <component>
                <section>
                    <templateId root="2.16.840.1.113883.10.20.24.2.1"/>
                    <code code="75311-1" codeSystem="2.16.840.1.113883.6.1"/>
                    <entry>
                        <substanceAdministration classCode="SBADM" moodCode="EVN">
                            <templateId root="2.16.840.1.113883.10.20.24.3.42"/>
                            <id root={medData.id}/>
                            <text>{medData.name}</text>
                            <effectiveTime value={medData.date}/>
                            <consumable>
                                <manufacturedProduct>
                                    <manufacturedMaterial>
                                        <code code={medData.code} codeSystem="2.16.840.1.113883.6.88"/>
                                    </manufacturedMaterial>
                                </manufacturedProduct>
                            </consumable>
                        </substanceAdministration>
                    </entry>
                </section>
            </component>
        </structuredBody>
    </component>;
}
