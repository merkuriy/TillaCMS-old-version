<script>
	$(document).ready(function(){
		// Предварительная загрузка
		$("#editMainList").show();
		$("#editChildClass").hide();
		$("#editAttributesClass").hide();
		// Предварительная загрузка

		$("#callSmallContent").css("background-color","#FFFFFF");
		$("#callSmallContent").css("color","#000000");

		$("#cancelBTN").click(function(){
			$("#DIVcontent").html('<div class="DIVheader"><h2>Базовые классы</h2></div>');
		});

		// Переход по вкладкам
		$("#callSmallContent").click(function(){

			$("#callSmallContent").css("background-color","#FFFFFF");
			$("#callSmallContent").css("color","#000000");
			$("#callChildClass").css("background-color","#4A99D5");
			$("#callChildClass").css("color","#FFFFFF");
			$("#callAttributesClass").css("background-color","#4A99D5");
			$("#callAttributesClass").css("color","#FFFFFF");

			$("#editMainList").show();
			$("#editChildClass").hide();
			$("#editAttributesClass").hide();

		});

		$("#callChildClass").click(function(){

			$("#callSmallContent").css("background-color","#4A99D5");
			$("#callSmallContent").css("color","#FFFFFF");
			$("#callChildClass").css("background-color","#FFFFFF");
			$("#callChildClass").css("color","#000000");
			$("#callAttributesClass").css("background-color","#4A99D5");
			$("#callAttributesClass").css("color","#FFFFFF");

			$("#editMainList").hide();
			$("#editChildClass").show();
			$("#editAttributesClass").hide();
		});

		$("#callAttributesClass").click(function(){

			$("#callSmallContent").css("background-color","#4A99D5");
			$("#callSmallContent").css("color","#FFFFFF");
			$("#callChildClass").css("background-color","#4A99D5");
			$("#callChildClass").css("color","#FFFFFF");
			$("#callAttributesClass").css("background-color","#FFFFFF");
			$("#callAttributesClass").css("color","#000000");

			$("#editMainList").hide();
			$("#editChildClass").hide();
			$("#editAttributesClass").show();
		});
		
		// Вызов сохранения базового класса
		$("#saveBTN").click(function(){
			$("#DIVcontent").hide();
			$("#DIVloader").show();
			$("#editClass").ajaxSubmit(function(data) {
				$("#DIVloader").hide();
				$("#DIVcontent").show();
				alert(data);
				$("#tree").hide();	
				$("#tree_loader").show();
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=baseclass&author=admin&action=buildTree",
					success: function(msg){
						$("#tree_loader").hide();
						$("#tree").html(msg).show();
						onLoad();
					}
				});
			});
		});

		// Вызов сохранения базового класса
		$("#addChildClassBTN").click(function(){
			$("#formAddChildClass").ajaxSubmit(function(data) {
				$("#childs").html(data);
				delChildClassLoad();
			});
		});


		// Вызов сохранения базового класса
		$("#addChildAttrBTN").click(function(){
			$("#formAddChildAttr").ajaxSubmit(function(data) {
				$("#attr").html(data);
				OnLoadEditDialog();
				delChildAttrLoad();
				editAttr();
			});
		});

		function delChildClassLoad(){
			// Удаление дочернего класса
			$("span.delChildClass").click(function(){
				var answer = confirm ("Вы действительно хотите удалить этот элемент?");
				if (answer){
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=baseclass&author=admin&action=delChildClass&id="+$(this).attr("id"),
						success: function(msg){
							$("#childs").html(msg);
							delChildClassLoad();
						}
					});
				}
			});
		}

		function delChildAttrLoad(){
			// Удаление дочернего атрибута
			$("span.delChildAttr").click(function(){
				var answer = confirm ("Вы действительно хотите удалить этот атрибут?");
				if (answer){
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=baseclass&author=admin&action=delChildAttr&id="+$(this).attr("id"),
						success: function(msg){
							$("#attr").html(msg);
							delChildAttrLoad();
							OnLoadEditDialog();
							editAttr();
						}
					});
				}
			});
		}

		function editAttr(){
			$("span.editChildAttr").click(function(){
				var title = prompt("Введите новое название атрибута:","");
				if (title>''){
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=baseclass&author=admin&action=renameChildAttr&id="+$(this).attr("id")+"&newTitle="+title,
						success: function(msg){
							$("#attr").html(msg);
							delChildAttrLoad();
							OnLoadEditDialog();
							editAttr();
						}
					});
				}
//				editAttr();
			});
		}

		function OnLoadEditDialog(){
			// Редактирование настроек
			$("span.settingsClass").click(function(){
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=baseclass&author=admin&action=editComponentSettings&id="+$(this).attr("id"),
					success: function(msg){
						$("#DIVcontent").html(msg);
					}
				});
			});
		}

		OnLoadEditDialog();
		delChildClassLoad();
		delChildAttrLoad();
		editAttr();
		
	});
</script>