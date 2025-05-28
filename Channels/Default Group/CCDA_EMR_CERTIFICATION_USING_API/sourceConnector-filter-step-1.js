var parseRequest = JSON.parse(msg);
if(parseRequest['purpose']=="bluebutton"){
	return false;
}else{
	return true;
}