<script>
	// Функция создания нового элемента
	$(document).ready(function(){
		$("#cancelBTN").click(function(){
			$("#DIVcontent").html('<div class="DIVheader"><h2>Структура</h2></div>');
		});
		$("#createBTN").click(function(){
			$("#addElement").ajaxSubmit(function(data) {
				if($("#parentHide").val()=='root'){
					$("#DIVcontent").html('<h2>Структура</h2>');
					$("#DIVcontent").html(data);
					parent = $('#parent').val();
					derevo.addNode('root',$('#pageid').val(),$('#pageTitle').val());

				}else{
					parent = $('#parent').val();
					$("#DIVcontent").html(data);
					derevo.addNode($('#derevoItem'+parent),$('#pageid').val(),$('#pageTitle').val());
				}
			});
		});
	});
</script>