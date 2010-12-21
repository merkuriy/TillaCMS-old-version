<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru" dir="ltr">
<head>  
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>%title% - Q-Panel CMS</title>
	<style type="text/css" media="screen, projection">
		/*<![CDATA[*/
		@import "../css_js/panel/default.css";
		@import "../css_js/panel/style.css";
		@import "../css_js/panel/jquery.tree.css";
		@import "../css_js/panel/jquery.contextMenu.css";
		
		@import "../css_js/qui/qui.css";
		@import "../css_js/qui/qui-tree.css";
		/*]]>*/
	</style>
	<link rel="stylesheet" href="/css_js/plupload/plupload.queue.css" type="text/css" media="screen" />
	

	%js%
</head>
<body>
	<div id="CMS_notify">

	</div>

	<div>
		<ul id="myMenu" class="contextMenu">
		</ul>
	</div>

	<div id="DIVheadAll">
		<div id="DIVhead">
			<h1>Q-Panel CMS v.1.061 beta</h1>
		</div>
		<div id="DIVrightHead">
			%userName%
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="../" class="systemLink">На сайт</a>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="" class="systemLink">Справка</a>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="/?action=deauth" class="systemLink">Выход</a>
		</div>
	</div>

	<div id="DIVmenu">
		%link%
	</div>
	%content%
</body>
</html>