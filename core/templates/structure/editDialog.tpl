<script src="/core/templates/structure/editDialog.js" type="text/javascript"></script>
<script type="text/javascript" src="/css_js/tiny_mce/plugins/upload/upload_init.php"></script>

<div class="DIVheader">
	<h2>%title% (%name% - %id%)</h2>
</div>
<div id="smallHeader" class = "smallHeader">
	<span id = "callSmallContent" class="selector"> Общая информация </span>
	<span id = "callChildClass" class="selector"> Контент </span>
	<span id = "callLinkClass" class="selector"><a href="%adres%"> На страницу </a></span>
</div>
<div id="smallContent" class = "smallContent">
	<form id="editElement" enctype="multipart/form-data" method="post" action="/panel/structure?action=editElementSCR&author=admin">

		<!-- Общие настройки элемента структуры -->
		<div id="editMainList" class = "editContent2">
			<div class="component">
				<div class="name_section">Имя: </div>
				<div class="link"><input class="varchar" type="text" name="name" value="%name%" /></div>
			</div>
			<div class="component">
				<div class="name_section">Название: </div>
				<div class="link"><input id="pageTitle" class="varchar" type="text" name="title" value="%title%" /></div>
			</div>
			<div class="component">
				<div class="name_section">Базовый класс: </div>
				<div class="link">%base_class%</div>
			</div>
			<div class="component">
				<div class="name_section">Абсолютный URL: </div>
				<div class="link">%absoluteAdres%</div>
			</div>
			<div class="component">
				<div class="name_section">Относительный URL: </div>
				<div class="link">%adres%</div>
			</div>
			<div class="component">
				<div class="link"><input id="pageid" name="id" type="hidden" value="%id%"><input class="saveBTN" type="button" value="Сохранить" /> <input class="cancelBTN" type="button" value="Отмена" /></div>
			</div>
		</div>
		<!-- Общие настройки элемента структуры -->

		<!-- Редактирование элемента структуры -->
		<div id="editChildClass" class = "editContent2">
			<div>
				<b>Контент:</b><br />
				%content%
			</div>
			<div class="component">
				<div class="link"><input name="id" type="hidden" value="%id%"><input class="saveBTN" type="button" value="Сохранить" /> <input class="cancelBTN" type="button" value="Отмена" /></div>
			</div>
		</div>
		<!-- Редактирование элемента структуры -->

	</form>

</div>