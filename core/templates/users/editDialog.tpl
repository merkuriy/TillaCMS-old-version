%js%
	<div class="DIVheader">
		<h2>%title% (%name%)</h2>
	</div>
	<form id="editElement" enctype="multipart/form-data" method="post" action="/panel/users?action=editElementSCR%from%&author=admin">
		<div class="editContent2">
			<div class="component">
				<div class="name_section">Имя: </div>
				<div class="link"><input class="varchar" type="text" name="name" value="%name%" /></div>
			</div>
			<div class="component">
				<div class="name_section">Название: </div>
				<div class="link"><input class="varchar" type="text" name="title" value="%title%" /></div>
			</div>
			<div class="component">
				<div class="name_section">Базовый класс: </div>
				<div class="link">%base_class%</div>
			</div>
			<div>
				<b>Контент:</b><br />
				%content%
			</div>
			<div class="component">
				<div class="link">
					<input id="parent" name="id" type="hidden" value="%id%">
					<input id="from" type="hidden" value="%from%">
					<input id="saveBTN" type="button" value="Сохранить" />
					<input id="cancelBTN" type="button" value="Отмена" />
				</div>
			</div>
		</div>
	</form>