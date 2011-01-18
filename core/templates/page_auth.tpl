<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" dir="ltr">
<head>  
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Q-Panel CMS - Авторизация</title>
	<style type="text/css" media="screen, projection">
		/*<![CDATA[*/
		@import "/css_js/panel/default.css";
		@import "/css_js/panel/style.css";
		/*]]>*/
	</style>
	<script type="text/javascript" src="/css_js/jquery/jquery.js"></script>
	
	<script type="text/javascript">
		$(function(){
			
			$(window).bind("resize", function(){
				FullScreen();
			});
		
			function FullScreen(){ 
				var winHeight  = ($(window).height()/2)-67;
				var winWidth  = ($(window).width()/2)-150;
				$('#DIVauth').css('top',winHeight);
				$('#DIVauth').css('left',winWidth);
			};
			
			FullScreen();
		});
	</script>
</head>
<body>
	
	<div id="DIVauth">
		<div id="DIVheadAuth">
			<h1>Q-Panel CMS</h1>
		</div>
		<div id="DIVcontentAuth">
			<form method="post" action="/">
				<div class="DIVinput">
					<div class="DIVinputLabel">
						Логин:
					</div>
					<div class="DIVinputText">
						<input class="inputAuth" type="text" name="user_login" />
					</div>
				</div>
				<div class="DIVinput">
					<div class="DIVinputLabel">
						Пароль:
					</div>
					<div class="DIVinputText">
						<input class="inputAuth" type="password" name="user_password" />
					</div>
				</div>
				<div class="DIVinput"></div>
				<input type="hidden" name="param1" value="users_sys.auth" />
				<input type="submit" class="btnAuth" value="Войти" />
			</form>
		</div>
	</div>
	
</body>
</html>