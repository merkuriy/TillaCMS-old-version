%js%
<h2>Базовые Классы</h2>
<br/>
<h3>Настройка атрибута TText</h3>
<br/>
<form id="formEditSettings" method="post" action="/panel/baseclass?action=saveComponentSettings&id=%id%&component=TText">
	<input type="hidden" id="parent" value="%parent%" />
	
	Тип компонента:
	<select name="type">
		<option value="0">WYSIWYG редактор текста</option>
		<option value="1" %type%>Простой редактор текста</option>
	</select>
	<br/>
	<br/>
	<input type="button" id="saveBTN" value="Сохранить" />
	<input type="button" id="cancelBTN" value="Закрыть" />
</form>