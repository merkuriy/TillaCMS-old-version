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
			$('.editContent').css('height',(winHeight-67));
		};

		var simpleTreeCollection;

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
						data: "module=baseclass&action=editClass&id="+$(node).attr('id'),
						success: function(msg){
							$("#DIVcontent").html(msg);
							$("#DIVloader").hide();
							$("#DIVcontent").show();
							FullScreen();
						}
					});
				},
		  		afterMove:function(destination, source, pos){
				},
				afterAjax:function()
				{
					//alert('Loaded');
				}
			});
			/*************************/
			// Вывод контекстного меню
			$("li>span").contextMenu({menu: 'myMenu'}, function(action, el, pos) {
				// Редактирование элемента
				if (action == 'edit'){
					$("#DIVcontent").hide();
					$("#DIVloader").show();
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=baseclass&author=admin&action=editClass&id="+$(el).parent().attr('id'),
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
					var answer = confirm ("Вы действительно хотите удалить Базовый класс \""+$(el).text()+"\"?\nВНИМАНИЕ: Удаление базового класса приведет к удалению\nвсех элементов структуры основанных на нем!");
					if (answer){
						$.ajax({
							type: "GET",
							url: "../core/admin.php",
							data: "module=baseclass&author=admin&action=deleteClass&id="+$(el).parent().attr('id'),
							success: function(msg){
								alert('Базовый класс был успешно удален!');
								$("#tree").hide();	
								$("#tree_loader").show();
								$.ajax({
									type: "GET",
									url: "../core/admin.php",
									data: "module=baseclass&author=admin&action=buildTree&id="+$("#rootSel").attr("value"),
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
			})
			// Вывод контекстного меню
			/*************************/
		}

		$(document).ready(function(){
			// Подсвечиваем нужный элемент меню
			$("#panelbaseclass").css("background-color","#FFFFFF");
			$("#panelbaseclass").css("color","#000000");
			$("#panelbaseclass").children("a").css("color","#000000");

			onLoad();

			$("#myMenu").html('<li class="edit"><a href="#edit">Редактировать</a></li><li class="delete"><a href="#delete">Удалить</a></li>');

			$("#createClass").click(function(){
				$("#DIVcontent").hide();
				$("#DIVloader").show();
				$.ajax({
					type: "GET",
					url: "../core/admin.php",
					data: "module=baseclass&action=addClass&author=admin",
					success: function(msg){
						$("#DIVcontent").html(msg);
							$("#DIVloader").hide();
							$("#DIVcontent").show();
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