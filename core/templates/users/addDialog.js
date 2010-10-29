<script>
	// Функция создания нового элемента
	$(document).ready(function(){
		$("#cancelBTN").click(function(){
			$("#DIVcontent").html('');
		});
		$("#createBTN").click(function(){
			$("#addElement").ajaxSubmit(function(data) {
				if($("#parent").val()=='0'){
					$("#DIVcontent").html('');

					// Обновляем дерево
					$("#tree").hide();	
					$("#tree_loader").show();

					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&author=admin&action=buildTree",
						success: function(msg){
							$("#tree").html(msg);
							$("#tree_loader").hide();
							$("#tree").show();
							onLoad();
						}
					});
				}else{
					$("#tree").hide();	
					$("#tree_loader").show();

					$("#DIVcontent").html(data);
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&author=admin&action=buildTree",
						success: function(msg){
							$("#tree").html(msg);
							$("#tree_loader").hide();
							$("#tree").show();
							onLoad();
						}
					});

				}
			});
		});
	});
</script>