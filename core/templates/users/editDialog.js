<script>
	$(document).ready(function(){

		$("#cancelBTN").click(function(){
			$("#DIVcontent").hide();
			$("#DIVloader").show();
			$.ajax({
				type: "GET",
				url: "../core/admin.php",
				data: "module=users&author=admin&action=startPage",
				success: function(msg){
					$("#DIVcontent").html(msg);
					$("#DIVloader").hide();
					$("#DIVcontent").show();
					onLoadBTN();
				}
			});
		});

		$("#saveBTN").click(function(){

			$("#DIVcontent").hide();
			$("#DIVloader").show();


			$("#editElement").ajaxSubmit(function(data) { 

				$("#DIVloader").hide();
				$("#DIVcontent").show();

                alert(data);

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

            });

		});

	});
</script>