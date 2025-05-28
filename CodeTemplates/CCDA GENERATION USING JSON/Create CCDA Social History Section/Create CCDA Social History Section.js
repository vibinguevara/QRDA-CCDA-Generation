function createSocialHistorySectionCCDA(msg) {

    var parsed = JSON.parse(msg);
    var newSocialHistoryData = new XML("<component></component>");
    var sectionData = new XML("<section></section>");

    // Template ID for Social History Section
    sectionData.appendChild(new XML("<templateId root='2.16.840.1.113883.10.20.22.2.17'/>"));
    sectionData.appendChild(new XML("<templateId root='2.16.840.1.113883.10.20.22.2.17' extension='2015-08-01'/>"));

    // Section code
    sectionData.appendChild(new XML("<code code='29762-2' codeSystem='2.16.840.1.113883.6.1' displayName='Social History'/>"));
    sectionData.appendChild(new XML("<title>Social History</title>"));

    // Create <text> and <table>
    var text = new XML("<text></text>");
    var table = new XML("<table border='1' width='100%'><thead><tr><th>Aspect</th><th>Value</th></tr></thead><tbody></tbody></table>");
    var tbody = table.elements("tbody")[0];

    // 1. History of Tobacco Use
    if (parsed.data[0].history_of_smoking) {
        tbody.appendChild(new XML("<tr><td>History of Tobacco Use</td><td>History Of Tobacco Use Identified</td></tr>"));

        var entry = new XML("<entry typeCode='DRIV'></entry>");
        var obs = new XML("<observation classCode='OBS' moodCode='EVN'></observation>");
        obs.appendChild(new XML('<templateId root="2.16.840.1.113883.10.20.22.4.85" extension="2014-06-09"/>'));
        obs.appendChild(new XML('<templateId root="2.16.840.1.113883.10.20.22.4.85"/>'));
        obs.appendChild(new XML('<id root="' + UUIDGenerator.getUUID() + '"/>'));
        obs.appendChild(new XML('<code code="11367-0" codeSystem="2.16.840.1.113883.6.1" displayName="History of tobacco use"/>'));
        obs.appendChild(new XML('<statusCode code="completed"/>'));

        if (parsed.data[0].history_of_smoking.start_date !== "" && parsed.data[0].history_of_smoking.end_date !== "") {
            obs.appendChild(new XML('<effectiveTime><low value="' + parsed.data[0].history_of_smoking.start_date + '"/><high value="' + parsed.data[0].history_of_smoking.end_date + '"/></effectiveTime>'));
        } else if (parsed.data[0].history_of_smoking.start_date !== "" && parsed.data[0].history_of_smoking.end_date === "") {
            obs.appendChild(new XML('<effectiveTime><low value="' + parsed.data[0].history_of_smoking.start_date + '"/><high nullFlavor="NI"/></effectiveTime>'));
        } else {
            obs.appendChild(new XML('<effectiveTime><low nullFlavor="NI"/><high nullFlavor="NI"/></effectiveTime>'));
        }

        var val = new XML('<value type="CD" code="428071000124103" displayName="Heavy tobacco smoker" codeSystem="2.16.840.1.113883.6.96" />');
        obs.appendChild(val);
        entry.appendChild(obs);
        sectionData.appendChild(entry);
    }

    // 2. Current Smoking Status
    if (parsed.data[0].current_smoking) {
        tbody.appendChild(new XML("<tr><td>Current Smoking Status</td><td>Current every day smoker</td></tr>"));

        var entry = new XML("<entry typeCode='DRIV'></entry>");
        var obs = new XML('<observation classCode="OBS" moodCode="EVN"></observation>');
        obs.appendChild(new XML('<templateId root="2.16.840.1.113883.10.20.22.4.78" extension="2014-06-09"/>'));
        obs.appendChild(new XML('<templateId root="2.16.840.1.113883.10.20.22.4.78"/>'));
        obs.appendChild(new XML('<id root="2.16.840.1.113883.19" extension="' + UUIDGenerator.getUUID() + '"/>'));
        obs.appendChild(new XML('<code code="72166-2" codeSystem="2.16.840.1.113883.6.1" displayName="Tobacco smoking status"/>'));
        obs.appendChild(new XML('<statusCode code="completed"/>'));

        if (parsed.data[0].current_smoking.start_date !== "" && parsed.data[0].current_smoking.end_date !== "") {
            obs.appendChild(new XML('<effectiveTime><low value="' + parsed.data[0].current_smoking.start_date + '"/><high value="' + parsed.data[0].current_smoking.end_date + '"/></effectiveTime>'));
        } else if (parsed.data[0].current_smoking.start_date !== "" && parsed.data[0].current_smoking.end_date === "") {
            obs.appendChild(new XML('<effectiveTime value="' + parsed.data[0].current_smoking.start_date + '"/>'));
        } else {
            obs.appendChild(new XML('<effectiveTime><low nullFlavor="NI"/><high nullFlavor="NI"/></effectiveTime>'));
        }

        var val = new XML('<value type="CD" code="449868002" codeSystem="2.16.840.1.113883.6.96" displayName="Current every day smoker"/>');
        obs.appendChild(val);
        entry.appendChild(obs);
        sectionData.appendChild(entry);
    }

    // 3. Sex Assigned at Birth
    logger.debug("parsed.data[0].sex_assigned_at_birth -->>> "+parsed.data[0].sex_assigned_at_birth);
    if (parsed.data[0].sex_assigned_at_birth) {
    		var gender_display_name = "";
    		
    		if(parsed.data[0].sex_assigned_at_birth=="M"){
    			gender_display_name = "Male"
    		}
    		
    		if(parsed.data[0].sex_assigned_at_birth=="F"){
    			gender_display_name = "Female"
    		}
    		
        tbody.appendChild(new XML("<tr><td>Sex Assigned at Birth</td><td>" + parsed.data[0].sex_assigned_at_birth + "</td></tr>"));

        var entry = new XML("<entry></entry>");
        var obs = new XML('<observation classCode="OBS" moodCode="EVN"></observation>');
        obs.appendChild(new XML('<templateId root="2.16.840.1.113883.10.20.22.4.200" extension="2016-06-01"/>'));
        obs.appendChild(new XML("<id root='" + UUIDGenerator.getUUID() + "'/>"));
        obs.appendChild(new XML('<code code="76689-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Sex assigned at birth"/>'));
        obs.appendChild(new XML('<statusCode code="completed"/>'));
        obs.appendChild(new XML("<effectiveTime><low nullFlavor='NI'/></effectiveTime>"));

        var val = new XML("<value type='CD' code='" + parsed.data[0].sex_assigned_at_birth + "' codeSystem='2.16.840.1.113883.5.1' displayName='" + gender_display_name + "'/>");
        obs.appendChild(val);
        entry.appendChild(obs);
        sectionData.appendChild(entry);
    }

    //  Append table into <text>, and <text> before <entry>s
    text.appendChild(table);
    sectionData.insertChildBefore(sectionData.children()[4], text); // ⬅ insert <text> as first child
    newSocialHistoryData.appendChild(sectionData);

    return newSocialHistoryData;
}
