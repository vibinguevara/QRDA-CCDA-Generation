function generateAuthorSection() {
	return (
		<author>
		<time value={DateUtil.getCurrentDate('yyyyMMddhhmmss')}/>
		<assignedAuthor>
		<id extension="1511678785" root="2.16.840.1.113883.4.6"/>
		 <addr>
		 <streetAddressLine>2005 Prince Ave</streetAddressLine>
		 <city>Athens</city>
		 <state>GA</state>
		 <postalCode>30606</postalCode>
		 <country>United States of America</country>
		 </addr>
		 <telecom use="WP" value="tel:+1(877)581-8810"/>
		 <assignedAuthoringDevice>
		 <manufacturerModelName>Medical Office Force, LLC.</manufacturerModelName>
		 <softwareName>Medical Office Force EHR</softwareName>
		 </assignedAuthoringDevice>
		 </assignedAuthor>
		 </author>
		)
}