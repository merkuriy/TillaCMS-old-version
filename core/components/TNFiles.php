<?php

/*
 *	Компонент TNFiles (файлы)
 *	==============================
 *	Компонент файлов (позволяет сохранять файлы на сервер) 
 */

class components_TNFiles {
	
	//=====================================
	//Функция вывода данных
	function view($name, $parentId, $param=''){
		return '';
	}
	
	
	//=====================================
	//Функция вывода на редактирование
	function edit($name, $id, $title){
		
		$SEND['id']=$id;
		$SEND['title'] = $title;
		$SEND['name'] = $name;
		
		$path = '../data/files/'.$id;
		
		
		if( file_exists($path) ){
			
			$files = scandir( $path );
			
			unset( $files[0] );
			unset( $files[1] );
			
			$SEND['files'] = '';
			
			foreach( $files as $val ){
				$SEND['files'] .= '<a href="/'.$val.'">/'.$val.'</a>';
			}
			
		}
		
		return admin::draw('TNFiles/editDialog',$SEND);;

	}

	//=====================================
	//Функция сохранения данных
	function save($POST,$FILES,$name='', $param=''){
		
		//file_put_contents('1.txt', print_r($GLOBALS, 1), FILE_APPEND );
		
		if (isset($_POST['chunks'])){
			
			if ($_POST['chunk'] == 0){
				//если это первая часть файла
				
				$path = '../data/files/'.$POST['parent_id'];
				
				if (!file_exists($path))
					mkdir($path, 0755);
					
				$path = $path.'/'.$_FILES['file']['name'];
				
				//проверить папку и создать её
				$file = fopen($path, "wb");
				
			}else{
				$path = $path.'/'.$_FILES['file']['name'];
				
				$file = fopen($path, "ab");
			}
			
			if ($file) {
				// Read binary input stream and append it to temp file
				$in = fopen($_FILES['file']['tmp_name'], "rb");
	
				if ($in) {
					while ($buff = fread($in, 4096))
						fwrite($file, $buff);
				} else
					die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "id"}');
	
				fclose($file);
				unlink($_FILES['file']['tmp_name']);
			}
			
			
		}
		
	}


	//=====================================
	//Функция создания записи
	function createStr($POST){
		
		return false;
	}


	//=====================================
	//Функция удаления записи
	function deleteAttr($name,$id){
		
		if( !file_exists('../data/files/'.$id) )
			return false;
		
		
		$deldir = function($d){
			
			$dh = opendir( $d );
			
			while( false !== ($f = readdir($dh)) ){
				
				if ( $f != "." && $f != ".." ){
					
					$path = $d . "/" . $f;
					if( is_dir( $path ) ){
						//$deldir($path);
					}else
						unlink( $path );
				}
			}
			
			rmdir( $d );
		};
		
		$deldir('../data/files/'.$id);
		
	}


	//=====================================
	//Функция Проверки условий
	function condition($name,$parentId,$cond){
		return false;
	}
}

//инициализация компонента
if (!file_exists('../data/files')) {
	mkdir("../data/files", 0777);
};


?>