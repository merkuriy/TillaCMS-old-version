%js%
<div class="DIVheader">
	<h2>Создание нового класса</h2>
</div>
<form id="addClass" method="post" action="/panel/baseclass?action=addClassSCR&author=admin">
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
			<div class="link"><input id="createBTN" type="button" value="Создать" /> <input id="cancelBTN" type="button" value="Отмена" /></div>
		</div>
	</div>
</form>