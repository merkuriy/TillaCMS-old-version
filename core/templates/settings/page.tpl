%js%
<div id="DIVcontentAll">

	<div class="DIVheader">
		<h2>%path%</h2>
	</div>

	<h3>Редактирование настроек</h3>
	<br />

	<div id="settings">
		%settings%
	</div>
	
	<form id="createSettings" method="post" action="/panel/settings?action=createSettings"><br />
		<b>Новый параметр:</b><br />
		<div class="edit">
			<div class="name_section">
				Название: 
			</div>
			<div class="link">
				<input class="varchar" type="text" name="name" />
			</div>
		</div>
	
		<div class="edit">
			<div class="name_section">
				Значение: 
			</div>
			<div class="link">
				<input class="varchar" type="text" name="value" />
			</div>
		</div>
	
		<div class="edit">
			<div class="link">
				<input type="button" id="addSettings" value="Создать параметр" />
			</div>
		</div>
	</form>
</div>