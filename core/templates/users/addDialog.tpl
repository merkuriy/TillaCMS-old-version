%js%
<h3>Добавление нового пользователя</h3>
<form id="addElement" method="post" action="/panel/pBanner?action=addElementSCR&author=admin">
	<div>
		<div class="edit">
			<div class="name_section">Имя: </div>
			<div class="link"><input class="varchar" type="text" name="name" value="%name%" /></div>
		</div>
		<div class="edit">
			<div class="name_section">Название: </div>
			<div class="link"><input class="varchar" type="text" name="title" value="%title%" /></div>
		</div>
		<div class="edit">
			<div class="name_section">Родительский объект: </div>
			<div class="link"><input class="varchar" type="text" id="parent" name="parent" value="%parent%" /></div>
		</div>
		<div class="edit">
			<div class="name_section">Базовый класс: </div>
			<div class="link"><select class="select" name="type">%option%</select></div>
		</div>
		<div class="edit">
			<div class="link"><input id="createBTN" type="button" value="Создать" /> <input id="cancelBTN" type="button" value="Отмена" /></div>
		</div>
	</div>
</form>