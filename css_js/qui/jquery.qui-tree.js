/**
 * Q UI - набор компонентов для создания пользовательских интерфейсов
 * Компонент - Дерево
 * @author Andrew Yudin (Andrew Judis Pasarian, pasarian@gmail.com)
 * @version 0.2 b
 * @date 20.03.2009
 */
jQuery.tree = function(options){
	var j=jQuery;

	var options = j.extend({
		id:				'tree',
		width:			0,
		height:			0,
		items:			'',
		url:			'',
		dblClick: 		function(node){},
		endDrag:		function(node){},
		click:			function(node){},
		afterLoad: 		function(){},
		addRoot:		function(){},
		exit:			function(){},
		contextMenu:	'',
		root:			0,
		selected:		''
	},options);

	 /*-*******************************************/
	/* Блок функций для работы компонента НАЧАЛО */
		//****************************
		// Функции открытия папки
		var openFolder = function(node){
			// Удаляем класс Folder (закрытая папка)
			node.parent().parent('li').removeClass('folder');
			// Добавляем класс Folder-open (открытая папка)
			node.parent().parent('li').addClass('folder-open');
			// Парсим элементы открываемого элемента для их правильной отрисовки
			parseTree(node.parent().parent('li'));
			// Открываем блок с дочерними элементами
			node.parent().parent('li').children('ul').slideDown(function(){
				// Меняем изображение стрелки
				node.parent().children('.quiArrowTree').css("background-position", "-20px 0px");
				// Меняем изображение папки
				node.parent().children('.quiIconTree').css("background-image", "url(/css_js/resources/tree/icons.gif)");
				node.parent().children('.quiIconTree').css("background-position", "0px -16px");
			});
		};

		// Функция парсинга дерева для определения типа иконок и стрелок
		var parseTree = function(elem){
			// Обходим все дочерние элементы указанного (elem) узла
			elem.children('ul').children('li').each(function(i){
				var t=j(this);
				// Если узел имеет класс "Файл"
				if (t.hasClass('file')){
					t.children('.quiTreeNode').children('.quiArrowTree').css("background-position","40px 0px");
					t.children('.quiTreeNode').children('.quiIconTree').css("background-position","0px -32px");
				// Если узел имеет класс "Открытая папка"
				}else if (t.hasClass('folder-open')){
					t.children('.quiTreeNode').children('.quiArrowTree').css("background-position","-20px 0px");
					t.children('.quiTreeNode').children('.quiIconTree').css("background-position","0px -16px");
					parseTree(t);
				// Если узел имеет класс "Папка"
				}else{
					t.children('.quiTreeNode').children('.quiArrowTree').css("background-position","-4px 0px");
					t.children('.quiTreeNode').children('.quiIconTree').css("background-position","0px 0px");
					t.children('ul').hide();
				}
			});
			options.afterLoad();
		};

		// Определить наличие дочерних элементов
		var treeGetChild = function(elem){
			var counter = 0;
			elem.children('ul').children('li').each(function(i){
				counter += 1;
			});
			if (counter < 4){
				elem.removeClass('folder-open');
				elem.addClass('file');
				elem.children('ul').remove();
				elem.children('.quiTreeNode').children('.quiArrowTree').css("background-position","40px 0px");
				elem.children('.quiTreeNode').children('.quiIconTree').css("background-position","0px -32px");
			}
		};

		// Установка нового класса
		var treeSetClass = function(elem,clas){
			elem.children('ul').children('li').each(function(i){
				j(this).addClass(clas+'Child');
			});
		};

		// Удаление класса
		var treeDelClass = function(elem,clas){
			elem.children('ul').children('li').each(function(i){
				j(this).removeClass(clas+'Child');
			});
		};

		// Функция выделения узла дерева
		var selectNode = function(node){
			// Запоминаем выделенный элемент
			options.selected = node.parent().parent().parent('li');
			// Вызываем действие Click описанное при инициализации компонента
			options.click(node.parent().parent().parent('li'));
			// Убираем выделение активности у всех элементов
			j('span').removeClass('active');
			// Выставляем выделение активности на нажатый элемент
			node.addClass('active');
		};

		// Функция парсинга элементов дерева
		var parseItems = function(items){
			var outPut = '';
			j.each(items, function(i,item){
				var child = '';
				if (item.items == 'ajax'){
					child = '<ul class="ajax" url="'+item.url+'"></ul>';
					clasT = 'folder';
				}else if(item.items != undefined){
					child = '<ul>'+parseItems(item.items)+'<li class="quiLineTree"></li></ul>';
					clasT = 'folder';
				}else{
					clasT = 'file';
					child = '';
				}
				outPut +=  '<li class="quiLineTree"></li>';
				outPut += '<li id="'+options.id+'Item'+item.id+'" class="'+clasT+'">';
				outPut += '<div class="quiTreeNode"><div class="quiArrowTree"></div><div class="quiIconTree"><span class="quiLabelTree">'+item.label+'</span></div></div>';
				outPut += child;
				outPut += '</li>';
			});
			outPut += '<li class="quiLineTree"></li>';
			return outPut;
		};
	 /* Блок функций для работы компонента КОНЕЦ */
	/*-******************************************/

	// Функция отрисовки дерева
	this.draw = function(elem){
		// Отрисовываем дерево
		j(elem).append('<div id="'+options.id+'Container"><div class="quiTreeHead"><div id="'+options.id+'RootLabel" class="quiTreeRL"><div class="quiTreenodeName">Корень</div><div class="quiTreeBTN"><div class="quiTreeExitF"></div><div class="quiTreeAddN"></div></div></div></div><div id="'+options.id+'" class="quiTree"></div></div>');
		if (options.contextMenu!=''){
			cm = '';
			j.each(options.contextMenu, function(i,item){
				cm += '<li class="'+item.clas+'"><span>'+item.name+'</span></li>';
				j('.'+item.clas).live('click',function(){
					j('#'+options.id+'ContextMenu').hide();
					item.action();
				}).live('mouseover',function(){
					j(this).addClass('hover');
				}).live('mouseout',function(){
					j(this).removeClass('hover');					
				});
			});
			j('body').append('<ul class="quiTreeCM" id="'+options.id+'ContextMenu">'+cm+'</ul>');
		};
		// Внутренние настройки
		var dragged = false;
		var dragItem = '';
		var dragItemP = '';
		var targetDrag = '';
		var startDrag = false;
		var status = '';
		var contextMenu = false;

	 /*-******************************/
	/* Блок описания реакций НАЧАЛО */
	
		// Наведение на стрелку
		j('.quiArrowTree')
		
		.live("mouseover",function(){
			var t=j(this);
			if(t.parent().parent('li').hasClass('folder')){
				t.css("background-position", "-36px 0px");
			} else if(t.parent().parent('li').hasClass('folder-open')){
				t.css("background-position", "-52px 0px");
			}
		})
		// Отведение мишы от стрелки
		.live("mouseout",function(){
			var t=j(this);
			if(t.parent().parent('li').hasClass('folder')){
				t.css("background-position", "-4px 0px");
			}else if(t.parent().parent('li').hasClass('folder-open')){
				t.css("background-position", "-20px 0px");						
			}
		})
		// Нажатие на стрелку
		.live("click",function(){
			var t=j(this);
			var tp=t.parent();
			// Если объект открытая папка, то закрываем её
			if(tp.parent('li').hasClass('folder-open')){
				tp.parent('li').removeClass('folder-open');
				tp.parent('li').addClass('folder');
				tp.parent('li').children('ul').slideUp();
				t.css("background-position", "-36px 0px");
				tp.children('.quiIconTree').css("background-position","0px 0px");
			// Если объект закрытая папка, то откраваем её
			}else if(tp.parent('li').hasClass('folder')){
				tp.children('.quiIconTree').css("background-position", "0px 0px");
				tp.children('.quiIconTree').css("background-image", "url(/css_js/resources/tree/ajax-loader.gif)");
				// Если дочерние элементы получаются через AJAX запускаем механизм получения
				if (tp.parent('li').children('ul').hasClass('ajax')) {
					j.getJSON(tp.parent('li').children('ul').attr('url'),
						function(JSON){
							// Парсим полученный JSON и подключаем полученный код к открываемому элементу
							tp.parent('li').children('ul').html('');
							tp.parent('li').children('ul').append(parseItems(JSON));
							// Удаляем метку AJAX указывающую на источник получения дочерних элементов
							tp.parent('li').children('ul').removeClass('ajax');
							// Вызываем функцию открытия папки
							openFolder(t);
						}
					);
				// Если элементы загружены изначально или получены через AJAX ранее
				}else {
					// Вызываем функцию открытия папки
					openFolder(t);
				}
			};
		});

		// Реакция на двойной клик по элементу дерева
		j('.quiIconTree').live("dblclick",function(){
			// Вызываем действие указанное при инициализации компонента
			options.dblClick(j(this).parent().parent('li'));
			selectNode(j(this).children('.quiLabelTree'));
		})
		// Реакция на наведение на имя узла
		.live("mouseover",function(){
			// Указываем переменную быстрого вызова
			node = j(this).children('.quiLabelTree');
			nodep = node.parent().parent();
			// Добавляем выделение на выделенный элемент
			node.addClass('hover');
			// Если в данный момент происходит перетаскивание
			if (dragged){
				// Если родительский элемент не помечен классом "Неактивен", продолжаем
				if(!nodep.parent('li').hasClass('quiDisabled')) {
					// Если родительский элемент не помечен классом "Неактивный дочерний", продолжаем
					if(!nodep.parent('li').hasClass('quiDisabledChild')) {
						// Сохраняем статус, равный тексту в элементе
						status = node.text();
						// Запоминаем целевой элемент, в который будет перемещен перетаскиваемый элемент
						targetDrag = nodep.parent('li');
						// Если целевой элемент имеет класс "Папка"
						if(nodep.parent('li').hasClass('folder')) {
							// Запускаем таймер на 300 мс
							j(node).oneTime(300, 'openFolder', function(){
								nd = j(this);
								ndp= j(this).parent().parent();
								// Если дочерние элементы целевого элемента необходимо получать через AJAX
								if (ndp.parent('li').children('ul').hasClass('ajax')) {
									// Выставляем иконку загрузки
									nd.parent().css("background-position", "0px 0px");
									nd.parent().css("background-image", "url(/css_js/resources/tree/ajax-loader.gif)");
									// Отправляем запрос на сервер
									j.getJSON(ndp.parent('li').children('ul').attr('url'),
										// Обрабатываем полученные данные
										function(json){
											ndp.parent('li').children('ul').append(parseItems(json));
											ndp.parent('li').children('ul').removeClass('ajax');
											// Открываем папку
											openFolder(nd.parent());
										}
									);
								// Если дочерние элементы уже загружены
								}else {
									// Открываем папку
									openFolder(nd.parent())
								}
							});
						}
					}
				}
			}
		})
		// Отведение мыши от имени узла
		.live("mouseout",function(){
			// Удаляем выделение вокруг имени узла
			j(this).children('.quiLabelTree').removeClass('hover');
			// Если в данный момент активно перетаскивание
			if(dragged){
				// Обнуляем статус
				status = '';
				// Обнуляем целевой элемент
				targetDrag = '';
				// Если узел имеет статус "Папка"
				if(j(this).parent().parent('li').hasClass('folder')) {
					// Останавливаем таймер открытия Открытия папки
					j(this).children('.quiLabelTree').stopTime('openFolder');
				};
			}
		})
		// Нажатие на имя узла
		.live("click",function(){
			selectNode(j(this).children('.quiLabelTree'));
		})
		// Старт перетаскивания
		.live("mousedown",function(e){
			selectNode(j(this).children('.quiLabelTree'));
			// Если нажата не правая кнопка мыши
			if (e.button != '2') {
				// Опеределяем таскаемый элемент
				dragItem = j(this).children('.quiLabelTree');
				dragItemP = j(this).parent();
				// После 300 милесекунд начинаем перетаскивание
				j(document).oneTime(300, 'startDrag', function(){
					// Определяем класс перетаскиваемого элемента
					id = dragItemP.parent('li').attr('id');
					clas = dragItemP.parent('li').attr('class');
					// Затеняем перетаскиваемый элемент
					dragItemP.parent('li').addClass('quiDisabled');
					treeSetClass(dragItemP.parent('li'), 'quiDisabled');
					dragItemP.parent('li').next('.quiLineTree').addClass('quiDisabled');
					dragItemP.parent('li').prev('.quiLineTree').addClass('quiDisabled');
					// Если класс Открытая папка - ставим закрытая папка
					if (clas == 'folder-open') {
						clas = "folder"
					}
					// Добавляем таскаемый аналог перетаскиваемого элемента
					j('body').append('<div id="quiDraggedTree" class="quiDraggedTree"><ul><li class="' + clas + '">' + dragItemP.parent('li').html() + '</li></ul></div>');
					// Убираем из него все дочерние элементы
					j('#quiDraggedTree').children('ul').children('li').children('ul').remove();
					// Подводим его под мышку
					j('#quiDraggedTree').css("top", e.pageY + 20);
					j('#quiDraggedTree').css("left", e.pageX + 20);
					dragged = true;
				});
			// Если нажата правая кнопка мыши
			}/*else{
				
				
				// Отвязываем ранее созданное событие
				j('.quiIconTree').unbind('mouseup');
				// Отлавливаем отпускание клавиши мыши
				j('.quiIconTree').mouseup(function(e){
					// Если была нажата правая кнопка мыши и задано контекстное меню
					if (e.button == '2' && options.contextMenu != '') {
						contextMenu = false;
						
						//alert( $(this).html() );
						
						
						
						// Отменяем вызов стандартного контекстного меню
						j(this).add('UL.contextMenu');//.bind('contextmenu', function(){return false;});
						
						
						
						cm = j('#'+options.id+'ContextMenu');
						cm.css('top',e.pageY);
						cm.css('left',e.pageX);
						cm.show();
						selectNode(j(this).children('.quiLabelTree'));
						j(document).oneTime(30, 'contextMenu', function(){
							contextMenu=true;
						});
					};
				});
				
				
			}*/
		})
		// Вызов контекстного меню
		.live('contextmenu',function(e){
			
			j(this).add('UL.contextMenu');
			
			cm = j('#'+options.id+'ContextMenu');
			cm.css('top',e.pageY);
			cm.css('left',e.pageX);
			cm.show();
			selectNode(j(this).children('.quiLabelTree'));
			
			$(document).one('click',function(){
				cm.hide();
			});
			
			return false;
		});
		
		
		
		// Реализация Перетаскивания элемента
		j('#'+options.id).mousemove(function(e){
			if (dragged){
				j('#quiDraggedTree').css("top",e.pageY+20);
				j('#quiDraggedTree').css("left",e.pageX+20);
			}
		});

		// Реакция на наведение мыши на Линию разделителя
		j('.quiLineTree').live('mouseover',function(){
			// Определяем переменную быстрого доступа
			line = j(this);
			// Если активно перетаскивание
			if(dragged) {
				// Если линия не имеет метки "Неактивен"
				if(!line.hasClass('quiDisabled')) {
					// Если линия не имеет метки "Неактивный дочерний"
					if(!line.hasClass('quiDisabledChild')) {
						// Указываем статус
						status = 'ReplaceLine';
						// Указываем целевой элемент
						targetDrag = line;
						// Подсвечиваем линию
						line.addClass('quiLineTreehover');
					}
				}
			}
		})
		// Реакция на отведение мыши от Линии Разделителя
		.live('mouseout',function(){
			// Убираем подсветку с линии
			j(this).removeClass('quiLineTreehover');
			// Очищаем статус
			status = '';
		});

		j(document).mouseup(function(){
			if (contextMenu) {
				j('#' + options.id + 'ContextMenu').hide();
				contextMenu = false;
			}
		})
		// Конец перетаскивания
		.mouseup(function(){
			// Останавливаем таймер "Перетаскивание"
			j(document).stopTime('startDrag');
			// Если перетаскивание уже было начато
			if(dragged) {
				// Убираем классы отмечающие "неактивность" перетаскиваемого элемента
				dragItemP.parent('li').next('.quiLineTree').removeClass('quiDisabled');
				dragItemP.parent('li').prev('.quiLineTree').removeClass('quiDisabled');

				// Удаляем таскаемый клон
				j('#quiDraggedTree').remove();
				// Убираем прозрачность у перетаскиваемого элемента
				dragItemP.parent('li').removeClass('quiDisabled');
				treeDelClass(dragItemP.parent('li'),'quiDisabled');
				// Указываем на окончание перетаскивания
				dragged = false;
				// Если перетаскивание закончилось на элементе дерева, то производим перемещение
				// В противном случае ничего не делаем
				if (status != '') {
					// Проверяем элемент, который содержал в себе перетаскиваемый узел
					// Если он имел класс открытая папка
					if (dragItemP.parent('li').parent('ul').parent('li').hasClass('folder-open')){
						// проверяем наличие других дочерних узлов
						treeGetChild(dragItemP.parent('li').parent('ul').parent('li'));
					}
					// Удаляем разделитель следующий за перетаскиваемым элементом
					dragItemP.parent('li').next('.quiLineTree').remove();
					// Скрываем перетаскиваемый элемент
					dragItemP.parent('li').slideUp('fast',function(){
						// Удаляем перетаскиваемый элемент
						dragItemP.parent('li').remove();
						// Если целевой узел имел класс "Файл"
						if (targetDrag.hasClass('file')){
							// Записываем новый элемент
							targetDrag.append('<ul><li class="quiLineTree"></li><li id="'+id+'" class="'+clas+'" style="display:none;">'+dragItemP.parent('li').html()+'</li><li class="quiLineTree"></li></ul>');
							// Делаем его открытой папкой
							targetDrag.removeClass('file');
							targetDrag.addClass('folder-open');
							targetDrag.children('.quiTreeNode').children('.quiArrowTree').css("background-position","-20px 0px");
							targetDrag.children('.quiTreeNode').children('.quiIconTree').css("background-position","0px -16px");
						// Если целевой узел имел класс папка
						}else if (targetDrag.hasClass('folder')){
							// Делаем его открытой папкой
							targetDrag.removeClass('folder');
							targetDrag.addClass('folder-open');
							targetDrag.children('.quiTreeNode').children('.quiArrowTree').css("background-position","-20px 0px");
							targetDrag.children('.quiTreeNode').children('.quiIconTree').css("background-position","0px -16px");
							// Записываем новый элемент
							targetDrag.children('ul').append('<li id="'+id+'" class="'+clas+'" style="display:none;">'+dragItemP.parent('li').html()+'</li><li class="quiLineTree"></li>');
							// Открываем папку
							targetDrag.children('ul').slideDown();
						// Если целевой узел открытая папка
						} else if (targetDrag.hasClass('folder-open')){
							// Записываем новый элемент
							targetDrag.children('ul').append('<li id="'+id+'" class="'+clas+'" style="display:none;">'+dragItemP.parent('li').html()+'</li><li class="quiLineTree"></li>');
						// Если целевой узел - разделитель
						} else if (targetDrag.hasClass('quiLineTree')){
							// Записываем новый элемент
							targetDrag.replaceWith('<li class="quiLineTree"></li><li id="'+id+'" class="'+clas+'" style="display:none;">'+dragItemP.parent('li').html()+'</li><li class="quiLineTree"></li>');
						}
						j('#'+id).slideDown('fast');
						options.endDrag(j('#'+id));
						parseTree(targetDrag);
					});
				} else {
					status = '';
				}
			}
		});

		j('.quiTreeExitF').live('click',function(){
			options.exit();
		});

		j('.quiTreeAddN').live('click',function(){
			options.addRoot();
		});
		// Запрет выделения текста
		j('#'+options.id).bind('selectstart', function(){
			return false;
		});
	 /* Блок описания реакций КОНЕЦ */
	/*-*****************************/


	 /*-************************************/
	/* Блок описания внешнего вида НАЧАЛО */

		if (options.width>0){
			j('#'+options.id).css('width',options.width);
		}else{
			var width = j(elem).width()-30;
			j('#'+options.id).css('width',width);
			j('#'+options.id+'RootLabel').css('width',width+19);
			j('#'+options.id+'RootLabel').children('.quiTreenodeName').css('width',width-30);
		};

		if (options.height>0){
			j('#'+options.id).css('height',options.height);
		}else{
			var height = j(elem).height()-21;
			j('#'+options.id).css('height',height);
		};

	 /* Блок описания внешнего вида КОНЕЦ */
	/*-***********************************/
		// Грузим элементы дерева
		this.loadContent();
	};

	// Функция загрузки элементов дерева!
	this.loadContent = function(){
		// Обозначаем контент
		var content = '<ul>';
		var loaded = false;
		// Определяем источник контента и запускаем парсинг
		if (options.items != '') {
			var items = options.items;
			content += parseItems(items);
			//			content += '<li class="quiLineTree"></li></ul>';
			j('#' + options.id).append(content);
			parseTree(j('#' + options.id));
		}
		else {
			j.getJSON(options.url, function(json){
				var items = json;
				content += parseItems(items);
				j('#' + options.id).append(content);
				parseTree(j('#' + options.id));
			});
		}
	};

	// Функция определения позиции элемента
	this.getNodePosition = function(){
		node=this.getSelected();
		var id=node.attr('id');
		var counter=0;
		var position=0;
		j('#'+id).parent('ul').children('li').each(function(){
			if (!j(this).hasClass('quiLineTree')){
				counter += 1;
				if (id == $(this).attr('id')){
					position = counter;
				}
			};
		});
		return position;
	};

	// Функция определения родителя элемента
	this.getNodeParent = function(){
		node = this.getSelected();
		id = node.attr('id');
		parentNode = j('#'+id).parent('ul').parent('li').attr('id');
		if (parentNode != undefined){
			return parentNode;
		}else{
			return 'root';
		}
	};

	// Функция добавления узла дерева
	this.addNode = function(node,id,label){
		if (node != 'root') {
			if (node.hasClass('file')) {
				node.append('<ul><li class="quiLineTree"></li><li id="' + options.id + 'Item' + id + '" class="file"><div class="quiTreeNode"><div class="quiArrowTree"></div><div class="quiIconTree"><span class="quiLabelTree">' + label + '</span></div></div></li><li class="quiLineTree"></li></ul>');
				node.children('.quiTreeNode').children('.quiArrowTree').css("background-position", "-20px 0px");
				node.children('.quiTreeNode').children('.quiIconTree').css("background-position", "0px -16px");
				node.removeClass('file');
				node.addClass('folder-open');
			}
			else {
				node.children('ul').append('<li id="' + options.id + 'Item' + id + '" class="file"><div class="quiTreeNode"><div class="quiArrowTree"></div><div class="quiIconTree"><span class="quiLabelTree">' + label + '</span></div></div></li><li class="quiLineTree"></li>');
			}
			parseTree(node);
		}else{
			j('#'+options.id).children('ul').append('<li id="' + options.id + 'Item' + id + '" class="file"><div class="quiTreeNode"><div class="quiArrowTree"></div><div class="quiIconTree"><span class="quiLabelTree">' + label + '</span></div></div></li><li class="quiLineTree"></li>');			
			parseTree(j('#'+options.id));
		}
	};

	// Функция удаления узла дерева
	this.delNode = function(node){
		treeGetChild(node.parent('ul').parent('li'));
		node.next('.quiLineTree').remove();
		node.remove();
	};

	// Функция обновления названия узла дерева
	this.updateNode = function(id,label){
		j('#'+options.id+'Item'+id).children('.quiTreeNode').children('.quiIconTree').children('.quiLabelTree').text(label);
	};

	// Функция определения выделенного элемента дерева
	this.getSelected = function(){
		return options.selected;
	};

	this.setNewRoot = function(url,id,name){
		j('#'+options.id+'RootLabel').children('.quiTreenodeName').html(name);
		options.root = id;
		options.url = url;
		j('#'+options.id).html('');
		this.loadContent();
	};

	this.getRoot = function(){
		return options.root;
	}

};