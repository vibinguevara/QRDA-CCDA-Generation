var social_history_data = {
  "status" : "success",
  "data" : [
    {
      "total_count" : "1",
      "id" : "628",
      "patient_id" : "SXDl3qVo7YOX1746450189202",
	  "history_of_smoking":{
		  "start_date":"20250201",
		  "end_date":"20250523",
		  "code":"428071000124103"
	  },
	  "current_smoking":{
		  "start_date":"20250201",
		  "end_date":"",
		  "code":"449868002"
	  },
      "cts" : "2025-05-22T06:48:10.286Z",
      "sex_assigned_at_birth":"M"
    }
  ],
  "message" : ""
};

var social_history_json = JsonUtil.prettyPrint(JSON.stringify(social_history_data))


$c('getSocialHistoryCCDA',createSocialHistorySectionCCDA(social_history_json));