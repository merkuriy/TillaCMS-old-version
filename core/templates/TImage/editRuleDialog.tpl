%js%
<input type="text" value="width" class="settingEdit" />
<input type="text" value="height" class="settingEdit" />
<input type="text" value="psevdo" class="settingEdit" />
<input type="text" value="logo" class="settingEdit" />
<input type="text" value="logow" class="settingEdit" />
<input type="text" value="logoh" class="settingEdit" />
<input type="text" value="cropw" class="settingEdit" />
<input type="text" value="croph" class="settingEdit" />
<input type="text" value="resize" class="settingEdit" />
<input type="text" value="path" class="settingEdit" />
<br /><br />

%rule%

<br /><b>Новое правило:</b><br />
<form id="formNewRule" method="post" action="/panel/baseclass?action=createComponentSettings&id=%id%&component=TImage">
	<input type="text" name="width" class="settingEdit" />
	<input type="text" name="height" class="settingEdit" />
	<input type="text" name="psevdo" class="settingEdit" />
	<input type="text" name="logo" class="settingEdit" />
	<input type="text" name="logow" class="settingEdit" />
	<input type="text" name="logoh" class="settingEdit" />
	<input type="text" name="cropw" class="settingEdit" />
	<input type="text" name="croph" class="settingEdit" />
	<input type="text" name="resize" class="settingEdit" />
	<input type="text" name="path" class="settingEdit" />
	<input type="hidden" id="parent" value="%parent%" />
	<input type="hidden" id="id" value="%id%" />
	<input type="button" value="ОК" id="saveBTN" />
</form>
<br /><br />
<input type="button" value="Закрыть" id="cancelBTN" />