<?
include_once('config.php');

$type = $_REQUEST['type'];
$check_upload = false;
$file_name = '';
$screen_max = 200;

if ( !in_array($type,array('image','media','file' )) ) $type = 'file';

if ( isset($_FILES["userfile"]) ) {
	if ( is_dir($conf->upload_dir) ) {
		$file_tmp = $_FILES['userfile']['tmp_name'];
		$file_name = $_FILES["userfile"]["name"];

		if ( !file_exists($conf->upload_dir.$file_name) ) {
			if (is_uploaded_file($file_tmp)) {
				if ( move_uploaded_file($file_tmp, $conf->upload_dir.$file_name) ) {
					$check_upload = true;
				}
			}
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>File Upload</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Pragma" content="no-cache" />
<script type="text/javascript" src="../../tiny_mce_popup.js"></script>
<script>
function selectURL(url) {
	document.passform.fileurl.value = url;
	FileBrowserDialogue.mySubmit();
}
var FileBrowserDialogue = {
	init : function () { },
	mySubmit : function () {
		var URL = document.passform.fileurl.value;
		var win = tinyMCEPopup.getWindowArg("window");
		win.document.getElementById(tinyMCEPopup.getWindowArg("input")).value = URL;
		if (typeof(win.ImageDialog) != "undefined") {
			if (win.ImageDialog.getImageData) win.ImageDialog.getImageData();
			if (win.ImageDialog.showPreviewImage) win.ImageDialog.showPreviewImage(URL);
		}
		tinyMCEPopup.close();
	}
}

tinyMCEPopup.onInit.add(FileBrowserDialogue.init, FileBrowserDialogue);
</script>
</head>
<body>
<div class="tabs">
<ul>
	<li id="general_tab" class="current"><span>Upload <? echo $type; ?></span></li>
</ul>
</div>
<form name="passform"><input name="fileurl" type="hidden" value="" /></form>
<form enctype="multipart/form-data" method="post" action="upload.php">
<input type="hidden" name="type" value="<?=$type?>">
<div class="panel_wrapper">
	<div id="general_panel" class="panel current">
<?
if ( $check_upload ) {
	list($width,$height,$imgtype) = getimagesize($conf->upload_url.$file_name);

	if ( $imgtype>=1 && $imgtype<=3 ) {
		$size_max = ($width>$height) ? $width : $height;
		if ( $size_max>$screen_max ) {
			$size_prc = 100*200/$size_max;
			$width = ceil($width*$size_prc/100);
			$height = ceil($height*$size_prc/100);
		}
		echo "<p><a href=\"#\" onclick=\"selectURL('" . $conf->upload_url.$file_name . "');\">".'<img border="0" src="'.$conf->upload_url.$file_name.'" width="'.$width.'" height="'.$height.'"></a></p>';
	}
	echo "<p><a href=\"#\" onclick=\"selectURL('" . $conf->upload_url.$file_name . "');\">" . $file_name . "</a></p>";
}
?>
		<table border="0" cellpadding="4" cellspacing="0">
		<tr>
			<td><label for="userfile"><? echo ucfirst($type); ?></label></td>
			<td><input type="file" id="userfile" name="userfile" style="width: 200px"></td>
		</tr>
		</table>
	</div>
</div>
<div class="mceActionPanel">
	<div style="float: left"><input type="submit" id="insert" name="upload" value="Upload" /></div>
	<div style="float: right"><input type="button" id="cancel" name="cancel" value="Cancel" onclick="tinyMCEPopup.close();" /></div>
</div>
</form>

</body>
</html>