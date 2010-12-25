<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=windows-1250">
		<meta name="generator" content="PSPad editor, www.pspad.com">
		<title>Мультизагрузчик</title>
%javascript%
<style type="text/css" media="screen, projection">
	/*<![CDATA[*/
		@import "../css_js/upLoad/default.css";
		@import "../css_js/panel/default.css";
		@import "../css_js/panel/style.css";
		@import "../css_js/panel/jquery.tree.css";
		@import "../css_js/panel/jquery.contextMenu.css";

	/*]]>*/
</style>
	</head>
	<body>
		<div class="uploader" id="uploaderDIV">
			<h2>Мульти-загрузка файлов</h2>
			<form id="form1" action="index.php" method="post" enctype="multipart/form-data">
				Автор фотографий: <select name="author" id="author">%option%</select>
				<input type="hidden" id="pageID" value="%pageID%">
				<br /><br />
				<div class="uploader">
					<table>
						<tr valign="top">
							<td>
								<div id="flashUI1" style="display: none; border:0px;">

									<div class="uploader">
										<input type="hidden" name="po" value="sdsd" />
										<input type="button" value="Выбор файлов" onclick="upload1.selectFiles()" style="font-size: 8pt;" />
										<input type="button" value="Загрузить" onclick="upload1.startUpload()" style="font-size: 8pt;" />
										<input id="btnCancel1" type="button" value="Cancel Uploads" onclick="cancelQueue(upload1);" disabled="disabled" style="font-size: 8pt;" /><br />
									</div>
									<fieldset class="flash" id="fsUploadProgress1">
										<legend>Загрузка фотографий</legend>
									</fieldset>
								</div>
								<div id="degradedUI1" class="uploader">
									<fieldset>
										<legend>Загрузка фотографий</legend>
										<input type="file" name="anyfile1" /> (Any file, Max 100 MB)<br />
									</fieldset>
									<div class="uploader">
										<input type="submit" value="Submit Files" />
									</div>
								</div>
								<div id="divFile">
								</div>
							</td>
						</tr>
					</table>
				</div>
			</form>
		</div>
	</body>
</html>
