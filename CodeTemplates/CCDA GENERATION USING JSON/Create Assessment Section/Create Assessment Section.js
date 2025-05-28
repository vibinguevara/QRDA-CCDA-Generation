
function generateAssessmentSection(msg) {

	var parseAssessmentSection = JSON.parse(msg);

	return (<component>
			  <section>
			    <templateId root="2.16.840.1.113883.10.20.22.2.20"/>
			    <templateId root="2.16.840.1.113883.10.20.22.2.20" extension="2015-08-01"/>
			    <code code="34117-2"
			          codeSystem="2.16.840.1.113883.6.1"
			          codeSystemName="LOINC"
			          displayName="History and Physical Note"/>
			    <title>History and Physical Note</title>
			    <text>
			      <paragraph>"Dr Albert Davis examined Mr Jeremy Bates and found him to be healthy but advised him to cut down on smoking."</paragraph>
			    </text>
			  </section>
			</component>
		);
	
}