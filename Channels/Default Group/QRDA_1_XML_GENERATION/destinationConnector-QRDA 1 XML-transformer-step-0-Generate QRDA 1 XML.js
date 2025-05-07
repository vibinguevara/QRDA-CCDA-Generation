var generateQRDA1XmlData = generateQRDA1(connectorMessage.getRawData(),$('measure_id'));

msg = generateQRDA1XmlData.toString().replace(/xmlns=""/g,'').replace(/type="CD"/g,'xsi:type="CD"').replace(/type="PQ"/g,'xsi:type="PQ"');