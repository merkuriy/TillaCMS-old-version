<?php

/*
 *	Компонент TVarchar
 *	==================
 *	Компонент хранения текстового значения (максимальная длина 255 символов)
 */
class components_TVarchar{
	
	//=====================================
	//Функция вывода на редактирование
	function edit($name,$parentId,$title){

		components_TVarchar::createTable();
		$data_child_element=sys::sql("SELECT `id`,`data` FROM `prefix_TVarchar` WHERE `name`='$name' AND `parent_id`='$parentId';",0);

		$data=mysql_fetch_array($data_child_element);	

		$SEND['title'] = $title;
		$SEND['name'] = $name;
		$SEND['data'] = $data['data'];

		$out = admin::draw('TVarchar/editDialog',$SEND);

		return $out;

	}


	//=====================================
	//Функция сохранения данных
	function save($POST,$FILES, $param=''){
    $result = sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parent_id']."';",0);
    if (mysql_num_rows($result)==0){
      $POST['parentId']=$POST['parent_id'];
      components_TVarchar::createStr($POST);
    }
		$result = sys::sql("UPDATE `prefix_TVarchar` SET `data` = '".htmlspecialchars($POST['data'])."' WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parent_id']."';",0);
		if ($param=='client'){return;} else {}
	}


	//=====================================
	//Функция создания записи
	function createStr($POST){
		components_TVarchar::createTable();
		$result = sys::sql("SELECT `id` FROM `prefix_TVarchar` WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parentId']."'",0);
		if (mysql_num_rows($result)=='0'){
			$result = sys::sql("INSERT INTO `prefix_TVarchar` ( `id` , `name` , `parent_id` , `data` ) VALUES ( '', '".$POST['dataName']."', '".$POST['parentId']."', '');",0);
		};
	}


	//=====================================
	//Функция удаления записи
	function deleteAttr($name,$id){
		$result = sys::sql("DELETE FROM `prefix_TVarchar` WHERE `parent_id` = '$id' AND `name` = '$name' LIMIT 1;",0);
	}

	//=====================================
	// Функция формирования строки для SQL-запроса
	function sqlFilter($name,$parentId,$param=''){
		$sqlSelect = $name.'.`data` '.$name;
		$sqlFrom = ', cms_TVarchar '.$name;
		$sqlWhere = 'AND '.$name.'.`parent_id` = sec.`id` AND '.$name.'.`name` = "'.$name.'"';
	}

	//=====================================
	//Функция вывода данных
	function view($name,$parentId,$param=''){
		components_TVarchar::createTable();
		$data_child_element=sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='$name' AND `parent_id`='$parentId';",0);
		if (mysql_num_rows($data_child_element)==0) {
			return '';
		} else {
			return mysql_result($data_child_element,0);
		}
	}


	//=====================================
	//Функция Создания таблицы для хранения данных
	function createTable(){
		$query=sys::sql("
			CREATE TABLE IF NOT EXISTS `prefix_TVarchar` (
				`id` int(11) NOT NULL auto_increment,
				`name` varchar(255) NOT NULL,
				`parent_id` int(11) NOT NULL,
				`data` varchar(255),
				PRIMARY KEY  (`id`)
			) ENGINE=MyISAM AUTO_INCREMENT=1 CHARACTER SET utf8 COLLATE utf8_general_ci AUTO_INCREMENT=1;",0);
	}


	//=====================================
	//Функция Проверки условий
	function condition($name,$parentId,$cond){
		return false;
	}
}
?>