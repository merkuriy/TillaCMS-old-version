<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" dir="ltr">
<head>  
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Q-Panel CMS</title>
	<style type="text/css" media="screen, projection">
		/*<![CDATA[*/
		@import "../css_js/panel/default.css";
		@import "../css_js/panel/style.css";
		@import "../css_js/panel/jquery.tree.css";
		@import "../css_js/panel/jquery.contextMenu.css";
		/*]]>*/
	</style>
	<script type="text/javascript" src="../css_js/jquery/jquery.js"></script>
	
	<script type="text/javascript">
		$(document).ready(function(){
		
			$(window).bind("resize", function(){
				FullScreen();
			});
		
			function FullScreen(){ 
				var winHeight  = $(window).height()-104;
				$('#DIVcontentAll').css('height',winHeight);
			};
			
			FullScreen();
		});
	</script>
</head>
<body>
	<div id="DIVheadAll">
		<div id="DIVhead">
			<h1>Q-Panel CMS</h1>
		</div>
		<div id="DIVrightHead">
			%userName%
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="../" class="systemLink">На сайт</a>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="/?action=deauth" class="systemLink">Выход</a>
		</div>
	</div>
	<div id="DIVmenu">
		%link%
	</div>

	<div id="DIVcontentAll">	
		<div class="DIVheader">
			<h2>Добро пожаловать!</h2>
		</div>
		<p>
			Вы находитесь на стартовой странице системы управления сайтом "Q-Panel".
			С помощью этой системы Вы сможете всецело управлять своим сайтом, начиная от его структуры и заканчивая получением статистики.
		</p>
		<br />
		<h3>Модули Q-Panel</h3>
		<br />
		<p>
			<b>Структура</b> это модуль предназначенный для формирования структуры и редактирования контента сайта.<br />
			<b>Базовые классы</b> - модуль формирования классов, на которых основываются элементы структуры.<br />
			<b>Настройки</b> - модуль для настройки общих параметров сайта.<br />
			<b>Статистика</b> по посещениям, распределению браузеров, ОС и т.д.<br />
			<b>Баннеры</b> - модуль для управления баннерной рекламой на сайте.<br />
			<b>Пользователи</b> - модуль управления зарегестрированными пользователями.<br />
			<b>Шаблоны</b> - модуль для редактирования / создания / удаления шаблонов отображения сайта.<br />
		</p>
	</div>

</body>
</html>