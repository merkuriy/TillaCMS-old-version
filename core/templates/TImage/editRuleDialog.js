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
			$("#formNewRule").ajaxSubmit(function(data) {
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=baseclass&author=admin&action=editComponentSettings&id="+$("#id").val(),
					success: function(msg){
						$("#DIVcontent").html(msg);
					}
				});
			});
		});

		$("input.ruleSubmit").click(function(){
			$("#formEditRule"+$(this).attr("id")).ajaxSubmit(function(data) {
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=baseclass&author=admin&action=editComponentSettings&id="+$("#id").val(),
					success: function(msg){
						$("#DIVcontent").html(msg);
					}
				});
			});
		});

		$("span.deleteRule").click(function(){
			$.ajax({
				type: "GET",
				url: "../core/admin.php",
				data: "module=baseclass&author=admin&action=delComponentSettings&component=TImage&id="+$(this).attr("id"),
				success: function(msg){
					$("#DIVcontent").html(msg);
				}
			});

			$.ajax({
				type: "GET",
				url: "../core/admin.php",
				data: "module=baseclass&author=admin&action=editComponentSettings&id="+$("#id").val(),
				success: function(msg){
					$("#DIVcontent").html(msg);
				}
			});
		});

	});

</script>