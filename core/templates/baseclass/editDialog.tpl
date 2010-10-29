%js%
<div class="DIVheader">
	<h2>%title% (%name% - %id%)</h2>
</div>

<div class = "smallHeader">
	<span id = "callSmallContent" class="selector"> Общая информация </span>
	<span id = "callChildClass" class="selector"> Дочерние элементы </span>
	<span id = "callAttributesClass" class="selector"> Атрибуты </span>
</div>
<div class = "smallContent">

<!-- Общие настройки Базового Класса -->
<div id="editMainList" class = "editContent">
	<form id="editClass" method="post" action="/panel/baseclass?action=saveClass&author=admin&id=%id%">
		<div>
			<div class="edit">
				<div class="name_section">Имя: </div>
				<div class="link"><input class="varchar" type="text" name="name" value="%name%" /></div>
			</div>
			<div class="edit">
				<div class="name_section">Название: </div>
				<div class="link"><input class="varchar" type="text" name="title" value="%title%" /></div>
			</div>
		</div>
	</form>

	<div class="edit">
		<div class="link"><input id="saveBTN" type="button" value="Сохранить" /> <input id="cancelBTN" type="button" value="Закрыть" /></div>
	</div>
</div>
<!-- Общие настройки Базового Класса -->

<!-- Настройка дочерних элементов -->
<div id="editChildClass" class = "editContent">
	<div>
		<br />
		<b>Дочерние элементы</b>
		<div id="childs">
			%childElement%
		</div>
		<div>
			<form id="formAddChildClass" method="post" action="/panel/baseclass?action=addChildClass&id=%id%">
				<br />
				<b><i>Добавить дочерний элемент:</i></b><br />
				<div class="edit">
					<div class="name_section">Тип: </div>
					<div class="link"><select class="select" name="type">%childClassOption%</select></div>
				</div>
				<div class="edit" align="right"><input type="button" id="addChildClassBTN" value="Добавить" /></div>
			</form>
		</div>
	</div>
</div>
<!-- Настройка дочерних элементов -->

<!-- Настройка атрибутов -->
<div id="editAttributesClass" class = "editContent">
	<div>
		<br />
		<b>Атрибуты</b>
		<div id="attr">
			%attr%
		</div>
		<div>
			<form id="formAddChildAttr" method="post" action="/panel/baseclass?action=addChildAttr&id=%id%">
				<br />
				<b><i>Добавить атрибут:</i></b><br />
				<div class="edit">
					<div class="name_section">Имя: </div>
					<div class="link"><input class="varchar" type="text" name="name" /></div>
				</div>
				<div class="edit">
					<div class="name_section">Название: </div>
					<div class="link"><input class="varchar" type="text" name="title" /></div>
				</div>
				<div class="edit">
					<div class="name_section">Компонент: </div>
					<div class="link"><select class="select" name="component">%childAttrOption%</select></div>
				</div>
				<div class="edit" align="right"><input type="button" id="addChildAttrBTN" value="Добавить" /></div>
			</form>
		</div>
	</div>
</div>
<!-- Настройка атрибутов -->
		
</div>