<div class="componentLoader">
	<div id="loader%id%" class="mloader">
		<div id="filelist">No runtime found.</div>
	</div>
	<script language="javascript">
		$("#loader%id%").pluploadQueue({
			// General settings
			runtimes : 'html5,gears,flash,silverlight,browserplus',
			url : '/panel/structure?action=multiSave&pageid=%id%&name=%name%',
			unique_names : true,
			filters : [
				{title : "Image files", extensions : "jpg"}
			]
		});
	</script>
</div>