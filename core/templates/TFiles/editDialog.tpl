<div class="component">
	<div class="name_section">
		%title% (%name%): <span id="filePath%parentId%%name%">%data%</span>
	</div>
	<div class="link">
		<input type="button" name="%name%" id="delete%parentId%%name%" value="Удалить" />
		<input type="file" name="%name%" />
	</div>
</div>

<script>
	$('#delete%parentId%%name%').click(function(){
		
		var data = {
			id: $('#pageid').val(),
			"%name%": '#delete'
		}
		
		$.ajax({
			url: '/panel/structure?action=editElementSCR&author=admin',
			data: data,
			type: 'POST',
			cache: false,
			success: function(msg){
				
     			notify(msg);
				
				$('#filePath%parentId%%name%').html('');
				
				$('#delete%parentId%%name%').hide();
				
   			}

		});
		
	});
</script>