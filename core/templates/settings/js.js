	<script type="text/javascript" src="../css_js/jquery/jquery.js"></script>
	<script type="text/javascript" src="../css_js/jquery/jquery.form.js"></script>

	<script type="text/javascript">
		
		function FullScreen(){ 
			var winHeight  = $(window).height()-74;
			$('#DIVcontentAll').css('height',winHeight);
		}

		$(document).ready(function(){
			$("#panelsettings").css("background-color","#FFFFFF");
			$("#panelsettings").css("color","#000000");
			$("#panelsettings").children("a").css("color","#000000");


			// Реакция на добавления нового параметра
			$("#addSettings").click(function(){
				$("#createSettings").ajaxSubmit(function(data) {
					$("#settings").html(data);
					onLoadDel(); 
	            });
			});


			// Реакция на сохранение изменений
			$("#saveSettings").click(saveSettings);
			
			function saveSettings(){
				$("#updateSettings").ajaxSubmit(function(data) {
					$("#settings").html(data);
					onLoadDel();
					$("#saveSettings").click(saveSettings);
					alert('Изменения сохранены');
	            });
			}
			
			function onLoadDel(){
				$("span.delChildAttr").click(function(){
						$.ajax({
							type: "GET",
							url: "../core/admin.php",
							data: "module=settings&author=admin&action=deleteSettings&id="+$(this).attr("id"),
							success: function(data){
								$("#settings").html(data);
								onLoadDel();
							}
						});
				});
			}

			onLoadDel();

			$(window).bind("resize", function(){
				FullScreen();
			});
			
			FullScreen();

		});
	</script>