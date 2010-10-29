<?php

/*
 *	Компонент TBoolev
 *	=================
 *	Компонент логического значения ( true / false )
 */
class components_TBoolev{
	
	//=====================================
	//Функция вывода на редактирование
	function edit($name,$parentId,$title){
		components_TBoolev::createTable();
		$data_child_element=sys::sql("SELECT `id`,`data` FROM `prefix_TBoolev` WHERE `name`='$name' AND `parent_id`='$parentId';",0);
		$data=mysql_fetch_array($data_child_element);	
		$out .= '<div class="component"><div class="name_section">'.$title.' ('.$name.'):</div><div class="link"><select name="'.$name.'" class="select">';
		if ($data['data']=='true'){
			$SEND['option'] = admin::draw('TBoolev/editDialog.false');
		}else{
			$SEND['option'] = admin::draw('TBoolev/editDialog.true');
		}
		$SEND['title'] = $title;
		$SEND['name'] = $name;
		$out = admin::draw('TBoolev/editDialog',$SEND);		
		return $out;
	}


	//=====================================
	//Функция сохранения данных
	function save($POST,$FILES, $param=''){
		$result = sys::sql("SELECT `data` FROM `prefix_TBoolev` WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parent_id']."';",0);
		if (mysql_num_rows($result)==0){
			$POST['parentId']=$POST['parent_id'];
			components_TBoolev::createStr($POST);
		}
		$result = sys::sql("UPDATE `prefix_TBoolev` SET `data` = '".$POST['data']."' WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parent_id']."';",0);
		if ($param=='client'){
			return;
		} else {
		}
	}


	//=====================================
	//Функция создания записи
	function createStr($POST){
		components_TBoolev::createTable();
		$result = sys::sql("SELECT `id` FROM `prefix_TBoolev` WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parentId']."'",0);
		if (mysql_num_rows($result)=='0'){
			$result = sys::sql("INSERT INTO `prefix_TBoolev` ( `id` , `name` , `parent_id` , `data` ) VALUES ('','".$POST['dataName']."', '".$POST['parentId']."','');",0);
		}
	}


	//=====================================
	//Функция удаления записи
	function deleteAttr($name,$id){
		components_TBoolev::createTable();
		$result = sys::sql("DELETE FROM `prefix_TBoolev` WHERE `parent_id` = '$id' AND `name` = '$name' LIMIT 1;",0);
	}


	//=====================================
	//Функция вывода данных
	function view($name,$parentId,$param=''){
		components_TBoolev::createTable();
		$data_child_element=sys::sql("SELECT `data` FROM `prefix_TBoolev` WHERE `name`='$name' AND `parent_id`='$parentId';",0);
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
			CREATE TABLE IF NOT EXISTS `prefix_TBoolev` (
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