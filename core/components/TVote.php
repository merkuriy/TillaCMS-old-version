<?php

/*
 *	Компонент TVote
 *	===============
 *	Компонент хранения голосования
 */
class components_TVote{
	
	//=====================================
	//Функция вывода на редактирование
	function edit($name,$parentId,$title){

		components_TVote::createTable();

		$data_child_element=sys::sql("SELECT `id`,`data` FROM `prefix_TVote` WHERE `name`='$name' AND `parent_id`='$parentId';",0);
		$data=mysql_fetch_array($data_child_element);	

		$SEND['title'] = $title;
		$SEND['name'] = $name;
		$SEND['data'] = $data['data'];
		$out = admin::draw('TVote/editDialog',$SEND);

		return $out;

	}


	//=====================================
	//Функция сохранения данных
	function save($POST,$FILES, $param=''){
		if (isset($_SESSION['user_login'])){
		$result = sys::sql("SELECT `id` FROM `prefix_TVote` WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parent_id']."';",0);
		if (mysql_num_rows($result)==0){
			$POST['parentId']=$POST['parent_id'];
			components_TVote::createStr($POST);
			$result = sys::sql("SELECT `id` FROM `prefix_TVote` WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parent_id']."';",0);
		}
		$id=mysql_result($result,0);
		$result=sys::sql("SELECT `id` FROM `prefix_TVote_log` WHERE `login`='".$_SESSION['user_login']."' AND `parent_id`='$id'",0);
			if (mysql_num_rows($result)>0){
				return '0';
			}else{
				$result=sys::sql("INSERT INTO `prefix_TVote_log` VALUES ('','".$_SESSION['user_login']."','$id','".$POST['vote']."');",0);
				$result=sys::sql("SELECT `vote` FROM `prefix_TVote_log` WHERE `parent_id`='$id'",0);
				while($row = mysql_fetch_array($result)){
					$vote+=$row['vote'];
				}
				$voteTotal=$vote/mysql_num_rows($result);
				$result = sys::sql("UPDATE `prefix_TVote` SET `data` = '".$voteTotal."' WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parent_id']."';",0);
				return $voteTotal;
			}
	    } else {
			return '6';
		}
	}


	//=====================================
	//Функция создания записи
	function createStr($POST){
		components_TVote::createTable();
		$result = sys::sql("SELECT `id` FROM `prefix_TVote` WHERE `name`='".$POST['dataName']."' AND `parent_id`='".$POST['parentId']."'",0);
		if (mysql_num_rows($result)=='0'){
			$result = sys::sql("INSERT INTO `prefix_TVote` ( `id` , `name` , `parent_id` , `data` )	VALUES ('', '".$POST['dataName']."', '".$POST['parentId']."', '3');",0);
		};
	}


	//=====================================
	//Функция удаления записи
	function deleteAttr($name,$id){
		$result = sys::sql("DELETE FROM `prefix_TVote` WHERE `parent_id` = '$id' AND `name` = '$name' LIMIT 1;",0);
	}


	//=====================================
	//Функция вывода данных
	function view($name,$parentId,$param=''){
		components_TVote::createTable();
		$data_child_element=sys::sql("SELECT `data` FROM `prefix_TVote` WHERE `name`='$name' AND `parent_id`='$parentId';",0);
		if (mysql_num_rows($data_child_element)==0) {
			return '3';
		} else {
			return mysql_result($data_child_element,0);
		}
	}


	//=====================================
	//Функция Создания таблицы для хранения данных
	function createTable(){
		$query=sys::sql("
			CREATE TABLE IF NOT EXISTS `prefix_TVote` (
				`id` int(11) NOT NULL auto_increment,
				`name` varchar(255) NOT NULL,
				`parent_id` int(11) NOT NULL,
				`data` varchar(255),
				PRIMARY KEY  (`id`)
			) ENGINE=MyISAM AUTO_INCREMENT=1 CHARACTER SET utf8 COLLATE utf8_general_ci AUTO_INCREMENT=1;",0);
		$query=sys::sql("
			CREATE TABLE IF NOT EXISTS `prefix_TVote_log` (
				`id` int(11) NOT NULL auto_increment,
				`login` varchar(255) NOT NULL,
				`parent_id` int(11) NOT NULL,
				`vote` int(5),
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