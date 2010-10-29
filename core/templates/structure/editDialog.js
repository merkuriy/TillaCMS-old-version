	
	
	function saveDataSection(){
		
		if( typeof(tinyMCE)=='object' )
		$('textarea').each(function(){
			var oTextarea = $(this).tinymce();
			if( oTextarea ) oTextarea.hide();
		});
		
		
		$("#DIVcontent").hide();
		$("#DIVloader").show();
		
		$("#editElement"+ts).ajaxSubmit(function(data) { 
	
	        notify(data);
			
			if( typeof(tinyMCE)=='object' )
			$('textarea').each(function(){
				var oTextarea = $(this).tinymce();
				if( oTextarea ) oTextarea.show();
			});
	
			$("#DIVloader").hide();
			$("#DIVcontent").show();
			
			derevo.updateNode($('#pageid').val(),$('#pageTitle').val());
	
	    });
		
	}
	

	
	var ts = new Date();
	ts = ts.valueOf();
	
	
	$(document).ready(function(){
	
		document.getElementById('editElement').id="editElement"+ts;
	
		// Предварительная загрузка
		$("#editMainList").show();
		$("#editChildClass").hide();
		$("#editAttributesClass").hide();
		// Предварительная загрузка
	
		$("#callSmallContent").css("background-color","#FFFFFF");
		$("#callSmallContent").css("color","#000000");
	
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
			
			
			
			
			$('textarea').tinymce({
				// Location of TinyMCE script
				script_url : '/css_js/tiny_mce/tiny_mce.js',
	
				// General options
				language : "ru",
				theme : "advanced",
				skin : "o2k7",
				plugins : "safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,images,typograf",
				
				relative_urls : false,
				
				content_css : "/css_js/page/wysiwyg.css",
				file_browser_callback : "upload",
				
				// Theme options
				theme_advanced_buttons1 : "cleanup,removeformat,visualaid,visualchars,nonbreaking,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,outdent,indent,blockquote,|,sub,sup,|,bullist,numlist,formatselect,attribs,styleprops,|,code,typograf,|,fullscreen",
				theme_advanced_buttons2 : "",
				theme_advanced_buttons3 : "",
				
				
				fullscreen_settings : {
					
					theme_advanced_buttons1 : "save,newdocument,|,undo,redo,|,cut,copy,paste,pastetext,pasteword,|,search,replace,|,cleanup,removeformat,visualaid,visualchars,nonbreaking,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,outdent,indent,blockquote,|,sub,sup,|,bullist,numlist,formatselect,code,|,fullscreen",
					theme_advanced_buttons2 : "tablecontrols,|,insertlayer,moveforward,movebackward,absolute,|,link,unlink,anchor,|,insertdate,inserttime,|,charmap,emotions,iespell,media,image,images,advhr,hr,|,cite,abbr,acronym,del,ins,attribs,styleprops,|,typograf",
				
					
			        theme_advanced_path_location : "bottom"
			    },
				
				
				theme_advanced_toolbar_location : "top",
				theme_advanced_toolbar_align : "left",
				
				theme_advanced_source_editor_width : 950,
				theme_advanced_source_editor_height : 450,
				
				
				theme_advanced_statusbar_location : 'bottom',
				//theme_advanced_path : true,
				
				
				theme_advanced_resizing : true,
				
				setup : function(ed){
					
					if (ed.editorId != 'mce_fullscreen') {
						tinyMCE.myActiveEditor = {};
						tinyMCE.myActiveEditor = ed;
					}
					
					ed.onActivate.add( function(ed){
						
						if( ed.editorId != 'mce_fullscreen' ){
							tinyMCE.myActiveEditor = {};
							tinyMCE.myActiveEditor = ed;
						}
					});
					
					ed.onLoadContent.add( function(ed){
							
						ed.addCommand('mceSave', function(){
							
							var data = {
								id: $('#pageid').val()
							}
							
							data[$( tinyMCE.myActiveEditor.getElement() ).attr('name')] = this.getContent();
							
							$.ajax({
								url: '/panel/structure?action=editElementSCR&author=admin',
								data: data,
								type: 'POST',
								cache: false,
								success: function(msg){
									
					     			notify(msg);
									
					   			}
					
							});
							
							
						});
					
					});
					

					
				}

				
				// Example content CSS (should be your site CSS)
				// content_css : "css/content.css",
	
				// Drop lists for link/image/media/template dialogs
				/*
				template_external_list_url : "lists/template_list.js",
				external_link_list_url : "lists/link_list.js",
				external_image_list_url : "lists/image_list.js",
				media_external_list_url : "lists/media_list.js",
				*/
				/*
				// Replace values for the template plugin
				template_replace_values : {
					username : "Some User",
					staffid : "991234"
				}
				*/
				
				//$('textarea').tinymce().execCommand('mceFullScreen',false,'');
				
			});
			
			
			
			
		});
		
		
		$(".cancelBTN").click(function(){
			$("#DIVcontent").html('<div class="DIVheader"><h2>Структура</h2></div>');
		});
		
		$(".saveBTN").click(saveDataSection);
		
		
	});



