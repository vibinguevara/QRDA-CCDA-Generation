function checkUndefinedOrNot(value){

	var returnval = "";

	if(value!=undefined){
		returnval = value+['value'];
	}else{
		returnval=""
	}

	logger.debug(returnval)

	return returnval;
}
