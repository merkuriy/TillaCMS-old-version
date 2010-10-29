	<script type="text/javascript" src="../css_js/jquery/jquery.js"></script>
	<script type="text/javascript" src="../css_js/jquery/jquery.form.js"></script>

	<script type="text/javascript">
		
		function FullScreen(){ 
			var winHeight  = $(window).height()-74;
			$('#DIVcontentAll').css('height',winHeight);
		}

		$(document).ready(function(){
			$("#panelupdate").css("background-color","#FFFFFF");
			$("#panelupdate").css("color","#000000");
			$("#panelupdate").children("a").css("color","#000000");


			$("#updateBTN").click(function(){
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=update&author=admin&action=updateCMS",
						success: function(data){
							alert(data);
						}
					});
			});

			$(window).bind("resize", function(){
				FullScreen();
			});
			
			FullScreen();

		});
	</script>