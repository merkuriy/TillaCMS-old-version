<script>
	$(document).ready(function(){
		$("#cancelBTN").click(function(){
			$.ajax({
				type: "GET",
				url: "../core/admin.php",
				data: "module=baseclass&action=editClass&id="+$("#parent").val(),
				success: function(msg){
					$("#DIVcontent").html(msg);
				}
			});
		});
		$("#saveBTN").click(function(){
			$("#formEditSettings").ajaxSubmit(function(data) {
				alert(data);
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=baseclass&author=admin&action=editComponentSettings&id="+$('#id').val(),
					success: function(msg){
						$("#DIVcontent").html(msg);
					}
				});
			});
		});
		$(".delAttr").click(function(){
			$.ajax({
				type: "GET",
				url: "../core/admin.php",
				data: "module=baseclass&author=admin&action=delComponentSettings&component=TSelect&id="+$(this).attr('id'),
				success: function(msg){
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=baseclass&author=admin&action=editComponentSettings&id="+$('#id').val(),
						success: function(msg){
							$("#DIVcontent").html(msg);
						}
					});
				}
			});
		});
	});
</script>