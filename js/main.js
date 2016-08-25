var url = 'http://79.123.177.182:8010/ph2015/gear2.php?data=';
var configURL = "http://79.123.177.182:8010/ph2015/config.php";
var xmlhttp = null;
xmlhttp = new XMLHttpRequest();
var res = "";

var ctrOK = 0;
var ctrNO = 0;
var startCtr = 0;
var acc_avg_ctr = 0;
var acc_xhr_ctr = 0;

var file_PED, file_ACC, file_LGT, file_MGN, file_HRT, file_UVL, file_GPS, file_UID, avg_file_NTW, stream_ACC, stream_PED, stream_LGT, stream_MGN, stream_HRT, stream_UVL, stream_GPS, stream_UID, avg_stream_NTW;
var batteryLevel = 100;
var battery = navigator.battery || navigator.webkitBattery
|| navigator.mozBattery;

var avg_file_PED, avg_file_ACC, avg_file_LGT, avg_file_MGN, avg_file_HRT, avg_file_UVL, avg_file_GPS, avg_file_UID, avg_file_PRE,  avg_stream_ACC, avg_stream_PED, avg_stream_LGT, avg_stream_MGN, avg_stream_HRT, avg_stream_UVL, avg_stream_GPS, avg_stream_UID, avg_stream_PRE;
var avg_acc_x = 0, avg_acc_y = 0, avg_acc_z = 0, avg_acc_alpha = 0, avg_acc_beta = 0, avg_acc_gamma = 0;
var avg_mgn_x = 0, avg_mgn_y = 0, avg_mgn_z = 0;
var avg_lgt = 0;
var avg_uvl = 0;
var avg_pre = 0;
var avg_gps_x = 0, avg_gps_y = 0;
var avg_hrt_rate = 0, avg_hrt_interval = 0;
var avg_ped_stepStatus = 0, avg_ped_speed = 0, avg_ped_walkingFrequency = 0, avg_ped_cumulativeTotalStepCount = 0;
var avg_battery = 0;
var count_acc = 0, count_mgn = 0, count_lgt = 0, count_uvl = 0, count_gps = 0, count_hrt = 0, count_ped = 0, count_battery = 0, count_pre = 0;

var maximumAgeLimit = 1000 * 60 * 1; // last factor in minutes
var file_ERR, stream_ERR, file_LBL, stream_LBL, file_WIF, stream_WIF, file_PRE, stream_PRE;
var documentsDir;
var d;
var date_now = 0;

var imei;
var userID;

function deleteFiles(files) {
	for (var i = 0; i < files.length; i++) {
		if (!files[i].isDirectory) {
			documentsDir.deleteFile(files[i].fullPath, function() {
				console.log("File Deleted");
			}, function(e) {
				console.log("Error" + e.message);
			});
		}
	}
	/*
	file_PED = documentsDir.createFile("data_PED.txt");
	file_ACC = documentsDir.createFile("data_ACC.txt");
	file_UVL = documentsDir.createFile("data_UVL.txt");
	file_LGT = documentsDir.createFile("data_LGT.txt");
	file_MGN = documentsDir.createFile("data_MGN.txt");
	file_HRT = documentsDir.createFile("data_HRT.txt");
	onsuccess(files);
	 */
	//tizen.application.getCurrentApplication().exit();

}

/*
function checkUserID() {
	if (documentsDir == null) {
		tizen.filesystem.resolve('documents', function(dir) {
			documentsDir = dir;
		}, function(e) {
			console.log("ERR" + e.message);
		}, "rw");
	}
	var file;
	try {
		file_UID = documentsDir.resolve('userid.txt');
		//tau.back();
	} catch (exc) {
		file_UID = documentsDir.createFile("userid.txt");
		onErrorUser();
		return;
	}

	try {
		file.readAsText(function(contents) {
			console.log('File contents:' + contents);
			if (contents == "" || contents == null) {
				onErrorUser();
			}
		},

		onErrorUser

		);
	} catch (exc) {
		console.log('readAsText() exception:' + exc.message + '');
	}
}

function onErrorUser() {
	//box = document.querySelector('#textbox10');
	//box.innerHTML = "UserID not found";


	if (file_UID != null) {
		file_UID.openStream("w", function(fs) {
			stream_UID = fs; 
		}, function(e) {
			console.log("Error " + e.message);
		}, "UTF-8");
	}
	stream_UID.write(userID);
	stream_UID.close();
	//tau.back();
	//box = document.querySelector('#textbox10');
	//box.innerHTML = userID;
}
 */

var MODEL="";

function onSuccess_build(device) {
    //alert("Device Model =" + device.model + " Manufacturer = " + device.manufacturer);
	MODEL = device.model;
}

 function onError_build(error) {
    //alert("Not supported: " + error.message);
	 
}


function onerror () {
	stream_ERR.write(new Date()+" Error with XHR\n");
}


function onsuccess(files) {
	/*
	 * for (var i = 0; i < files.length; i++) { console.log("File Name is " +
	 * files[i].name); // displays file name }
	 */
	try {
		d = new Date();
		file_PED = documentsDir.createFile("PED_" + d.getTime() + ".txt");
		file_ACC = documentsDir.createFile("ACC_" + d.getTime() + ".txt");
		file_UVL = documentsDir.createFile("UVL_" + d.getTime() + ".txt");
		file_LGT = documentsDir.createFile("LGT_" + d.getTime() + ".txt");
		file_MGN = documentsDir.createFile("MGN_" + d.getTime() + ".txt");
		file_HRT = documentsDir.createFile("HRT_" + d.getTime() + ".txt");
		file_GPS = documentsDir.createFile("GPS_" + d.getTime() + ".txt");
		file_LBL = documentsDir.createFile("avg_LBL_" + d.getTime() + ".txt");
		file_WIF = documentsDir.createFile("avg_WIF1_" + d.getTime() + ".txt");
		file_PRE = documentsDir.createFile("PRE_" + d.getTime() + ".txt");

		if (file_PED != null) {
			file_PED.openStream("w", function(fs) {
				stream_PED = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_ACC != null) {
			file_ACC.openStream("w", function(fs) {
				stream_ACC = fs;
				startSensing();
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_UVL != null) {
			file_UVL.openStream("w", function(fs) {
				stream_UVL = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_LGT != null) {
			file_LGT.openStream("w", function(fs) {
				stream_LGT = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_MGN != null) {
			file_MGN.openStream("w", function(fs) {
				stream_MGN = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_HRT != null) {
			file_HRT.openStream("w", function(fs) {
				stream_HRT = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_GPS != null) {
			file_GPS.openStream("w", function(fs) {
				stream_GPS = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		/* Files for average values */
		createAvgFiles(documentsDir, d);
		/* end of avg files */

		file_ERR = documentsDir.createFile("ERR_" + d.getTime() + ".txt");
		if (file_ERR != null) {
			file_ERR.openStream("w", function(fs) {
				stream_ERR = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_LBL != null) {
			file_LBL.openStream("w", function(fs) {
				stream_LBL = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (file_WIF != null) {
			file_WIF.openStream("w", function(fs) {
				stream_WIF = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}
		
		if (file_PRE != null) {
			file_PRE.openStream("w", function(fs) {
				stream_PRE = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}		
		//documentsDir.listFiles(onsuccessSort);

	} catch (error) {
		box = document.querySelector('#textbox9');
		box.innerHTML = "File issue: " + error;
		console.log("File issue: " + error);
		var dd = new Date();
		stream_ERR.write(dd.getTime() + "\t" + box.innerHTML + "\n");
	}
}

function onSuccessCallback(e) {

	$('#textbox8').html("Changed " + e.networkType);
	if (e.networkType == 'NONE' || e.networkType == 'UNKNOWN'){
		stream_ERR.write(new Date()+"\t Network changed to "+e.networkType+"\n");
		networkConnected = false;
	}	
	else {
		networkConnected = true;
		networkType = e.networkType;
	}

	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_ntw.getTime() >= AVG_PERIOD ){ 
		if (networkConnected){
			if (networkType == 'WIFI') {
				avg_stream_NTW.write(date_now.getTime() + "\t" + 1 + "\t"+ 1 + "\t" + userID +"\n");
			}else if (networkType == 'ETHERNET') {
				avg_stream_NTW.write(date_now.getTime() + "\t" + 1 + "\t"+ 2 + "\t" + userID +"\n");
			}else {
				avg_stream_NTW.write(date_now.getTime() + "\t" + 1 + "\t"+ 3 + "\t" + userID +"\n");
			}
		}
		else{
			avg_stream_NTW.write(date_now.getTime() + "\t" + 0 + "\t"+ 0 + "\t" + userID +"\n");
		}
		last_avg_time_ntw  = date_now;
	}	

}

function onSuccessCallbackWIFI(wifi) {	
	stream_WIF.write(new Date().getTime() + "\t" + wifi.ssid + "\t" + wifi.ipAddress + "\t" + wifi.signalStrength + "\t"+ userID + "\n");
	//stream_ERR.write(new Date().getTime() + "\t" + wifi.ssid + "\t" + wifi.macAddress + "\t" + wifi.signalStrength + "\t" + wifi.ipAddress + "\t" + wifi.ipv6Address + "\t" + userID + "\n");
}
function onNetworkSuccessCallbackWIFI(wifi) {
	stream_WIF.write(new Date().getTime() + "\t" + wifi.ssid + "\t" + wifi.ipAddress + "\t" + wifi.signalStrength + "\t"+ userID + "\n");
	//stream_ERR.write(new Date().getTime() + "\t" + wifi.ssid + "\t" + wifi.macAddress + "\t" + wifi.signalStrength + "\t" + wifi.ipAddress + "\t" + wifi.ipv6Address + "\t" + userID + "\n");
}

var networkType = 0;
var networkConnected = false;

function onNetworkSuccessCallback(e) {
	//$('#textbox8').html("Network type: " + e.networkType);
	networkType = e.networkType;
	if (e.networkType == 'NONE' || e.networkType == 'UNKNOWN'){
		stream_ERR.write(new Date()+"\t No network\n");
		networkConnected = false;
	}
	else {
		stream_ERR.write(new Date()+"\t Current network is "+e.networkType+"\n");
		networkConnected = true;
		networkType = e.networkType;
	}
}

String.prototype.hashCode = function() {
	var hash = 0, i, chr, len;
	if (this.length == 0)
		return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

function onSuccessCellular(cellular) {
	imei = "" + cellular.imei;
	// imei = imei.hashCode();
	box = document.querySelector('#textbox11');
	box.innerHTML = "test";
	// alert("Status: " + cellular.status + "\nFlight Mode: " +
	// cellular.isFlightMode + " IMEI: " + cellular.imei);
}

function createAvgFiles(documentsDir, d){
	tizen.filesystem.resolve('documents', function(dir) {
		documentsDir = dir;
		avg_file_PED = documentsDir.createFile("avg_PED_" + d.getTime()
				+ ".txt");
		avg_file_ACC = documentsDir.createFile("avg_ACC_" + d.getTime()
				+ ".txt");
		avg_file_UVL = documentsDir.createFile("avg_UVL_" + d.getTime()
				+ ".txt");
		avg_file_LGT = documentsDir.createFile("avg_LGT_" + d.getTime()
				+ ".txt");
		avg_file_MGN = documentsDir.createFile("avg_MGN_" + d.getTime()
				+ ".txt");
		avg_file_HRT = documentsDir.createFile("avg_HRT_" + d.getTime()
				+ ".txt");
		avg_file_GPS = documentsDir.createFile("avg_GPS_" + d.getTime()
				+ ".txt");
		avg_file_NTW = documentsDir.createFile("avg_NTW_" + d.getTime()
				+ ".txt");
		avg_file_PRE = documentsDir.createFile("avg_PRE_" + d.getTime()
				+ ".txt");		

		if (avg_file_PED != null) {
			avg_file_PED.openStream("w", function(fs) {
				avg_stream_PED = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (avg_file_ACC != null) {
			avg_file_ACC.openStream("w", function(fs) {
				avg_stream_ACC = fs;
				streamsClosed = false; //the most needed stream, hence serves as guide if streams were created in time
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (avg_file_UVL != null) {
			avg_file_UVL.openStream("w", function(fs) {
				avg_stream_UVL = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (avg_file_PRE != null) {
			avg_file_PRE.openStream("w", function(fs) {
				avg_stream_PRE = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}
		
		if (avg_file_LGT != null) {
			avg_file_LGT.openStream("w", function(fs) {
				avg_stream_LGT = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (avg_file_MGN != null) {
			avg_file_MGN.openStream("w", function(fs) {
				avg_stream_MGN = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (avg_file_HRT != null) {
			avg_file_HRT.openStream("w", function(fs) {
				avg_stream_HRT = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (avg_file_GPS != null) {
			avg_file_GPS.openStream("w", function(fs) {
				avg_stream_GPS = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}

		if (avg_file_NTW != null) {
			avg_file_NTW.openStream("w", function(fs) {
				avg_stream_NTW = fs;
			}, function(e) {
				console.log("Error " + e.message);
			}, "UTF-8");
		}		
		stream_ERR.write(new Date() + " Re-created average files\n");
	}, function(e) {
		stream_ERR.write(new Date()+" exception at creating files for AVG\n");
		console.log("Error" + e.message);
	}, "rw");

}

function onErrorCellular(error) {
	box = document.querySelector('#textbox11');
	box.innerHTML = "Not supoorted";
}

var listOfFilesToRead=[];
var last_avg_time_acc;
var last_avg_time_hrt;
var last_avg_time_gps;
var last_avg_time_mgn;
var last_avg_time_lgt;
var last_avg_time_uvl;
var last_avg_time_ntw;
var last_avg_time_ped;
var last_avg_time_pre;
var last_sent_time_acc;
var last_sent_time_hrt;
var last_sent_time_gps;
var last_sent_time_mng;
var last_sent_time_lgt;
var last_sent_time_uvl;
var last_sent_time_ntw;
var last_sent_time_ped;
var last_sent_time_pre;
var last_sent_counter_acc = 0;
var last_sent_counter_hrt = 0;
var last_sent_counter_gps = 0;
var last_sent_counter_mng = 0;
var last_sent_counter_lgt = 0;
var last_sent_counter_uvl = 0;
var last_sent_counter_ntw = 0;
var last_sent_counter_ped = 0;
var last_sent_counter_pre = 0;

var screenState=1;

function onScreenStateChanged(previousState, changedState) {
	console.log("Screen state changed from " + previousState + " to " + changedState);
	if ( changedState === "SCREEN_OFF" && screenToggle == 1 && screenState == 1) {
		tizen.power.turnScreenOn();
		tizen.power.setScreenBrightness(0.01);
	}
}

function handleClick(){
	//document.getElementById('useridBox').value = "test-OK";	
	userID = document.getElementById('useridBox').value;
	writeUser(userID)
}

function ctsSensing(){
	if (ctsSense == 0) { 
		//tizen.power.request("CPU", "CPU_AWAKE");
		ctsSense = 1; 
		box = document.querySelector('#cpuState');
		box.innerHTML = "Tam Güç Aktif";
		screenToggle = 1;
		screenState = 1;
		tizen.alarm.removeAll();
	}
	else{
		ctsSense = 0;
		//tizen.power.release("CPU");
		box = document.querySelector('#cpuState');
		box.innerHTML = "Tam Güç Pasif";
		screenToggle = 0;
		screenState = 0;
		XHRTimer();		
	} 
}
var date = new Date(2015, 11, 13, 14, 7);
function setAlarm(){
	//Set an alarm on January 1st 2012 08:00, repeating every 2 days
	var alarm = new tizen.AlarmAbsolute( tizen.alarm.PERIOD_HOUR, tizen.alarm.PERIOD_MINUTE);
	tizen.alarm.add(alarm, "org.tizen.browser");
}

function setClass(toBeChanged){
	$("[id^=box-]").attr('class', 'li-has-multiline');		
	$(toBeChanged).attr('class', 'li');		
}

function writeLabel_walking(e){
	stream_LBL.write(new Date().getTime() + "\t" + "WALKING\t" + userID + "\n");
	setClass("#box-walking");
}
function writeLabel_sitting(e){
	stream_LBL.write(new Date().getTime() + "\t" + "RELAX\t" + userID + "\n");
	setClass("#box-sitting");
}
function writeLabel_commute(e){
	stream_LBL.write(new Date().getTime() + "\t" + "COMMUTE\t" + userID + "\n");
	setClass("#box-commute");
}
function writeLabel_office(e){
	stream_LBL.write(new Date().getTime() + "\t" + "WORKING\t" + userID + "\n");
	setClass("#box-office");
}
function writeLabel_recreate(e){
	stream_LBL.write(new Date().getTime() + "\t" + "DINING\t" + userID + "\n");
	setClass("#box-recreate");
}
function writeLabel_meeting(e){
	stream_LBL.write(new Date().getTime() + "\t" + "MEETING\t" + userID + "\n");
	setClass("#box-meeting");
}
function writeLabel_other(e){
	stream_LBL.write(new Date().getTime() + "\t" + "OTHER\t" + userID + "\n");
	setClass("#box-other");
}
function writeLabel_shopping(e){
	stream_LBL.write(new Date().getTime() + "\t" + "SHOPPING\t" + userID + "\n");
	setClass("#box-shopping");
}
function writeLabel_smoking(e){
	stream_LBL.write(new Date().getTime() + "\t" + "SMOKING\t" + userID + "\n");
	setClass("#box-smoking");
	screenOffTime = screenOffTimeWithSmoking;
	clearTimeout(time2send);
	time2send = setTimeout(function(){
		getGeoLocation();
		try {
			tizen.systeminfo.getPropertyValue("NETWORK", onNetworkSuccessCallback, onErrorWifi);			
			tizen.systeminfo.getPropertyValue("WIFI_NETWORK",  onNetworkSuccessCallbackWIFI, onErrorWifi);
			}
			catch (e){
				stream_ERR.write(new Date() + "\t network error: " + e +"\n" );
			}
		//syncConfig(); 
		//XHRTimer();		
		}, screenOffTime);	
	clearTimeout(time2exit);
	var time_now = new Date();
	time2exit = setTimeout(function(){
		resetAlarms();
		tizen.application.getCurrentApplication().exit();
		tizen.power.turnScreenOff();	
		}, screenOffTime);
	
	screenToggle = 1;
}

var screenOffTimeWithSmoking = 8 * 60 * 1000 + 1000 * 5;
var screenOffTimeNoSmoking = 1 * 60 * 1000 + 1000 * 5;
var screenOffTime =  60 * 1000 + 1000 * 5;
var ctsSense = 0;
//var year=2015,month=10,day=14,hour=21,min =30;

function resetAlarms(){
	tizen.alarm.removeAll();	
	var appId = tizen.application.getCurrentApplication().appInfo.id;		
	var date = new Date();
	var alarm = new tizen.AlarmAbsolute(date, RUN_PERIOD * tizen.alarm.PERIOD_MINUTE);
	tizen.alarm.add(alarm, appId);	
}


var RUN_PERIOD = 10;
var run_time;
function onErrorWifi(error){
	stream_ERR.write(new Date + "\t WIFI error: " + e);
}

window.onload = function() {

	document.getElementById("button_OK").addEventListener("click", handleClick);
	document.getElementById("button_sync").addEventListener("click", XHRTimer);
	document.getElementById("button_screen").addEventListener("click", ctsSensing);
	document.getElementById("button_close").addEventListener("click", stopSensing);
	document.getElementById("box-walking").addEventListener("click", writeLabel_walking);
	document.getElementById("box-sitting").addEventListener("click", writeLabel_sitting);
	document.getElementById("box-office").addEventListener("click", writeLabel_office);
	document.getElementById("box-commute").addEventListener("click", writeLabel_commute);
	document.getElementById("box-recreate").addEventListener("click", writeLabel_recreate);
	document.getElementById("box-meeting").addEventListener("click", writeLabel_meeting);
	document.getElementById("box-other").addEventListener("click", writeLabel_other);
	document.getElementById("box-shopping").addEventListener("click", writeLabel_shopping);	
	document.getElementById("box-smoking").addEventListener("click", writeLabel_smoking);	
	tremorArr = [];
	screenToggle = 1;
	ctsSense = 1; 
	screenState = 1;	

	//syncConfig();
	tizen.power.turnScreenOn();
	tizen.power.setScreenBrightness(0.1);
	
	tizen.power.setScreenStateChangeListener(onScreenStateChanged);
//	if (screenToggle == 0 ){		
	resetAlarms();
//	}
	/*
	tizen.power.request("SCREEN", "SCREEN_DIM");
	document.addEventListener("visibilitychange", function() {
	    console.log("visibilitychange");
	    if (document.hidden) {
	    	tizen.power.request("SCREEN", "SCREEN_DIM");
	        console.log('document hidden');
	    } else  {
	        console.log('document visible');
	    }
	}, false);
	 */ 
	last_avg_time  = new Date();
	last_sent_time = new Date();
	last_avg_time_acc = last_avg_time;
	last_avg_time_hrt = last_avg_time;
	last_avg_time_gps = last_avg_time;
	last_avg_time_mgn = last_avg_time;
	last_avg_time_lgt = last_avg_time;
	last_avg_time_uvl = last_avg_time;
	last_avg_time_ntw = last_avg_time;
	last_avg_time_ped = last_avg_time;
	last_avg_time_pre = last_avg_time;
	run_time = last_avg_time;
	tremor_window = new Date();

	var element = document.getElementById('mains');
/*	var hammertimeL = Hammer(document.body).on("dragright  swiperight",
			function(event) {
		screenToggle = 0;		
		//XHRTimer();
		//return window.location.href = "valence.html";
	}, function(e) {
		box = document.querySelector('#textbox12');
		box.innerHTML = box.innerHTML + " swipeError " + e.message;
	});

	var hammertimeR = Hammer(document.body).on("dragleft swipeleft",
			function(event) {
		vibrateOn = 0;
		//screenToggle = 1;
		
		if (screenToggle == 1){
			screenToggle = 0;			
		}
		else {
			screenToggle = 1;
		}
		 

		//XHRTimer();
		//	return window.location.href = "options.html";

	}, function(e) {
		box = document.querySelector('#textbox12');
		box.innerHTML = box.innerHTML + " swipeError " + e.message;
	});*/

	/*
	 * var telephony_capability =
	 * tizen.systeminfo.getCapability("http://tizen.org/feature/network.telephony");
	 * 
	 * if (telephony_capability === true) {
	 * tizen.systeminfo.getPropertyValue("CELLULAR_NETWORK", onSuccessCellular,
	 * onErrorCellular); } else { box = document.querySelector('#textbox10');
	 * box.innerHTML = "Not supoorted really"; }
	 */

	tizen.systeminfo.getPropertyValue("BUILD", onSuccess_build, onError_build);
	
	battery.onlevelchange = function() {
		console.log(battery.level);
		batteryLevel = battery.level;
		avg_battery += battery.level;
		count_battery++;
	};

	tizen.filesystem.resolve('documents', function(dir) {
		documentsDir = dir;
		dir.listFiles(onsuccess,onerror);
		//onsuccess();
	}, function(e) {
		console.log("Error" + e.message);
	}, "rw");

	var userFileOpen = 0;

	tizen.filesystem.resolve('documents/userid.txt', function(
			dir) {
		file_UID = dir;
		file_UID.openStream(
				"r",
				function(fs){
					stream_UID = fs;
					if (file_UID.fileSize == 0){
						userFileOpen = 1;
						fs.close();						
						writeUser("hasta");
					}
					else {
						userID = fs.read(file_UID.fileSize);
						fs.close();
						box = document.querySelector('#textbox11');
						box.innerHTML = userID;
					}
				}, function(e) {
					//stream_UID.close();
					writeUser("hasta_init");
					console.log("Error user file reading " + e.message);
				}, "UTF-8"
		);
	}, function(e) {
		file_UID =  documentsDir.createFile("userid.txt");
		writeUser("hasta");
		stream_ERR.write(new Date + "\t" + "UIDerror with reading:\t" + e.message + "\n");
	});	
	
	xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			res = xmlhttp.responseText;
			ctrOK++;

		} else {
			ctrNO++;
		}
	};
	xmlhttp.onerror = function(e) {
		res = "ERROR";
	};

//	getGeoLocation();
	// var initial = new Date().getTime();

	/*
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName == "back") {
			stream_ACC.close();
			stream_PED.close();
			stream_LGT.close();
			stream_UVL.close();
			stream_MGN.close();
			stream_HRT.close();
			tizen.application.getCurrentApplication().exit();
		}
	}); 
	 */

	// tizen.systeminfo.getPropertyValue("CELLULAR_NETWORK", onSuccessCellular,
	// onErrorCellular);


	/*
	try {
		fileToRead.readAsText(function(contents) {

			textToSend = contents;
			stream_ERR.write(new Date() + " contents read 1st"  + "\n");
		}, function(e) {
			document.getElementById("textbox9").innerHTML = e;
			stream_ERR.write(new Date() + " error " + e.message + "\n");
		});
	} catch (exc) {
		document.getElementById("textbox9").innerHTML = exc.message;
		stream_ERR.write(new Date() + " exception " + exc.message + "\n");
	}
	 */
	//tizen.application.getCurrentApplication().exit();
	time2send = setTimeout(function(){ 
		getGeoLocation();
		try {
			tizen.systeminfo.getPropertyValue("NETWORK", onNetworkSuccessCallback, onErrorWifi);
			tizen.systeminfo.getPropertyValue("WIFI_NETWORK",  onNetworkSuccessCallbackWIFI, onErrorWifi);
			}
			catch (e){
				stream_ERR.write(new Date() + "\t network error: " + e +"\n" );
			}
		//syncConfig(); 
		//XHRTimer();		
		}, screenOffTime);
	
	time2exit = setTimeout(function(){ 
		tizen.application.getCurrentApplication().exit();
		tizen.power.turnScreenOff();	
		}, screenOffTime + 15*1000);
	
	try {
	tizen.systeminfo.getPropertyValue("NETWORK", onNetworkSuccessCallback, onErrorWifi);
	tizen.systeminfo.getPropertyValue("WIFI_NETWORK",  onNetworkSuccessCallbackWIFI, onErrorWifi);
	tizen.systeminfo.addPropertyValueChangeListener("NETWORK", onSuccessCallback, onErrorWifi);
	tizen.systeminfo.addPropertyValueChangeListener("WIFI_NETWORK", onSuccessCallbackWIFI, onErrorWifi);
	}
	catch (e){
		stream_ERR.write(new Date() + "\t network error: " + e +"\n" );
	}		

}

function onGetSuccessPRE(sensorData) {
	count_pre++;
	avg_pre += sensorData.pressure;
    stream_PRE.write(new Date().getTime() + "\t" + sensorData.pressure + "\t" + userID +"\n");
    console.log(new Date() + "PRE : " + sensorData.pressure + "\n");
	var box = document.querySelector('#textbox9');
	box.innerHTML =  sensorData.pressure;
	
	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_pre.getTime() >= AVG_PERIOD || (count_pre >= sampleCounter && !tizen.power.isScreenOn())){ 
		if (count_pre != 0) {
			avg_stream_PRE.write(date_now.getTime() + "\t" + count_pre + "\t"
					+ avg_pre / count_pre + "\t"+userID + "\n");
			avg_pre = 0;
			count_pre = 0;
		}
		last_avg_time_pre  = date_now;
	}		
}

function stopSensing(){
	tizen.alarm.removeAll();
	tizen.application.getCurrentApplication().exit();
	tizen.power.turnScreenOff();	

}

function onerrorPRE(error) {
	 stream_ERR.write(new Date() + "PRE error occurs" + "\n");
	 console.log(new Date() + " PRE error occurs" + "\n");
}

function onsuccessPRE() {
	 stream_ERR.write(new Date() + " PRE sensor start" + "\n");
	 console.log(new Date() + " PRE sensor start" + "\n");
    pressureSensor.getPressureSensorData(onGetSuccessPRE, onerrorPRE);
}

var time2send;
var time2exit;

function writeUser(uname){
	/*
	if (stream_UID != null ){
		stream_UID.close();
	}
	*/
	tizen.filesystem.resolve('documents/userid.txt', function(
			dir) {
		file_UID = dir;
		file_UID.openStream(
				"w",
				function(fs){
					stream_UID = fs;
					userID = uname;
					stream_UID.write(userID);
					stream_UID.close();						
				}, function(e) {
					console.log("Error user file writing " + e.message);
				}, "UTF-8"
		);
	}, function(e) {
		stream_ERR.write(new Date + "\t" + "UIDerror with writing:\t" + e.message + "\n");
	});	
}

var screenToggle; 
var avg_Timer ;
var AVG_PERIOD     = 1000 * 60; 
var GPS_PERIOD     = 1000 * 60 * 10;
var GPS_TIMEOUT     = 1000 * 60 * 2;
var CPU_PERIOD	   = 1000 * 60 * 10;
var VALENCE_PERIOD = 1000 * 60 * 10;
var SEND_PERIOD    = 1000 * 60 * 60;

var acc=1,gyro=1,gps=0,bar=1,mgn=1,lgt=1,ped=1,uvl=1,hrt=1,ntw=1;

var avg_last_time_;

function startSensing(){
	try {
		//syncConfig();
		if (vibrateOn){
			var hour = new Date().getHours();
			if( hour<=23 && hour>=8 ) {
				navigator.vibrate([200]);
			}
		}
		//navigator.vibrate([1000, 1000]);
		//XHRTimer();
		/** DISABLED UNTIL timer problem is solved
		avg_Timer = setInterval(function() {
			var date = new Date();
			takeAverage(date);
		}, AVG_PERIOD);

		var sentTimer = setInterval(function() {
			XHRTimer();
		}, SEND_PERIOD);

		var cpu_timer = setInterval(function() {
			cpuTimer();
		}, CPU_PERIOD);
		 */
		
		
		if ( gps ){
			var gps_Timer = setInterval(function() {
				getGeoLocation();
			}, GPS_PERIOD);
		}
		var notifyForLBL = setInterval(function() {
			var hour = new Date().getHours();
			if( hour<23 && hour>8 ) {
				navigator.vibrate([200]);
			}
		}, VALENCE_PERIOD);
		 
		/*
		var goToValence = setInterval(function() {
			goToSurvey();
		}, VALENCE_PERIOD);
		 */
		
		
		if(ped) {
			var pedometer = window.webapis.motion;
			CONTEXT_TYPE = 'PEDOMETER';
			pedometer.start(CONTEXT_TYPE, onchangedPED);
		}
		if(lgt) {
			var lightSensor = window.webapis.sensorservice
			.getDefaultSensor("LIGHT");
			lightSensor.setChangeListener(onGetSuccessCB);
			lightSensor.start(onsuccessCB);
		}

		if(uvl && (MODEL.indexOf('2') !== -1)) {
			var ultravioletSensor = window.webapis.sensorservice
			.getDefaultSensor("ULTRAVIOLET");
			ultravioletSensor.setChangeListener(onGetSuccessUV);
			ultravioletSensor.start(onsuccessUV);
		}
		if(mgn) {
			var magneticSensor = window.webapis.sensorservice
			.getDefaultSensor("MAGNETIC");
			magneticSensor.setChangeListener(onGetSuccessMG);
			magneticSensor.start(onsuccessMG);
		}
		if(hrt) {
			window.webapis.motion.start("HRM", onchangedHR);
		}
		if(ped) {
			window.webapis.motion.start("PEDOMETER", onchangedPED);
		}
		if(acc) {
			window.addEventListener('devicemotion', onChangedACC, onErrorACC);
		}
		if(gps){
			getGeoLocation();
		}
		try {
			//window.addEventListener("atmpressure",onGetSuccessPRE, onerrorPRE);
			 pressureSensor = window.webapis.sensorservice.getDefaultSensor("PRESSURE");
			 pressureSensor.setChangeListener(onGetSuccessPRE);
			 pressureSensor.start(onsuccessPRE);			 
			}
			catch (e){
				stream_ERR.write(new Date() + " PRE error " + e + "\n");
			}
		
	} catch (error) {
		box = document.querySelector('#textbox9');
		box.innerHTML = error;
		console.log(error);
		var dd = new Date();
		stream_ERR.write(dd.getTime() + "\t" + "sensor error: " + error + "\n");
	}

}
var pressureSensor;

window.onerror = function(msg, url, line, col, error) {
	// Note that col & error are new to the HTML 5 spec and may not be
	// supported in every browser. It worked for me in Chrome.
	var extra = !col ? '' : '\ncolumn: ' + col;
	extra += !error ? '' : '\nerror: ' + error;
	box = document.querySelector('#textbox9');
	var dd = new Date();
	box.innerHTML = "window onError: " + dd.toLocaleString() + msg + "\nurl: "
	+ url + "\nline: " + line + extra;
	stream_ERR.write(dd.getTime() + "\t" + box.innerHTML + "\n");
	var suppressErrorAlert = true;
	return suppressErrorAlert;
};

//var now_time;
var last_sent_time;

var tremor_window;

var TREMOR_WINDOW_SIZE = 500;

var tremorArr;

var peaks_per_window = 0;

function onChangedACC(e) {
	//acc_avg_ctr++;
	//acc_xhr_ctr++;
	box = document.querySelector('#textbox7');


	var d = new Date();

	//box.innerHTML = acc_avg_ctr + " "+ acc_xhr_ctr;

	box.innerHTML = "X: " + e.acceleration.x.toFixed(2) + "\t Y: "
	+ e.acceleration.y.toFixed(2) + "\t Z: " + e.acceleration.z.toFixed(2);

	/*
	  console.debug(d.toLocaleString() + "\t" + d.getTime() + "\t" + batteryLevel +
	  "\t" + e.accelerationIncludingGravity.x + "\t" + (-1) * e.accelerationIncludingGravity.y + "\t" + (-1)*
	  e.accelerationIncludingGravity.z + "\t" + e.rotationRate.alpha + "\t" +
	  e.rotationRate.beta + "\t" + e.rotationRate.gamma + "\n");
	 */
	// stream_ACC.write(d.toLocaleString() + "\t" + d.getTime() + "\t" +
	// d.getTime()+"\t"+batteryLevel+"\t"+e.accelerationIncludingGravity.x +
	// "\t"+(-1)*e.accelerationIncludingGravity.y+ "\t"+
	// (-1)*e.accelerationIncludingGravity.z+"\t"+e.rotationRate.alpha+"\t"+e.rotationRate.beta+"\t"+e.rotationRate.gamma+"\n");
	stream_ACC.write(d.getTime() + "\t" + batteryLevel + "\t"
			+ e.acceleration.x + "\t" + (-1) * e.acceleration.y + "\t" + (-1)
			* e.acceleration.z +"\t"+e.accelerationIncludingGravity.x +
			"\t"+(-1)*e.accelerationIncludingGravity.y+ "\t"+ (-1)*e.accelerationIncludingGravity.z +
			"\t" + e.rotationRate.alpha + "\t"
			+ e.rotationRate.beta + "\t" + e.rotationRate.gamma + "\n");
	//console.debug(d.getTime() + "\t" + batteryLevel + "\t"			+ e.acceleration.x + "\t" + (-1) * e.acceleration.y + "\t" + (-1)* e.acceleration.z);
//	console.log("ACC: \t" + d.getTime() + "\t" + batteryLevel + "\t"
//	+ e.acceleration.x + "\t" + (-1) * e.acceleration.y + "\t" + (-1)
//	* e.acceleration.z);	
	if (avg_acc_x == null || avg_acc_x == 0) {
		avg_acc_x = Math.sqrt(Math.pow(e.acceleration.x,2) + Math.pow(e.acceleration.y,2) + Math.pow(e.acceleration.z,2));
		//avg_acc_x = Math.abs(e.acceleration.x);
		avg_acc_y = Math.abs(e.acceleration.y);
		avg_acc_z = Math.abs(e.acceleration.z);
		avg_acc_alpha = e.rotationRate.alpha;
		avg_acc_beta = e.rotationRate.beta;
		avg_acc_gamma = e.rotationRate.gamma;
	} else {
		avg_acc_x += Math.sqrt(Math.pow(e.acceleration.x,2) + Math.pow(e.acceleration.y,2) + Math.pow(e.acceleration.z,2));
		//avg_acc_x += Math.abs(e.acceleration.x);
		avg_acc_y += Math.abs(e.acceleration.y);
		avg_acc_z += Math.abs(e.acceleration.z);
		avg_acc_alpha += e.rotationRate.alpha;
		avg_acc_beta += e.rotationRate.beta;
		avg_acc_gamma += e.rotationRate.gamma;
	}
	count_acc++;
	count_battery++;	

	var now_time = new Date();
	if ( now_time.getTime() - last_avg_time_acc.getTime() >= AVG_PERIOD || ( count_acc >= sampleCounter && !tizen.power.isScreenOn())){ 
		if (count_acc != 0) {
			avg_stream_ACC.write(now_time.getTime() + "\t" + count_acc + "\t"
					+ batteryLevel + "\t" + avg_acc_x / count_acc + "\t" + (-1)
					* avg_acc_y / count_acc + "\t" + (-1) * avg_acc_z / count_acc
					+ "\t" + avg_acc_alpha / count_acc + "\t" + avg_acc_beta
					/ count_acc + "\t" + avg_acc_gamma / count_acc + "\t"+userID+"\n");
			avg_acc_x = 0;
			avg_acc_y = 0;
			avg_acc_z = 0;
			avg_acc_alpha = 0;
			avg_acc_beta = 0;
			avg_acc_gamma = 0;
			count_acc = 0;
			count_battery = 0;
		}
		last_avg_time_acc  = now_time;					
	}
	
	/** TREMOR DETECTION 
	tremorArr.push(e.acceleration.z);

	now_time = new Date();
	if ( now_time.getTime() - tremor_window.getTime() >= TREMOR_WINDOW_SIZE ){
		tremor_window = new Date();		
		//var checkArr = $.extend( {}, tremorArr );
		var checkArr = tremorArr.slice();
		tremorArr = [];
		var arrayLength = checkArr.length;		
		var sum = 0;
		var mmean;
		var meanThreshold = 0.53;
		var magDiff = meanThreshold;
		for (var i = 1; i< arrayLength-1; i++) {
			if (Math.abs(checkArr[i]) - Math.abs(checkArr[i-1]) >= magDiff &&  Math.abs(checkArr[i]) - Math.abs(checkArr[i+1]) >= magDiff){
				peaks_per_window++;				
			}
			sum += checkArr[i];
		}

		mmean = sum / checkArr.length;

		if (peaks_per_window >= 3 && mmean >= meanThreshold){
			navigator.vibrate([100]);

			if (playSound){
				var sp = new SoundPlayer();
				sp.playSequence([
				  'sounds_count.wav',
				]);
				//alert("TREMOR TREMOR");
			}
		}		
		peaks_per_window = 0;
	}
	 */

	if ( now_time.getTime() - last_sent_time.getTime() >= SEND_PERIOD || count_acc >= sendingCounter ){
		XHRTimer();
		acc_xhr_ctr = 0;
		box.innerHTML = "Sending at " + now_time;
		last_sent_time = now_time;
		stream_ERR.write(new Date() + " starting sending procedure\n");
	}
}

var playSound = 0;
var vibrateOn = 1;

SoundPlayer = function() {
	this.audio = new Audio();
	this.audio.preload = 'auto';
	this.audio.autoplay = true;
	this.audio.addEventListener('ended', function() {
		this.audio.src = '';
	}.bind(this));

	this.isLoading = false;
	this.isPlaying = false;
	this.volume = 1;
	this.sounds = [];
};

SoundPlayer.prototype.setVolume = function(volume) {
	this.volume = Math.max(0, Math.min(1, volume));

	this.sounds.forEach(function(sound) {
		sound.volume = this.volume;
	}, this);
};

SoundPlayer.prototype.getVolume = function() {
	return this.volume;
};


SoundPlayer.prototype.play = function(url, callback) {
	return SoundPlayer.prototype.playSequence([url], callback);
};

SoundPlayer.prototype.playSequence = function(soundsUrls, callback) {
	if (this.isPlaying || this.isLoading) {
		return false;
	}

	var loaded = soundsUrls.length;
	var index = 0;

	var onCanPlayThroughListener = function() {
		loaded--;
		if (loaded <= 0) {
			this.isLoading = false;
			play(index);
		}
	}.bind(this);

	var onEndedListener = function() {
		index++;

		if (index < soundsUrls.length) {
			play(index);
		} else {
			this.isPlaying = false;
			this.sounds = [];
			if (_.isFunction(callback)) {
				callback();
			}
		}
	}.bind(this);

	var load = function() {
		this.isLoading = true;

		soundsUrls.forEach(function(soundUrl) {
			var sound = new Audio();
			sound.preload = 'auto';
			sound.volume = this.getVolume();
			sound.addEventListener('canplaythrough', onCanPlayThroughListener);
			sound.addEventListener('ended', onEndedListener);
			this.sounds.push(sound);
			sound.src = soundUrl;
		}, this);
	}.bind(this);

	var play = function(index) {
		this.isPlaying = true;
		this.sounds[index].play();
	}.bind(this);

	load();

	return true;
};



function onErrorACC(e) {
	box = document.querySelector('#textbox9');
	box.innerHTML = "devicemotion failed: " + e;
	var dd = new Date();
	stream_ERR.write(dd.getTime() + "\t" + box.innerHTML + "\n");
}

function onsuccessPED(pedometerInfo) {
	//console.log("Cumulative total step count : "			+ pedometerInfo.cumulativeTotalStepCount);
	//console.log("Step status : " + pedometerInfo.stepStatus);
	//console.log("Speed : " + pedometerInfo.speed);
	//console.log("Walking frequency : " + pedometerInfo.walkingFrequency);
	box = document.querySelector('#textbox6');
	box.innerHTML = "Step status : " + pedometerInfo.stepStatus;// + "<br />"
}

function onerrorPED(error) {
	//console.log("Error occurs. name:" + error.name + ", message: "			+ error.message);
	box = document.querySelector('#textbox6');
	box.innerHTML = "Error " + error.message;
	var dd = new Date();
	stream_ERR.write(dd.getTime() + "\t" + "PED error " + error + "\n");
}

var avg_ped_cumulativeDistance = 0;
var avg_ped_cumulativeWalkStepCount = 0;
var avg_ped_cumulativeRunStepCount = 0;

function onchangedPED(pedometerInfo) {

	box = document.querySelector('#textbox6');
	box.innerHTML = "Status: " + pedometerInfo.stepStatus + "<br />"
	+ "Speed: " + pedometerInfo.speed + "<br />" + "Walk-freq: "
	+ pedometerInfo.walkingFrequency + "<br />Total steps: "
	+ pedometerInfo.cumulativeTotalStepCount;

	var d = new Date();
	stream_PED.write(d.getTime() + "\t" + pedometerInfo.cumulativeDistance + "\t"
			+ pedometerInfo.stepStatus + "\t" + pedometerInfo.speed + "\t"
			+ pedometerInfo.walkingFrequency + "\t"
			+ pedometerInfo.cumulativeTotalStepCount + "\n");
	var stepStatus;
	if (pedometerInfo.stepStatus == "NOT_MOVING") {
		stepStatus = 0;
	} else if (pedometerInfo.stepStatus == "WALKING") {
		stepStatus = 1;
	} else if (pedometerInfo.stepStatus == "RUNNING") {
		stepStatus = 2;
	} else {
		stepStatus = 3;
	}

	if (avg_ped_stepStatus == null || avg_ped_stepStatus == 0) {
		avg_ped_stepStatus = stepStatus;
		avg_ped_speed = pedometerInfo.speed;
		avg_ped_walkingFrequency = pedometerInfo.walkingFrequency;
		avg_ped_cumulativeTotalStepCount = pedometerInfo.cumulativeTotalStepCount;
		avg_ped_cumulativeDistance = pedometerInfo.cumulativeDistance;
		avg_ped_cumulativeWalkStepCount = pedometerInfo.cumulativeWalkStepCount;
		avg_ped_cumulativeRunStepCount = pedometerInfo.cumulativeRunStepCount;

	} else {
		avg_ped_stepStatus += stepStatus;
		avg_ped_speed += pedometerInfo.speed;
		avg_ped_walkingFrequency += pedometerInfo.walkingFrequency;
		avg_ped_cumulativeTotalStepCount += pedometerInfo.cumulativeTotalStepCount;
		avg_ped_cumulativeDistance += pedometerInfo.cumulativeDistance;
		avg_ped_cumulativeWalkStepCount += pedometerInfo.cumulativeWalkStepCount;
		avg_ped_cumulativeRunStepCount += pedometerInfo.cumulativeRunStepCount;
	}
	count_ped++;

	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_ped.getTime() >= AVG_PERIOD || ( count_ped >= sampleCounter && !tizen.power.isScreenOn())){ 
		if (count_ped != 0) {
			avg_stream_PED.write(date_now.getTime() + "\t" + count_ped
					+ "\t" + avg_ped_stepStatus / count_ped + "\t"
					+ avg_ped_speed / count_ped + "\t" + avg_ped_walkingFrequency
					/ count_ped + "\t" + avg_ped_cumulativeTotalStepCount
					/ count_ped + "\t"+ avg_ped_cumulativeDistance / count_ped+ "\t"+
					avg_ped_cumulativeWalkStepCount / count_ped + "\t"+
					userID + "\n");
			avg_ped_stepStatus = 0;
			avg_ped_speed = 0;
			avg_ped_walkingFrequency = 0;
			avg_ped_cumulativeTotalStepCount = 0;
			count_ped = 0;
		}
		last_avg_time_ped  = date_now;
	}

}
function onGetSuccessCB(sensorData) {

	//console.log("light level: " + sensorData.lightLevel);
	box = document.querySelector('#textbox0');
	box.innerHTML = "Light: " + sensorData.lightLevel;
	var d = new Date();
	stream_LGT.write(d.getTime() + "\t" + sensorData.lightLevel + "\n");

	if (avg_lgt == null || avg_lgt == 0) {
		avg_lgt = sensorData.lightLevel;
	} else {
		avg_lgt += sensorData.lightLevel;
	}
	count_lgt++;

	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_lgt.getTime() >= AVG_PERIOD || ( count_lgt >= sampleCounter && !tizen.power.isScreenOn()) ){ 
		if (count_lgt != 0) {
			avg_stream_LGT.write(date_now.getTime() + "\t" + count_lgt + "\t"
					+ avg_lgt / count_lgt + "\t"+userID + "\n");
			avg_lgt = 0;
			count_lgt = 0;
		}
		else {
			strem_ERR.write(date_now.getTime() + "\t" + count_lgt +"\n");
		}		
		last_avg_time_lgt  = date_now;
	}	
}

function onsuccessCB() {
	//console.log("Light sensor started");
	lightSensor.getLightSensorData(onGetSuccessCB);
}

var UV_THRESHOLD = 0.1;

function onGetSuccessUV(sensorData) {

	//console.log("ultraviolet level : " + sensorData.ultravioletLevel);
	box = document.querySelector('#textbox2');
	box.innerHTML = "UV: " + sensorData.ultravioletLevel;
	var d = new Date();
	stream_UVL.write(d.getTime() + "\t" + sensorData.ultravioletLevel + "\n");

	if ( gps ){
/*		if ( sensorData.ultravioletLevel >= UV_THRESHOLD ){
			getGeoLocation();
		}*/
	}
	
	if (avg_uvl == null || avg_uvl == 0) {
		avg_uvl = sensorData.ultravioletLevel;
	} else {
		avg_uvl += sensorData.ultravioletLevel;
	}
	count_uvl++;

	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_uvl.getTime() >= AVG_PERIOD || (count_uvl >= sampleCounter && !tizen.power.isScreenOn())){ 
		if (count_uvl != 0) {
			avg_stream_UVL.write(date_now.getTime() + "\t" + count_uvl + "\t"
					+ avg_uvl / count_uvl + "\t"+userID + "\n");
			avg_uvl = 0;
			count_uvl = 0;
		}
		last_avg_time_uvl  = date_now;
	}		
}

function onerrorUV(error) {
	//console.log("UV error " + error);
	var dd = new Date();
	stream_ERR.write(dd.getTime() + "\t" + "UV error " + error + "\n");
}

function onsuccessUV() {
	//console.log("ultraviolet sensor start");
	ultravioletSensor.getUltravioletSensorData(onGetSuccessUV, onerrorUV);
}

function onGetSuccessMG(sensorData) {	

	//console.log("magnetic field of the X axis : " + sensorData.x);
	//console.log("magnetic field of the Y axis : " + sensorData.y);
	//console.log("magnetic field of the Z axis : " + sensorData.z);
	box = document.querySelector('#textbox3');
	box.innerHTML = "MG: " + sensorData.x + " " + sensorData.y + " "
	+ sensorData.z;
	var d = new Date();
	stream_MGN.write(d.getTime() + "\t" + sensorData.x + "\t" + sensorData.y
			+ "\t" + sensorData.z + "\n");

	if (avg_mgn_x == null || avg_mgn_x == 0) {
		avg_mgn_x = sensorData.x;
		avg_mgn_y = sensorData.y;
		avg_mgn_z = sensorData.z;
	} else {
		avg_mgn_x += sensorData.x;
		avg_mgn_y += sensorData.y;
		avg_mgn_z += sensorData.z;
	}
	count_mgn++;

	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_mgn.getTime() >= AVG_PERIOD || (count_mgn >= sampleCounter && !tizen.power.isScreenOn()) ){ 
		if (count_mgn != 0) {
			avg_stream_MGN.write(date_now.getTime() + "\t" + count_mgn + "\t"
					+ avg_mgn_x / count_mgn + "\t" + avg_mgn_y / count_mgn + "\t"
					+ avg_mgn_z / count_mgn  + "\t"+userID + "\n");
			avg_mgn_x = 0;
			avg_mgn_y = 0;
			avg_mgn_z = 0;
			count_mgn = 0;
		}
		last_avg_time_mgn  = date_now;
	}		
}

function onerrorMG(error) {
	//console.log("error occurs");
	var dd = new Date();
	stream_ERR.write(dd.getTime() + "\t" + "MGN error: " + error + "\n");
}

function onsuccessMG() {
	//console.log("MMagnetic sensor start");
	magneticSensor.getMagneticSensorData(onGetSuccessMG, onerrorMG);
}

function onchangedGPS(gpsInfo) {

	box = document.querySelector('#textbox10');
	box.innerHTML = "GPS: " + gpsInfo.latitude + "\t" + gpsInfo.longitude
	+ "\t" + gpsInfo.altitude + "\t" + gpsInfo.speed + "\t"
	+ gpsInfo.errorRange + "\t" + gpsInfo.timestamp;
	var d = new Date();
	stream_GPS.write(d.getTime() + "\t" + gpsInfo.latitude + "\t"
			+ gpsInfo.longitude + "\t" + gpsInfo.altitude + "\t"
			+ gpsInfo.speed + "\t" + gpsInfo.errorRange + "\t"
			+ gpsInfo.timestamp);

	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_gps.getTime() >= AVG_PERIOD ){ 
		if (count_gps != 0) {
			avg_stream_GPS.write(date_now.getTime() + "\t" + count_gps + "\t"
					+ avg_gps_x / count_gps + "\t" + avg_gps_y / count_gps + "\t"+userID + "\n");
			avg_gps_x = 0;
			avg_gps_y = 0;
			count_gps = 0;
		}
		last_avg_time_gps  = date_now;
	}

}

function onchangedGPS2(gpsInfo) {

	var box = document.querySelector('#textbox10');
	box.innerHTML = "GPS: " + gpsInfo.coords.latitude + "\t"	+ gpsInfo.coords.longitude; // +"\t"+gpsInfo.altitude+"\t"+gpsInfo.speed+"\t"+gpsInfo.errorRange+"\t"+gpsInfo.timestamp;
	// box.innerHTML = "GPS: " + gpsInfo.latitude+"\t" +gpsInfo.longitude
	// +"\t"+gpsInfo.altitude+"\t"+gpsInfo.speed+"\t"+gpsInfo.errorRange+"\t"+gpsInfo.timestamp;

	stream_GPS.write(new Date().getTime() + "\t" + gpsInfo.coords.latitude + "\t"+ gpsInfo.coords.longitude + "\n");		
	
	/*if (gpsInfo.coords.latitude && gpsInfo.coords.latitude !== 'undefined') {
		stream_GPS.write(d.getTime() + "\t" + gpsInfo.coords.latitude + "\t"
				+ gpsInfo.coords.longitude + "\n");		
	}
	else{
		stream_ERR.write(new Date() + "GPS undefined\n");
	} 
*/
	if (avg_gps_x == null || avg_gps_x == 0) {
		avg_gps_x = gpsInfo.coords.latitude;
		avg_gps_y = gpsInfo.coords.longitude;
	} else {
		avg_gps_x += gpsInfo.coords.latitude;
		avg_gps_y += gpsInfo.coords.longitude;
	}
	count_gps++;

	var date_now = new Date();
	//if ( date_now.getTime() - last_avg_time_gps.getTime() >= AVG_PERIOD || ( count_gps >= sampleCounter && !tizen.power.isScreenOn()) ){ 
		if (count_gps != 0) {
			avg_stream_GPS.write(date_now.getTime() + "\t" + count_gps + "\t"
					+ avg_gps_x / count_gps + "\t" + avg_gps_y / count_gps + "\t"+userID + "\n");
			avg_gps_x = 0;
			avg_gps_y = 0;
			count_gps = 0;
		}
		last_avg_time_gps  = date_now;
	//}	

	// stream_GPS.write(d.toLocaleString() + "\t" + d.getTime()+"\t"+
	// gpsInfo.latitude+"\t" +gpsInfo.longitude
	// +"\t"+gpsInfo.altitude+"\t"+gpsInfo.speed+"\t"+gpsInfo.errorRange+"\t"+gpsInfo.timestamp);
}

function onchangedHR(hrmInfo) {

	box = document.querySelector('#textbox4');
	box.innerHTML = "HR: " + hrmInfo.heartRate + " RR(ms): "
	+ hrmInfo.rRInterval;
	var d = new Date();
	if (hrmInfo.heartRate > 0) {
		stream_HRT.write(d.getTime() + "\t" + hrmInfo.heartRate + "\t"
				+ hrmInfo.rRInterval + "\n");

		if (avg_hrt_rate == null || avg_hrt_rate === 0) {
			avg_hrt_rate = hrmInfo.heartRate;
			avg_hrt_interval = hrmInfo.rRInterval;
		} else {
			avg_hrt_rate += hrmInfo.heartRate;
			avg_hrt_interval += hrmInfo.rRInterval;
		}
		count_hrt++;
	}

	var date_now = new Date();
	if ( date_now.getTime() - last_avg_time_hrt.getTime() >= AVG_PERIOD || ( count_hrt >= sampleCounter && !tizen.power.isScreenOn()) ){ 
		if (count_hrt != 0) {
			avg_stream_HRT.write(date_now.getTime() + "\t" + count_hrt + "\t"
					+ avg_hrt_rate / count_hrt + "\t" + avg_hrt_interval
					/ count_hrt + "\t"+userID + "\n");
			avg_hrt_rate = 0;
			avg_hrt_interval = 0;
			count_hrt = 0;
		}
		last_avg_time_hrt  = date_now;
	}
}

var sampleCounter = 1300;
var sendingCounter = sampleCounter * 10;

function onerrorGPS(error) {
	box = document.querySelector('#textbox10');
	box.innerHTML = "GPS error: " + JSON.stringify(error);
	//console.log("Error occurs. name:" + error.name + ", message: "			+ error.message);
	var dd = new Date();
	stream_ERR.write(dd + "\t" + box.innerHTML + "\n");

}

//var fileToRead;
//var textToSend;

var HISTORY_PERIOD = 1000*60*60*24*5; // in milliseconds

function XHRTimer() {
	//syncConfig();
	onErrorCounter = 0;
	/*
	if (!networkConnected) {
<<<<<<< HEAD
=======
		console.log(new Date() + "\tNo network connection.\n");
>>>>>>> stash
		return;
	}
	 */
	tizen.filesystem.resolve(
			'documents',
			function(dir) {
				documentsDir = dir;
				var timeNow = new Date();
				var timeAgo = new Date(timeNow.getTime() - HISTORY_PERIOD);
				/* Stop and close the streams for avg files, we need to send them, afger all :-)  */
				//clearInterval(avg_Timer);	
				stream_ERR.write(new Date() + " XHR takes average\n");
				if (!streamsClosed){
					//takeAverage(new Date());
					//last_avg_time = new Date();
					closeStreams();
				}										
				dir.listFiles(onsuccessSort, onerror, {name: "avg_%", startCreated: timeAgo, endCreated: timeNow});
			}, function(e) {
				//console.log("Error" + e.message);
				stream_ERR.write(new Date() + " Exception at XHR\n");
			}, "rw"
	); 	
}

function cpuTimer() {
	tizen.power.request("CPU", "CPU_AWAKE");
	tizen.power.request("SCREEN", "SCREEN_NORMAL");	
}

function goToSurvey() {
	var hour = new Date().getHours();
	if(hour<23 && hour>8) {
		//mVibrate();
		return window.location.href = "valence.html";
		var date = new Date().getTime();
		var toDate = new Date(date + 5*1000);
		var alarm1 = new tizen.AlarmAbsolute(toDate);
		var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view");
		//var appInfo = tizen.application.getAppInfo("org.tizen.application");							
		tizen.alarm.add(alarm1, tizen.application.getCurrentApplication().appInfo.id);
		//tizen.alarm.add(alarm1, "org.tizen.browser");
		stream_ERR.write(new Date()+" alarm id: "+alarm1.id+"\n");
		html = "Tiem to survey alarm";
		document.getElementById("textbox9").innerHTML = html;
		stream_ERR.write(new Date() + "\t" + "ajaxSuccess " + date + "\n");
	}	
}

var html = "";

//event occured when the request starts
function onloadstarthandler(e) {
	html += "onloadstart<br/>";
	document.getElementById("textbox9").innerHTML = html;
}

//event occured while sending and loading data
function onprogresshandler(e) {
	html += "onprogress (" + parseInt(e.loaded / e.totalSize * 100)
	+ "%) <br/>";
	document.getElementById("textbox9").innerHTML = html;
	stream_ERR.write(new Date()+"\t"+"onProgress "+e.message+"\n");
}

//event occured when the request has been abored
function onaborthandler(e) {
	html += "onabort<br/>";
	document.getElementById("textbox9").innerHTML = html;
}

var onErrorCounter = 0;

//event occured when the request has failed
function onerrorhandler(e) {
	onErrorCounter++;
	html += "onerror<br/>";
	document.getElementById("textbox9").innerHTML = html;
	stream_ERR.write("Error sending file at " + new Date()+ " "+JSON.stringify(e) +"\n");
}

//event occured when the request has successfully completed
function onloadhandler(e) {
	html += "onload<br/>";
	document.getElementById("textbox9").innerHTML = html;
	stream_ERR.write(new Date()+"\t"+"onLoad "+JSON.stringify(e)+"\n");
}

//event occured when the author specified timeout has passed before the request
//could complete
function ontimeouthandler(e) {
	html += "ontimeout<br/>";
	document.getElementById("textbox9").innerHTML = html;
}

//event occured when the request has completed (either in success or failure)
function onloadendhandler(e) {
	html += "onloadend<br/>";
	document.getElementById("textbox9").innerHTML = html;
}
//event occured when the readyState attribute changes at some seemingly
//arbitrary times for historical reasons
function onreadystatechangehandler(e) {
	if (this.readyState == this.DONE) {
		if (this.status == 200 && this.responseXML != null) {
			document.getElementById("textbox9").innerHTML = this.responseText;
			stream_ERR.write(new Date()+"\t"+"serverResponse "+this.responseText+"\n");
			return;
		}
		else {
			stream_ERR.write(new Date()+"\t"+"serverError "+JSON.stringify(e)+"\n");
		}
	}
	else {
		stream_ERR.write(new Date()+"\t"+"readyState "+this.readyState+"\n");
	}
}

function onFileError(error) {
	//console.log("The error " + error.message			+ " occurred when listing the files in the selected folder");
}

function takeAverage(date_now) {
	stream_ERR.write(new Date() + " starting averaging\n");

	if (count_acc != 0) {
		avg_stream_ACC.write(date_now.getTime() + "\t" + count_acc + "\t"
				+ batteryLevel + "\t" + avg_acc_x / count_acc + "\t" + (-1)
				* avg_acc_y / count_acc + "\t" + (-1) * avg_acc_z / count_acc
				+ "\t" + avg_acc_alpha / count_acc + "\t" + avg_acc_beta
				/ count_acc + "\t" + avg_acc_gamma / count_acc + "\t"+userID+"\n");
		avg_acc_x = 0;
		avg_acc_y = 0;
		avg_acc_z = 0;
		avg_acc_alpha = 0;
		avg_acc_beta = 0;
		avg_acc_gamma = 0;
		count_acc = 0;
		count_battery = 0;
	}

	if (count_mgn != 0) {
		avg_stream_MGN.write(date_now.getTime() + "\t" + count_mgn + "\t"
				+ avg_mgn_x / count_mgn + "\t" + avg_mgn_y / count_mgn + "\t"
				+ avg_mgn_z / count_mgn  + "\t"+userID + "\n");
		avg_mgn_x = 0;
		avg_mgn_y = 0;
		avg_mgn_z = 0;
		count_mgn = 0;
	}

	if (count_lgt != 0) {
		avg_stream_LGT.write(date_now.getTime() + "\t" + count_lgt + "\t"
				+ avg_lgt / count_lgt + "\t"+userID + "\n");
		avg_lgt = 0;
		count_lgt = 0;
	}

	if (count_uvl != 0) {
		avg_stream_UVL.write(date_now.getTime() + "\t" + count_uvl + "\t"
				+ avg_uvl / count_uvl + "\t"+userID + "\n");
		avg_uvl = 0;
		count_uvl = 0;
	}

	if (count_pre != 0) {
		avg_stream_PRE.write(date_now.getTime() + "\t" + count_pre + "\t"
				+ avg_pre / count_pre + "\t"+userID + "\n");
		avg_pre = 0;
		count_pre = 0;
	}
	
	if (count_ped != 0) {
		avg_stream_PED.write(date_now.getTime() + "\t" + count_ped + "\t"
				+ batteryLevel + "\t" + avg_ped_stepStatus / count_ped + "\t"
				+ avg_ped_speed / count_ped + "\t" + avg_ped_walkingFrequency
				/ count_ped + "\t" + avg_ped_cumulativeTotalStepCount
				/ count_ped + "\t"+userID + "\n");
		avg_ped_stepStatus = 0;
		avg_ped_speed = 0;
		avg_ped_walkingFrequency = 0;
		avg_ped_cumulativeTotalStepCount = 0;
		count_ped = 0;
	}

	if (count_gps != 0) {
		avg_stream_GPS.write(date_now.getTime() + "\t" + count_gps + "\t"
				+ avg_gps_x / count_gps + "\t" + avg_gps_y / count_gps + "\t"+userID + "\n");
		avg_gps_x = 0;
		avg_gps_y = 0;
		count_gps = 0;
	}

	if (count_hrt != 0) {
		avg_stream_HRT.write(date_now.getTime() + "\t" + count_hrt + "\t"
				+ avg_hrt_rate / count_hrt + "\t" + avg_hrt_interval
				/ count_hrt + "\t"+userID + "\n");
		avg_hrt_rate = 0;
		avg_hrt_interval = 0;
		count_hrt = 0;
	}

	if (networkConnected){
		if (networkType == 'WIFI') {
			avg_stream_NTW.write(date_now.getTime() + "\t" + 1 + "\t"+ 1 + "\t" + userID +"\n");
		}else if (networkType == 'ETHERNET') {
			avg_stream_NTW.write(date_now.getTime() + "\t" + 1 + "\t"+ 2 + "\t" + userID +"\n");
		}else {
			avg_stream_NTW.write(date_now.getTime() + "\t" + 1 + "\t"+ 3 + "\t" + userID +"\n");
		}
	}
	else{
		avg_stream_NTW.write(date_now.getTime() + "\t" + 0 + "\t"+ 0 + "\t" + userID +"\n");
	}

	stream_ERR.write(new Date() + " finishing averaging\n");

}

function getGeoLocation() {
	if (!gps){
		return; 
	}
	try {
		//navigator.geolocation.watchPosition(onchangedGPS2, onerrorGPS, GPSoptions);		
		navigator.geolocation.getCurrentPosition(onchangedGPS2, onerrorGPS, GPSoptions);		
		 
	} catch (error) {
		box = document.querySelector('#textbox9');
		box.innerHTML = error;
		var dd = new Date();
		stream_ERR.write(dd.getTime() + "\t" + "GPS geolocation error: "
				+ error + "\n");
	}
}

var GPSoptions = {
		  enableHighAccuracy: true,
		  maximumAge: 0,
		  timeout: GPS_TIMEOUT		  
		};

function onsuccessSort(files) 
{
	/* Restart the average taking procedure */
	stream_ERR.write(new Date() + "\t" + "onSuccessSort\n");
	createAvgFiles(documentsDir, new Date());
	/*
	var avg_d = new Date();
	takeAverage(avg_d);
	last_avg_time = avg_d;
	 */
	/*
	avg_Timer = setInterval(function() {
		var date = new Date();
		takeAverage(date);
	}, AVG_PERIOD);
	 */

	stream_ERR.write("Number of files: "+ files.length + "\n");
	files.sort(function(a, b){
		if(a.name < b.name) return -1;
		if(a.name > b.name) return 1;
		return 0;
	});

	stream_ERR.write(new Date()+"\t sorting \n");
	for (var i = 0; i < files.length  ; i++) { 
		if (files[i].fileSize == 0	){
			documentsDir.deleteFile(files[i].fullPath,function(){stream_ERR.write(new Date + " File deleted\n")});
			continue;
		}
		var initial = files[i].name.split('_')[0].toLowerCase();
		//if(initial=='avg') {
		//console.log("AVG is " + files[i].name);
		//stream_ERR.write("AVG is " + files[i].name+"\n");			
		//var sensortype = files[i].name.split('_')[1].toLowerCase();
		//if(sensortype=='acc' && sensortype!=files[i+1].name.split('_')[1].toLowerCase()) {
		var tempFile = 'documents/'+files[i].name;
		listOfFilesToRead.push(tempFile);	
		//console.log("-----Pushed File Name is " + files[i].name);
		stream_ERR.write("-----Pushed File Name is " + files[i].name+"\n");			  
		//}
		//}
	}

	if (listOfFilesToRead.length == 0){
		stream_ERR.write(new Date() + " no files found to be sent.\n");
		return;		
	}	

	sendFiles();
	/*
	if (typeof userID === undefined){

		try {
			tizen.filesystem.resolve('documents/userid.txt', function(
					dir) {
				file_UID = dir;
				file_UID.openStream(
						"r",
						function(fs){
							if (file_UID.fileSize == 0){
								return;
							}
							userID = fs.read(file_UID.fileSize);
							if (typeof userID === undefined){
								box = document.querySelector('#textbox11');
								box.innerHTML = "UserID not found";
								return;
							} 
							box = document.querySelector('#textbox11');
							box.innerHTML = userID;
							sendFiles();
							fs.close();
						}, function(e) {
							console.log("Error " + e.message);
						}, "UTF-8"
				);
			}, function(e) {
				stream_ERR.write(new Date + "\t" + "UIDerror: " + e.message);
			});

		} catch (e) {
			stream_ERR.write(new Date + "\t" + "exception: " + e.message);
		}	
	}
	else {
		sendFiles();
	}
	 */
}	

var streamsClosed = true;
function closeStreams(){
	avg_stream_ACC.close();
	avg_stream_LGT.close();
	avg_stream_UVL.close();
	avg_stream_PED.close();
	avg_stream_MGN.close();
	avg_stream_HRT.close();
	avg_stream_GPS.close();
	avg_stream_NTW.close();
	avg_stream_PRE.close();
	streamsClosed=true;
	stream_ERR.write(new Date() + " closed streams\n");
}

function sendFiles() {

	// xmlhttp.open("POST", url, true);
	// xmlhttp.setRequestHeader("Content-type",
	// "application/x-www-form-urlencoded");
	if (listOfFilesToRead.length == 0) {
		stream_ERR.write(new Date() + "No files to send\n");

	}

	while (listOfFilesToRead.length > 0) {
		if ( onErrorCounter >= 3 ) {
			stream_ERR.write(new Date() + "Too many errors sending\n");
			break;
		}
		//console.log("List of files to read array " + listOfFilesToRead);
		var temp = listOfFilesToRead.pop().toLocaleString();
		//console.log("TEMP is " + temp);
		stream_ERR.write(new Date() + "\nTEMP is " + temp + " \n");

		if (typeof temp === undefined || temp == null) {
			stream_ERR.write(new Date() + "\nTEMP is null " + temp + " \n");
			return;
		}
		try {
			tizen.filesystem.resolve(temp, function(dir) {
				var fileToRead = dir;
				fileToRead.openStream("r", function(fs) {
					var textToSend = fs.readBytes(fileToRead.fileSize);
					var formData = new FormData();
					formData.enctype = "multipart/form-data";

					/*
					fileToRead.openStream(
					        "r",
					        function(fs){
					         textToSend = fs.readBytes(fileToRead.fileSize);  
					         console.log("Read!");
					         fs.close();
					        }, function(e) {
					          console.log("Error " + e.message);
					        }, "UTF-8"
					    );
					 */
					stream_ERR.write("Attempt to send "+fileToRead.name+"\n");
					var array = $.map(textToSend, function(value, index) {
						return [ value + "\n" ];
					});
					var fileToSend = new Blob(array, {
						type : 'application/octet-stream'
					});
					formData.append("mfile", fileToSend, fileToRead.name.split('_')[1]
					.toLowerCase());
					xmlhttp.open("POST", url, true);
					xmlhttp.setRequestHeader("Content-Type", "multipart/form-data");
					//xmlhttp.send("data=" + JSON.stringify(textToSend));
					// xmlhttp.setRequestHeader("Content-type",
					// "application/x-www-form-urlencoded");	

					$.ajax({
						url : 'http://79.123.177.182:8010/ph2015/gear2.php',
						data : formData,
						processData : false,
						contentType : false,
						cache : false,
						type : 'POST',
						enctype : 'multipart/form-data',
						mimeType : 'multipart/form-data',
						error: onerrorhandler,
						success : function(data) {
							onErrorCounter = 0;
							//mVibrate();				
							/*
							var date = new Date().getTime();
							var toDate = new Date(date + 5*1000);
							var alarm1 = new tizen.AlarmAbsolute(toDate);
							var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/view");
							//var appInfo = tizen.application.getAppInfo("org.tizen.application");							
							tizen.alarm.add(alarm1, tizen.application.getCurrentApplication().appInfo.id);//, appControl);
							//tizen.alarm.add(alarm1, "org.tizen.browser");
							stream_ERR.write(new Date()+" alarm id: "+alarm1.id+"\n");
							 */							
							html = "File sent";
							document.getElementById("textbox9").innerHTML = html;
							//stream_ERR.write(new Date() + "\t" + "ajaxSuccess " + data	+ "\n");
							stream_ERR.write(new Date() + "\t" + "ajaxSuccess " + "\n");
							//console.log(listOfFilesToRead.pop() + "is popped!");
							tizen.filesystem.resolve('documents', function(dir) {
								documentsDir = dir;
								var deletedFile = fileToRead.name;
								dir.moveTo(fileToRead.fullPath, 'documents/sent_'
										+ fileToRead.name, true, function() {
									stream_ERR.write("File "+ deletedFile + " moved at "+new Date()+"\n");
								});
							}, function(e) {
								stream_ERR.write("Error moving file "+new Date()+"\n");
								console.log("Error" + e.message);
							}, "rw");
						}
					});

					fs.close();
					//console.log("Popped File is  " + fileToRead);
				}, function(e) {
					console.log("Error " + e.message);
					stream_ERR.write(new Date + "\t" + "file read error: "+ temp +" " + e.message+ "\n");
				}, "UTF-8");
			}, function(e) {
				stream_ERR.write(new Date + "\t" + "temp error: "+ temp +" " + e.message+ "\n");
			});
		} catch (e) {
			stream_ERR.write("Error after pop: " + e.message + "\n");
		}
		//console.log(listOfFilesToRead);
		last_sent_time = new Date();

		//xmlhttp.send(formData);
	}
}
xmlhttp.onloadstart = onloadstarthandler;
xmlhttp.onprogress = onprogresshandler;
xmlhttp.onabort = onaborthandler;
xmlhttp.onerror = onerrorhandler;
xmlhttp.onload = onloadhandler;
xmlhttp.ontimeout = ontimeouthandler;
xmlhttp.onloadend = onloadendhandler;

function mVibrate(){
	tizen.power.turnScreenOn(); //turn screen on
	tizen.power.request("SCREEN", "SCREEN_DIM"); //keep the screen at least dimmed for undefinite time
	tizen.power.request("SCREEN", "SCREEN_NORMAL"); //keep the screen at least in normal state
	//navigator.vibrate([1000, 1000, 2000, 2000, 1000]);
	navigator.vibrate([1000, 2000]);
	tizen.power.release("SCREEN");
}


function syncConfig(){
	var year,month,day,hour,min;
	$.get(configURL, function(data) {
		var mstr = JSON.parse(data);
		var str = "";
		$.each(mstr, function(key, value) { 
			if (key === 'upload'){
				SEND_PERIOD = value*1000*60;
			}
			else if (key === 'continuousSensing'){
				screenToggle = value; 
			}
			else if (key === 'acc'){
				acc = value; 
			}
			else if (key === 'gyro'){
				gyro = value; 
			}
			else if (key === 'gps'){
				gps = value; 
			}
			else if (key === 'bar'){
				bar = value; 
			}
			else if (key === 'mgn'){
				mgn = value; 
			}
			else if (key === 'lgt'){
				lgt = value; 
			}
			else if (key === 'uvl'){
				uvl = value; 
			}
			else if (key === 'ped'){
				ped = value; 
			}
			else if (key === 'hrt'){
				hrt = value; 
			}
			else if (key === 'ntw'){
				ntw = value; 
			}
			else if (key === 'year') {
				year = value;
			}
			else if (key === 'month') {
				month = value;
			}
			else if (key === 'day') {
				day = value;
			}
			else if (key === 'hour') {
				//if(hour!=value) tizen.alarm.removeAll();	
				hour = value;
			}
			else if (key === 'min') {
				//if(min!=value) tizen.alarm.removeAll();
				min = value;
			}
			else if (key === 'VIBRATE_PERIOD') {
				//if(min!=value) tizen.alarm.removeAll();
				VALENCE_PERIOD = value*1000*60;
			}			
			else if (key === 'GPS_TIMEOUT') {
				//if(min!=value) tizen.alarm.removeAll();
				GPS_TIMEOUT = value*1000*60;
			}
			else if (key === 'GPS_PERIOD') {
				//if(min!=value) tizen.alarm.removeAll();
				GPS_PERIOD = value*1000*60;
			}			
			else if (key === 'screenOffTimeWithSmoking') {
				//if(min!=value) tizen.alarm.removeAll();
				screenOffTimeWithSmoking = value * 1000 * 60 + 1000 * 10;
			}						
			else if (key === 'screenOffTimeNoSmoking') {
				//if(min!=value) tizen.alarm.removeAll();
				screenOffTimeNoSmoking = value * 1000 * 60; // + 1000 * 15;
			}
			else if (key === 'RUN_PERIOD') {
				//if(min!=value) tizen.alarm.removeAll();
				RUN_PERIOD = value * 1000 * 60;
			}							
			/*
                           $.each(this, function(key, value){
                           str =  str + "key: " + key + " value: " + value + "<br />";
                           });
			 */
			str =  str  + key + " =>  " + value + "<br />";
		});
		stream_ERR.write(str);
		
		// ----- Closed temporarily for new mode trial ---
		/*// Gets the current application ID.
		 var appId = tizen.application.getCurrentApplication().appInfo.id;
		// Triggers an alarm on a given date/time
		 var date = new Date(year, month, day, hour, min);
		 var alarm = new tizen.AlarmAbsolute(date, tizen.alarm.PERIOD_DAY);
		 var date2 = new Date(year, month, day, hour+2, min);
		 var alarm2 = new tizen.AlarmAbsolute(date2);
		 tizen.alarm.add(alarm, appId);
		 tizen.alarm.add(alarm2, appId);
		 box = document.querySelector('#alarmInfo');
		 box.innerHTML = year+"/"+month+"/"+day+"/"+hour+"/"+min;
		 box = document.querySelector('#alarmInfo2');
		 box.innerHTML =date2;*/
	}); 
	
}
