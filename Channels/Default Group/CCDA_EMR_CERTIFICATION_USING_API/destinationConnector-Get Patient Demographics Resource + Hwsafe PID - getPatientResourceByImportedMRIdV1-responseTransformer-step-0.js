// 1. Check if the response has data[] in it 
// 2. If the data length is 0 then create a channelMap userExist & assing it as false
// 3. If the data array length is not 0, then assing getRecordTargetSetion, parse josn etc inside this condition




var parseJsonData = JSON.parse(msg);


if(parseJsonData['data'].length != 0){
	channelMap.put('userExist','true');	
	var getRecordTargetSetion = recordTargetSection(msg,$('doctorDirectEmail'));


	channelMap.put('patient_birthdate',parseJsonData['data'][0]['resource']['birthDate']);
	channelMap.put('getRecordTargetSetion',getRecordTargetSetion);

	
}else{
	channelMap.put('userExist','false');
}



/*
var responseLength;
logger.debug("parseJsonData['data'].length -- "+parseJsonData['data'].length);
if(parseJsonData['data'].length==0){
	channelMap.put('responseLength','0');
}else{
	channelMap.put('responseLength','1');
}

*/