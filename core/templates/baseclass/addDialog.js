<script>
	// Функция создания нового элемента
	$(document).ready(function(){
		$("#cancelBTN").click(function(){
			$("#DIVcontent").html('<div class="DIVheader"><h2>Базовые классы</h2></div>');
		});
		$("#createBTN").click(function(){
			$("#addClass").ajaxSubmit(function(data) {
				$("#tree").hide();	
				$("#tree_loader").show();
				$("#DIVcontent").html(data);
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=baseclass&author=admin&action=buildTree",
					success: function(msg){
						$("#tree_loader").hide();
						$("#tree").html(msg).show();
						onLoad();
					}
				});
			});
		});
	});
</script>