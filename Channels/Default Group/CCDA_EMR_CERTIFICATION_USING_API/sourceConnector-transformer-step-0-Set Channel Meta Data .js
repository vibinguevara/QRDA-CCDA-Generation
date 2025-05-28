var parseJsonData = JSON.parse(msg);

channelMap.put('importedPatientId',parseJsonData['mr_num']);
channelMap.put('org_id',parseJsonData['org_id']);
channelMap.put('hwsafe_pid',parseJsonData['hwsafe_pid']);
channelMap.put('doctorDirectEmail',null);


/*
if(sourceMap.get('purpose').toString()==undefined || sourceMap.get('purpose').toString()!="zipfile-creation"){
	channelMap.put('purpose','pdf-creation');
}else{
	channelMap.put('purpose','zipfile-creation');
}*/



const labResultPayload = {
    fromDate: '',
    labType: 'all',
    pageNumber: 1,
   callFrom:'pipeline',
    patientId: parseJsonData['hwsafe_pid'],
    resultId: [],
    toDate: '',
};


channelMap.put('labResultPayload',JSON.stringify(labResultPayload));