	<script type="text/javascript" src="../css_js/jquery/jquery.js"></script>
	<script type="text/javascript" src="../css_js/jquery/jquery.form.js"></script>
	<script type="text/javascript" src="../css_js/jquery/jquery.simple.tree.js"></script>
	<script type="text/javascript" src="../css_js/jquery/jquery.contextMenu.js"></script>
	<script type="text/javascript" src="../css_js/tiny_mce/tiny_mce.js"></script>

	<script type="text/javascript">

		function FullScreen(){ 
			var winHeight  = $(window).height()-74;
			$('#DIVcontent').css('height',winHeight);
			$('#DIVtree').css('height',winHeight);
			$('.editContent').css('height',(winHeight-32));
			$('.editContent2').css('height',(winHeight-32));
		};

		var simpleTreeCollection;

		function onLoadBTN(){
		
			$(".save").click(function (){
				var name =$(this).attr("id");
				$("#savePolicy"+name).ajaxSubmit(function(data){
					$("#DIVcontent").hide();
					$("#DIVloader").show();
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&author=admin&action=startPage",
						success: function(msg){
							$("#DIVcontent").html(msg);
							$("#DIVloader").hide();
							$("#DIVcontent").show();
							onLoadBTN();
						}
					});
				});
			});

			$("#addPolicy").click(function (){
				$("#addPolicyForm").ajaxSubmit(function(data){
					$("#DIVcontent").hide();
					$("#DIVloader").show();
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&author=admin&action=startPage",
						success: function(msg){
							$("#DIVcontent").html(msg);
							$("#DIVloader").hide();
							$("#DIVcontent").show();
							onLoadBTN();
						}
					});
				});
			});
		
			// Редактирование юзера
			$("span.editChildAttr").click(function(){
				$("#DIVcontent").hide();
				$("#DIVloader").show();
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=users&author=admin&action=editElement&id="+$(this).attr("id"),
					success: function(msg){
						$("#DIVcontent").html(msg);
						$("#DIVloader").hide();
						$("#DIVcontent").show();
						FullScreen();
					}
				});
			});


			// Удаление юзера	
			$("span.delChildAttr").click(function(){
				var answer = confirm ("Вы действительно хотите удалить этот элемент?");
				if (answer){
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&author=admin&action=deleteElement&id="+$(this).attr('id'),
						success: function(msg){
							alert(msg);

							$("#DIVcontent").hide();
							$("#DIVloader").show();
							$.ajax({
								type: "GET",
								url: "../core/admin.php",
								data: "module=users&author=admin&action=startPage",
								success: function(msg){
									$("#DIVcontent").html(msg);
									$("#DIVloader").hide();
									$("#DIVcontent").show();
									FullScreen();
								}
							});

							$("#tree").hide();	
							$("#tree_loader").show();

							$.ajax({
								type: "GET",
								url: "../core/admin.php",
								data: "module=users&author=admin&action=buildTree",
								success: function(msg){
									$("#tree_loader").hide();
									$("#tree").html(msg).show();
									onLoad();
								}
							});
						}
					});
				}
			});
		}
		
		// Функция построения дерева
		function onLoad(){
			simpleTreeCollection = $('.simpleTree').simpleTree({
				animate:true,
				autoclose: true,
				drag:false,
				afterDblClick:function(node){
					// реакция на двойной щелчок - открытие на редактирование страницы
					$("#DIVcontent").hide();
					$("#DIVloader").show();
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&action=editElement&id="+$(node).attr('id'),
						success: function(msg){
							$("#DIVcontent").html(msg);
							$("#DIVloader").hide();
							$("#DIVcontent").show();
							FullScreen();
						}
					});
				}
			});
			/*************************/
			// Вывод контекстного меню
			$("li>span").contextMenu({menu: 'myMenu'}, function(action, el, pos) {

				// Добаление элемента
				if (action == 'add'){
					$("#DIVcontent").hide();
					$("#DIVloader").show();
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&author=admin&action=addElement&parent_id="+$(el).parent().attr('id'),
						success: function(msg){
							$("#DIVcontent").html(msg);
							$("#DIVloader").hide();
							$("#DIVcontent").show();
							FullScreen();
						}
					});
				}
				
				// Редактирование элемента
				if (action == 'edit'){
					$("#DIVcontent").hide();
					$("#DIVloader").show();
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=users&author=admin&action=editElement&id="+$(el).parent().attr('id'),
						success: function(msg){
							$("#DIVcontent").html(msg);
							$("#DIVloader").hide();
							$("#DIVcontent").show();
							FullScreen();
						}
					});
				}
				
				// Удаление элемента
				if (action == 'delete'){
					var answer = confirm ("Вы действительно хотите удалить элемент \""+$(el).text()+"\"?");
					if (answer){
						$.ajax({
							type: "GET",
							url: "../core/admin.php",
							data: "module=users&author=admin&action=deleteElement&id="+$(el).parent().attr('id'),
							success: function(msg){
								alert(msg);
								$("#tree").hide();	
								$("#tree_loader").show();
								$.ajax({
									type: "GET",
									url: "../core/admin.php",
									data: "module=users&author=admin&action=buildTree",
									success: function(msg){
										$("#tree_loader").hide();
										$("#tree").html(msg).show();
										onLoad();
									}
								});
							}
						});
					}
				}

				// Вызов блокировки пользователя
				if (action == 'block'){
					var title = prompt("Введите дату окончания блокировки:","0000-00-00 00:00:00");
					if (title>''){
						$.ajax({
							type: "POST",
							url: "../core/admin.php?module=users&author=admin&action=banUser",
							data: "id="+$(el).parent().attr('id')+"&blockDate="+title,
							success: function(msg){
								alert(msg);
								$("#tree").hide();	
								$("#tree_loader").show();
								$.ajax({
									type: "GET",
									url: "../core/admin.php",
									data: "module=users&author=admin&action=buildTree",
									success: function(msg){
										$("#tree_loader").hide();
										$("#tree").html(msg).show();
										onLoad();
									}
								});
							}
						});
					}
/*





					var answer = confirm ("Вы действительно хотите заблокировать пользователя \""+$(el).text()+"\"?");
					if (answer){
						$.ajax({
							type: "GET",
							url: "../core/admin.php",
							data: "module=users&author=admin&action=deleteElement&id="+$(el).parent().attr('id'),
							success: function(msg){
								alert(msg);
								$("#tree").hide();	
								$("#tree_loader").show();
								$.ajax({
									type: "GET",
									url: "../core/admin.php",
									data: "module=users&author=admin&action=buildTree",
									success: function(msg){
										$("#tree_loader").hide();
										$("#tree").html(msg).show();
										onLoad();
									}
								});
							}
						});
					}*/
				}

			})
			// Вывод контекстного меню
			/*************************/
		}

		$(document).ready(function(){
			$("#panelusers").css("background-color","#FFFFFF");
			$("#panelusers").css("color","#000000");
			$("#panelusers").children("a").css("color","#000000");


			$("#myMenu").html('<li class="add"><a href="#add">Добавить</a></li><li class="edit"><a href="#edit">Редактировать</a></li><li class="delete"><a href="#delete">Удалить</a></li><li class="block"><a href="#block">Заблокировать</a></li>');

			onLoad();
			onLoadBTN();

			// Реакция на вызов диалога создания нового корня
			$("#createGroup").click(function(){
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=users&action=addElement&parent_id=0",
					success: function(msg){
						$("#DIVcontent").html(msg);
					}
				});
			});

			$(window).bind("resize", function(){
				FullScreen();
			});
			
			FullScreen();

		});

		// Проверяем браузер, и если это Опера выполняем скрипт
		if(navigator.appName.indexOf("Opera")!=-1){
			// Инициализация скрипта
			(function(){
				// Скрываем контекстное меню, когда нажата кнопка мыши
				addEventListener('mousedown',function(e){
					// Если нажата правая кнопка мыши - меню не закрываем
					if( e && e.button == 2 ){
						cancelMenu(e);
						return false;
					}
				},true);

				var overrideButton;
				function cancelMenu(e){
					if(!overrideButton){
						var doc = e.target.ownerDocument;
						overrideButton = doc.createElement('input');
						overrideButton.type='button';
						(doc.body||doc.documentElement).appendChild(overrideButton);
					}
					overrideButton.style='position:absolute;top:'+(e.clientY-2)+'px;left:'+(e.clientX-2)+'px;width:5px;height:5px;opacity:0.01';
				}
		
			})( true, 1000 );
		}
	</script>