<div class="name_section_block">
	%title% (%name%):
</div>
<div class="TNFiles-menu">
	<a href="#" id="addButton%id%%name%">Добавить файлы</a>
</div>
<div class="TNFiles">
	<div class="files" id="files%id%%name%">
		%files%
	</div>
	<div id="loader%id%%name%" class="TNFilesLoader">
		<div id="filelist">Невозможно загрузить оболочку мультизагрузки</div>
	</div>
</div>

<script>
	
	$('#addButton%id%%name%').click(function(){
		
		$('#files%id%%name%').hide();
		
		var runtime = 'flash';
		if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
			runtime = 'flash,gears,html5,silverlight,browserplus'
		}
		
		$('#loader%id%%name%').show()
		.pluploadQueue({
			// General settings
			runtimes: runtime,
			url: '/panel/structure?action=editElementSCR&author=admin&id=%id%&name=%name%',
			unique_names: true,
			filters: [{
				title: "Image files",
				extensions: "jpg"
			}],
	        max_file_size : '10mb', 
	        chunk_size : '1mb',
			flash_swf_url : '/css_js/plupload/plupload.flash.swf'
		});
		
	});
	
</script>