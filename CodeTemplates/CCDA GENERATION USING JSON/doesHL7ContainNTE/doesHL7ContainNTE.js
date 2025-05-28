function doesHL7ContainNTE(hl7Message) {
  var segments = hl7Message.split('\r');
  

  segments.forEach((segment)=> {
  	logger.debug('segmentName-------------- '+ segment)

  	
  	var segmentParts = segment.split('|');
  	var segmentName =  segmentParts[0];


  	if (segmentName == 'NTE') {
      return true;
    }
  })

  return false;

  
}
