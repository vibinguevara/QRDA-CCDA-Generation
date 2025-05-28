var Base64 = Packages.java.util.Base64;


tmp['realmCode']['@code']="US";
tmp['typeId']['@root']="2.16.840.1.113883.1.3";
tmp['typeId']['@extension']='POCD_HD000040';


createSegment('templateId', tmp);
createSegment('templateId', tmp, 1);
createSegment('templateId', tmp, 2);
createSegment('templateId', tmp, 3);

tmp['templateId'][0]['@root']="2.16.840.1.113883.10.20.22.1.1";
tmp['templateId'][0]['@extension']='2015-08-01';
tmp['templateId'][1]['@root']="2.16.840.1.113883.10.20.22.1.1";

tmp['templateId'][2]['@root']="2.16.840.1.113883.10.20.22.1.2";
tmp['templateId'][2]['@extension']='2015-08-01';
tmp['templateId'][3]['@root']="2.16.840.1.113883.10.20.22.1.2";

tmp['id']['@root']="2.16.840.1.113883.3.3388.1.1.1.1117548";
tmp['id']['@extension']=UUIDGenerator.getUUID();
tmp['code']['@code']="34133-9";
tmp['code']['@codeSystem']="2.16.840.1.113883.6.1";
tmp['code']['@codeSystemName']="LOINC";
tmp['code']['@displayName']="TRANSITION OF CARE RECORD";
tmp['title']="Transition Of Care Record";
tmp['effectiveTime']['@value']=DateUtil.getCurrentDate('yyyyMMddHHmmss');
tmp['confidentialityCode']['@code']="R";
tmp['confidentialityCode']['@codeSystem']="2.16.840.1.113883.5.25";
tmp['confidentialityCode']['@codeSystemName']="Confidentiality";
tmp['confidentialityCode']['@displayName']="Restricted";
tmp['languageCode']['@code']="en-US";

var ccdaComponentBegin	= new XML('<component></component>');
var structuredBodyBegin	= new XML('<structuredBody></structuredBody>');

structuredBodyBegin.appendChild($('getAllergyCCDA'));
structuredBodyBegin.appendChild($('getProblemCCDA'));
structuredBodyBegin.appendChild($('getPayorCCDA'));
structuredBodyBegin.appendChild($('getMedicationStatementCCDA'));
structuredBodyBegin.appendChild($('getImmunizationCCDA'));
structuredBodyBegin.appendChild($('getEncounterCCDA'));
structuredBodyBegin.appendChild($('getSocialHistoryCCDA'));
structuredBodyBegin.appendChild($('getVitalSectionCCDA'));
//structuredBodyBegin.appendChild(generateAssessmentSection(msg));
structuredBodyBegin.appendChild(createObservationSection(msg));

ccdaComponentBegin.appendChild(structuredBodyBegin);

logger.debug($('getRecordTargetSetion'));
tmp.appendChild($('getRecordTargetSetion'));
tmp.appendChild(ccdaComponentBegin);

var xmlGeneration = '<?xml version="1.0" encoding="UTF-8"?>'+"\n"+'<?xml-stylesheet type="text/xsl" href="CDA_EHR.xsl"?>';
var fullCcda = xmlGeneration+tmp;
var currendDate = DateUtil.getCurrentDate('yyyy-MM-dd');

//.replace(/xmlns=""/g,'')
logger.debug("fullCcda --- >>>> "+fullCcda.toString().replace(/xmlns=""/g,'').replace(/type="CD"/g,'xsi:type="CD"').replace(/type="CE"/g,'xsi:type="CE"').replace(/type="IVL_TS"/g,'xsi:type="IVL_TS"').replace(/type="PQ"/g,'xsi:type="PQ"').replace(/type="ST"/g,'xsi:type="ST"'));

//.replace(/xmlns=""/g,'')
var ccda_data = fullCcda.toString().replace(/xmlns=""/g,'').replace(/type="CD"/g,'xsi:type="CD"').replace(/type="CE"/g,'xsi:type="CE"').replace(/type="IVL_TS"/g,'xsi:type="IVL_TS"').replace(/type="PQ"/g,'xsi:type="PQ"').replace(/type="ST"/g,'xsi:type="ST"');
router.routeMessage('API_TO_FHIR_HWSAFE-HAPI', ccda_data.toString());
var ccdaFileName = UUIDGenerator.getUUID()+'.xml';
channelMap.put('ccdaFileName',ccdaFileName);

var ccdaFilePathName = '/opt/java-lib/certification/ccda/'+ccdaFileName;
channelMap.put('ccdaFilePathName',ccdaFilePathName);

//FileUtil.write(ccdaFilePathName, false, fullCcda.toString().replace(/xmlns=""/g,'').replace(/type="CD"/g,'xsi:type="CD"').replace(/type="CE"/g,'xsi:type="CE"').replace(/type="IVL_TS"/g,'xsi:type="IVL_TS"').replace(/type="PQ"/g,'xsi:type="PQ"'));