<div class="component">
	<div class="name_section">
		%title% (%name%):
		<span id="filePath%parentId%%name%">
			<a href="/data/images/%path%.jpg" style="display: inline-block; cursor: pointer; width: auto; height: 24px;">
				<img style="cursor: pointer; height: 26px;" src="/data/images/%path%.jpg" alt="%title%" />
			</a>
		</span>
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