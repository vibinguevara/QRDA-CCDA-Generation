var f = new java.io.File($('ccdaFilePathName'));

var boundary = '----------' + UUIDGenerator.getUUID();
$co('boundary', boundary); // make it available in destination as velocity template variable ${boundary} to be used in field "Content Type"

// http://www.mirthproject.org/community/forums/showthread.php?t=219080
// https://hc.apache.org/httpcomponents-client-4.5.x/httpmime/apidocs/org/apache/http/entity/mime/MultipartEntityBuilder.html#addBinaryBody(java.lang.String,%20java.io.File,%20org.apache.http.entity.ContentType,%20java.lang.String)

var name = 'file';
var contentType = org.apache.http.entity.ContentType.create("application/xml", "UTF-8");
var fileName = $('ccdaFileName');

// create multipart with the following data:
// Content-Disposition: form-data; name="file"; filename="IMG001.JPG"
// Content-Type: image/jpeg
var entity = org.apache.http.entity.mime.MultipartEntityBuilder.create()
	.setBoundary(boundary)
	.addBinaryBody(name, f, contentType, fileName)
	.build();
    
var bos = new java.io.ByteArrayOutputStream();
entity.writeTo(bos);
var fileData =FileUtil.encode(bos.toByteArray());


// Construct json
var jsonData = {};
jsonData.hwsafe_pid = $('hwsafe_pid');
jsonData.file = fileData;//.toString().replace(/[\r\n]+(?![A-Z][A-Z][A-Z0-9]\|)/g, "");

// encoded message
msg = JsonUtil.prettyPrint(JSON.stringify(jsonData));