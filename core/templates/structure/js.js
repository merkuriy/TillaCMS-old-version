	<script type="text/javascript" src="/css_js/jquery/jquery.js"></script>
	<script type="text/javascript" src="/css_js/qui/jquery.qui-tree.js"></script>
	<script type="text/javascript" src="/css_js/jquery/jquery.timers.js"></script>
	<script type="text/javascript" src="/css_js/jquery/jquery.form.js"></script>
	<script type="text/javascript" src="/css_js/jquery/jquery.copy.min.js"></script>
	
	
	<script type="text/javascript" src="/css_js/plupload/gears_init.js"></script>
	<script type="text/javascript" src="http://bp.yahooapis.com/2.4.21/browserplus-min.js"></script>
	<script type="text/javascript" src="/css_js/plupload/plupload.js"></script>
	<script type="text/javascript" src="/css_js/plupload/plupload.gears.js"></script>
	<script type="text/javascript" src="/css_js/plupload/plupload.silverlight.js"></script>
	<script type="text/javascript" src="/css_js/plupload/plupload.flash.js"></script>
	<script type="text/javascript" src="/css_js/plupload/plupload.browserplus.js"></script>
	<script type="text/javascript" src="/css_js/plupload/plupload.html5.js"></script>
	<script type="text/javascript" src="/css_js/plupload/jquery.plupload.queue.js"></script>

	<script type="text/javascript" src="/css_js/plupload/plupload.full.js"></script>
	<script type="text/javascript" src="/css_js/plupload/jquery.plupload.queue.js"></script>
	
	<script type="text/javascript" src="/css_js/plupload/plupload.translate.js"></script>

	
	<script type="text/javascript" src="/css_js/tiny_mce/jquery.tinymce.js"></script>

	<script type="text/javascript">
		
		//activeId = 0;
		function notify(message){
			$('#CMS_notify').html(message);
			$('#CMS_notify').slideDown(function(){
				$(document).oneTime(2000,'CMS_notify', function() {
					$('#CMS_notify').slideUp();
				});
			});
		};

		function FullScreen(){ 
			var winHeight  = $(window).height()-75;
			$('#DIVcontent').css('height',winHeight);
			$('#DIVtree').css('height',winHeight);
			$('#derevo').css('height',winHeight-68);
			$('.editContent2').css('height',(winHeight-67));
		};
		
		
		function showEditSectionPage(){
			// реакция на двойной щелчок - открытие на редактирование страницы
			$.multiUp = false;
			
			/*
			$('.mceEditor').each(function(){
				tinyMCE.execCommand('mceRemoveControl', false, this.id);
			});
			*/
			
			$("#DIVcontent").hide();
			$("#DIVloader").show();
			$.ajax({
				type: "GET",
				url: "../core/admin.php",
				data: "module=structure&action=editElement&id=" + derevo.getSelected().attr('id').replace('derevoItem',''),
				success: function(msg){
					$("#DIVcontent").html(msg);
					$("#DIVloader").hide();
					$("#DIVcontent").show();
					FullScreen();
				}
			});
		}
		
	
		$.movieName = 0;
		
		$(document).ready(function(){

			$('#tree').html('');

			derevo = new $.tree({
				id:			'derevo',
				stype:		'tree',
				height:		500,
				addRoot: 	function(){
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=structure&action=addElement&parent_id="+derevo.getRoot()+"&parentHide=root",
						success: function(msg){
							$("#DIVcontent").html(msg);
						}
					});
				},
				exit:		function(){
					$.getJSON("../core/admin.php?module=structure&action=getParent&id="+derevo.getRoot(),
						function(json){
							derevo.setNewRoot('?module=structure&action=findChild&id='+json[0].id+'&author=admin',json[0].id,json[0].label);
						}
					);
				},
				dblClick:	showEditSectionPage,
				endDrag: 	function(node){
					idNode = node.attr('id').replace('derevoItem','');
					newPosition = derevo.getNodePosition()-1;
					newParent = derevo.getNodeParent().replace('derevoItem','');
					if (newParent == 'root'){
						newParent = derevo.getRoot();
					}
					$.ajax({
						type: "GET",
						url: "../core/admin.php",
						data: "module=structure&action=updatePosition&id="+idNode+"&parent="+newParent+"&pos="+newPosition,
						success: function(msg){
						}
					});
				},
				click:		function(node){},
				afterLoad:	function(){},
				contextMenu:
					[{
						clas:	'addCM',
						name:	'Добавить',
						action:	function(){
							$("#DIVcontent").hide();
							$("#DIVloader").show();
							$.ajax({
								type: "GET",
								url: "../core/admin.php",
								data: "module=structure&author=admin&action=addElement&parent_id="+derevo.getSelected().attr('id').replace('derevoItem',''),
								success: function(msg){
									$("#DIVcontent").html(msg);
									$("#DIVloader").hide();
									$("#DIVcontent").show();
									FullScreen();
								}
							});
						}
					},{
						clas:	'editCM',
						name:	'Редактировать',
						action:	showEditSectionPage
					},{
						clas:	'deleteCM',
						name:	'Удалить',
						action:	function(){
							var answer = confirm ("Вы действительно хотите удалить элемент \""+derevo.getSelected().children('.treeNode').text()+"\"?");
							if (answer){
								$.ajax({
									type: "GET",
									url: "../core/admin.php",
									data: "module=structure&author=admin&action=deleteElement&id="+derevo.getSelected().attr('id').replace('derevoItem',''),
									success: function(msg){
										notify(msg);
										derevo.delNode(derevo.getSelected());
									}
								});
							}
						}
					},{
						clas:	'openCM',
						name:	'Как корень',
						action:	function(){
							derevo.setNewRoot('?module=structure&action=findChild&id='+derevo.getSelected().attr('id').replace('derevoItem','')+'&author=admin',derevo.getSelected().attr('id').replace('derevoItem',''),derevo.getSelected().children('.quiTreeNode').text());
						}
					}],
				url:	'?module=structure&action=findChild&id=0&author=admin'
			});

			derevo.draw('#tree');
			// Подсвечиваем нужный элемент меню
			$("#panelstructure").css("background-color","#FFFFFF");
			$("#panelstructure").css("color","#000000");
			$("#panelstructure").children("a").css("color","#000000");

			$(window).bind("resize", function(){
				FullScreen();
			});
			
			FullScreen();
			var treeOver = false;

			$('#tree').hover(function(){
				treeOver = true;
			},function(){
				treeOver = false;
			});
			
			
			
			// Костыли для Оперы
			if ($.browser.opera && parseFloat(jQuery.browser.version)<9.8 ){
				document.addEventListener('mousemove',function(e){
					e.target.ownerDocument.defaultView.getSelection().removeAllRanges();
				},false);

				document.addEventListener('dblclick',function(e){
					e.target.ownerDocument.defaultView.getSelection().removeAllRanges();
				},false);

				$(document).mousedown(function(e){
					if (e.button == 2 && treeOver){

						if ($('#operaCM').text()==''){
							$('body').append('<div id="operaCM" style="position:absolute; width:10px;height:10px;opacity:0.01"><input type="button">df</div>');
						}
						$(document).mousemove(function(e){
							$('#operaCM').css("top",e.pageY-1);
							$('#operaCM').css("left",e.pageX-1);
						});
						$('#operaCM').css("top",e.pageY-1);
						$('#operaCM').css("left",e.pageX-1);
						return false;
					}
				});
				$(document).mouseup(function(){
					$(document).unbind("mousemove");
					$('#operaCM').css("top","-100");
					$('#operaCM').css("left","-100");
				})
			}

		});

	</script>