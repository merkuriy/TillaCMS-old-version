%js%
<h2>Базовые Классы</h2>
<br />
<h3>Настройка атрибута THidden</h3>
<br />
<form id="formEditSettings" method="post" action="/panel/baseclass?action=saveComponentSettings&id=%id%&component=THidden">
	<input type="hidden" id="parent" value="%parent%" />
	
	Значение по умолчанию:
	<input type="text" name="value" value="%value%" />
	<br/>
	<br/>
	<input type="button" id="saveBTN" value="Сохранить" />
	<input type="button" id="cancelBTN" value="Закрыть" />
</form>