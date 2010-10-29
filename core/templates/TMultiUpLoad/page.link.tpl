		<script type="text/javascript">
			$(document).ready(function(){
				$("<span id='callAttributesClass' class='selector'> Мультизагрузчик </span>").appendTo("#smallHeader");
				$("<div id='editAttributesClass' class='editContent2'></div>").appendTo("#smallContent");
				$("#editAttributesClass").hide();
				
				$("#callAttributesClass").click(function(){
					newWin = window.open('?module=structure&action=uploader&id='+$("#pageid").val(),'win',"width=400,height=200,status=no");

/*					$("#callSmallContent").css("background-color","#4A99D5");
					$("#callSmallContent").css("color","#FFFFFF");
					$("#callChildClass").css("background-color","#4A99D5");
					$("#callChildClass").css("color","#FFFFFF");
					$("#callAttributesClass").css("background-color","#FFFFFF");
					$("#callAttributesClass").css("color","#000000");
					$("#editMainList").hide();
					$("#editChildClass").hide();
					$("#editAttributesClass").show();
*/
				});

/*				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=structure&action=uploader&id="+$("#pageid").val(),
					success: function(msg){
						$("#editAttributesClass").html(msg);
						$("#DIVloader").hide();
						$("#DIVcontent").show();
					}
				});*/
			});
		</script>