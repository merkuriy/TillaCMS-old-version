%js%
<h2>Базовые Классы</h2>
<br />
<h3>Настройка TSelect</h3>
<br />
%value%
<form id="formEditSettings" method="post" action="/panel/baseclass?action=saveComponentSettings&id=%id%&component=TSelect">
	Добавить значение: <input type="text" name="title" /> <input type="text" name="name" />
	<input type="hidden" id="parent" value="%parent%" />
	<input type="hidden" id="id" value="%id%" />
	<input type="button" id="saveBTN" value="Сохранить" />
	<input type="button" id="cancelBTN" value="Закрыть" />
</form>