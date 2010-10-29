<script type="text/javascript" src="../css_js/jquery/jquery.js"></script>
<script type="text/javascript" src="../css_js/jquery/jquery.form.js"></script>
<script type="text/javascript" src="../css_js/jquery/jquery.simple.tree.js"></script>
<script type="text/javascript" src="../css_js/jquery/jquery.contextMenu.js"></script>
<script type="text/javascript" src="../css_js/tiny_mce/tiny_mce.js"></script>

<script type="text/javascript" src="../css_js/upLoad/swfupload.js"></script>
<script type="text/javascript" src="../css_js/upLoad/swfupload.graceful_degradation.js"></script>
<script type="text/javascript" src="../css_js/upLoad/swfupload.queue.js"></script>
<script type="text/javascript" src="../css_js/upLoad/handlers.js"></script>

<script type="text/javascript">
	var upload1;
	$(document).ready(function(){

		upload1 = new SWFUpload({
			auto_upload : false,
			// Backend Settings
			upload_url: "/panel/structure?action=multiSave&pageid=%id%&author="+$("#author").val(),
			post_params: {"PHPSESSID" : "%session%"},

			// File Upload Settings
			file_size_limit : "102400",	// 100MB
			file_types : "*.jpg;*.jpeg",
			file_types_description : "Jpeg Files",
			file_upload_limit : "100",
			file_queue_limit : "0",

			// Event Handler Settings (all my handlers are in the Handler.js file)
			file_dialog_start_handler : fileDialogStart,
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,

			// Flash Settings
			flash_url : "../css_js/upLoad/swfupload_f8.swf",	// Relative to this file (or you can use absolute paths)

			swfupload_element_id : "flashUI1",		// Setting from graceful degradation plugin
			degraded_element_id : "degradedUI1",	// Setting from graceful degradation plugin
			custom_settings : {
				upload_target : "divFile",
				progressTarget : "fsUploadProgress1",
				cancelButtonId : "btnCancel1"
			},

			// Debug Settings
			debug: false
		});

		$("#author").change(function(){
			upload1.settings.upload_url = "/panel/structure?action=multiSave&pageid="+$("#pageID").val()+"&author="+$("#author").val();
		});
	});
</script>