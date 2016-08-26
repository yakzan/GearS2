var file_UID_options, stream_UID_options;
//(document).ready (function(){
function handleClick(){
	document.getElementsById('useridBox').value = "test-OK";
}
(function (iu) {
	document.getElementsById('useridBox').value = "test-onload";
	document.getElementById("button_OK").addEventListener("click",handleClick);
	var file_UID_options, stream_UID_options;
	console.log("In OPTIONS  ");
	var page = document.querySelector("#mains"),
	page2 =page.querySelector("#main"),
	box = page2.querySelector("#textbox12");  
	box.innerHTML = " IN OPTIONs";
	try{	
		console.log("In TRY ");
		tizen.filesystem.resolve('documents/userid.txt',	
		function(dir) {	
				file_UID_options = dir;	
				console.log("resolved documents %o", file_UID_options);
				}, 	function(e) {		 
					createUserID(); 
					box = document.querySelector('#textbox12');  
					box.innerHTML = box.innerHTML + " error "+e.message;	 
					console.log("ERR" + e.message);},"rw");
	}
	catch(e){
		box = document.querySelector('#textbox12');  
		box.innerHTML = box.innerHTML+ " exc " + e.message;
		console.log("In catch  "+e.message);
	}

		
	if (file_UID_options !== null) {  
		file_UID_options.openStream("w", function(fs) { 
			stream_UID_options=fs; 		       
		}, function(e) {	
			console.log("Error " + e.message);	
			}, "UTF-8");
	}
	if (stream_UID_options === null || stream_UID_options === undefined) {  
		file_UID_options.openStream("w", 
			function(fs) { stream_UID_options=fs;}, 
			function(e) { box = document.querySelector('#textbox12');  
				box.innerHTML = box.innerHTML + " loadStream "+e.message;			         
				console.log("Error " + e.message);}, 
			"UTF-8"	);		
	}

	//);




function createUserID (){
	var documentsDir, file_UID;
	tizen.filesystem.resolve("documents", function(result) 
         {
        documentsDir = result;
        file_UID = documentsDir.createFile("userid.txt");
    });

/*var documentsDir;
tizen.filesystem.resolve(
		'documents',
		function(dir) {
			documentsDir = dir;
			dir.listFiles(onsuccess,onFileError);
		}, function(e) {
			console.log("Error" + e.message);
		}, "rw"
);

file_UID = documentsDir.createFile("userid.txt");*/
}

function cancel(){
	console.log("Entered cancel button");
	return window.location.href = "index.html";
}
function checkUsers(){
//	console.log("Entered function");
//	console.log("try %o", file_UID_options);
//	  if ($('#userid').val() == null || $('#userid').val() == undefined) {
//			return;
//	  }		
//	//if($('#userid').val() == null || $('#userid').val() == undefined) {return ;}
//	onErrorUser();
	//if (stream_UID_options == null || stream_UID_options == undefined) { onErrorUser();}
	return window.location.href = "index.html";
	/*					  		
try {
	file_UID.readAsText(
	function(contents) {
	console.log('File contents:' + contents);
	if (contents == "" || contents == null){
		onErrorUser();
	}
	window.location.href = "index.html";
},	 
onErrorUser	
);
} catch (exc) {
console.log('readAsText() exception:' + exc.message + '');
}	
	*/
}
 function onErrorUser(){
	 if (stream_UID_options === null || stream_UID_options === undefined) { 
		 file_UID_options.openStream("w", 
				 function(fs) { stream_UID_options=fs;}, 
				 function(e) {
					 box = document.querySelector('#textbox12');  
					 box.innerHTML = box.innerHTML + " stream "+e.message; 
					 console.log("Error " + e.message); },
				 "UTF-8");
	 }		   
	 userID = $('#userid').val();
	 box = document.querySelector('#textbox12');
	 box.innerHTML = box.innerHTML + " user "+userID;	  
	 stream_UID_options.write(userID);
	 stream_UID_options.close();	  	  
}	
})(window.tau);