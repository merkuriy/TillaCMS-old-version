%js%
<h2>Базовые Классы</h2>
<br />
<h3>Настройка THidden</h3>
<br />
<form id="formEditSettings" method="post" action="/panel/BaseClass?action=saveComponentSettings&id=%id%&component=THidden">
	Значение по умолчанию: <input type="text" name="value" value="%value%" />
	<input type="hidden" id="parent" value="%parent%" />
	<input type="button" id="saveBTN" value="Сохранить" />
	<input type="button" id="cancelBTN" value="Закрыть" />
</form>