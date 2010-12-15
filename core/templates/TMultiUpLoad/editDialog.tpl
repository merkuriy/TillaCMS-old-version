<div class="componentLoader">
	<div id="loader%id%" class="mloader">
		<div id="filelist">Невозможно загрузить оболочку мультизагрузки</div>
	</div>
	<script language="javascript">
		var runtime = 'flash';
		if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
			runtime = 'gears,html5,flash,silverlight,browserplus'
		}
		$("#loader%id%").pluploadQueue({
			// General settings
			runtimes: runtime,
			url: '/panel/structure?action=multiSave&pageid=%id%&name=%name%',
			unique_names: true,
			filters: [{
				title: "Image files",
				extensions: "jpg"
			}],
	        max_file_size : '10mb', 
	        chunk_size : '1mb', 
			flash_swf_url : '/css_js/plupload/plupload.flash.swf'
		})
		.find('div.plupload_header_title').text('%title% (%name%):');
	</script>
</div>