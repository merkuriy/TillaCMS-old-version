<?php

/*
 *	Компонент TMultiUpLoad
 *	======================
 *	Компонент мультизагрузки файлов
 */
class components_TMultiUpLoad{
	function edit($name,$parentId,$title){
		$SEND['id']=$parentId;
		$out = admin::draw('TMultiUpLoad/page.link',$SEND);
		return $out;
	}
	function save($POST,$FILES, $param=''){}
	function createStr($POST){}
	function deleteAttr($name,$id){}
	function view($name,$parentId,$param=''){}
	function createTable(){}
	function condition($name,$parentId,$cond){return false;}
	
	//===================================
	// Диалог мульти загрузки фотографий
	function load($id){

		$query = mysql_result(sys::sql("SELECT `id` FROM `prefix_ClassSections` WHERE `name`='user' AND `type`='type';",0),0);
		$users = sys::sql("SELECT `id`,`name` FROM `prefix_Sections` WHERE `base_class`='$query'",0);
		while($row = mysql_fetch_array($users)){
			$groupSQL=sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='group' AND `parent_id`='".$row['id']."'",0);
			$group=mysql_result($groupSQL,0);
			if ($group=='foto' or $group=='mod' or $group=='admin'){
				$SEND['option'] .= admin::draw('TMultiUpLoad/select.option',$row);
			}
		} 

		$DATA['id'] = $id;
		$DATA['session'] = session_id();
		$SEND['pageID'] = $id;
		$SEND['javascript'] = admin::draw('TMultiUpLoad/java',$DATA);

		echo admin::draw('TMultiUpLoad/page',$SEND);
	}


	//===============================================
	// функция добавления файлов через мультизагрузку
	function saveFile($id,$FILES,$author=''){
		$sql = sys::sql("SELECT
							sect1.`name`+1 ind
						FROM
							`prefix_Sections` sect1
						WHERE 
							sect1.`parent_id`='$id'
						ORDER BY ind DESC
						LIMIT 1;
		",1);

		if (count($sql)>0){
			$name =  $sql[0]['ind'];
		}else{
			$name =  '1';
		}

		$POST['parent'] = $id;
		$POST['name'] = $name;
		$POST['title'] = $name;
		
		$POST['parent_name'] = 'foto';
		$POST['type'] = '5';
		$id=modules_structure_admin::addElementSCR($POST,'','client');
		unset($POST);
		$POST['name'] = $name;
		$POST['title'] = $name;
		$POST['id']=$id;
		if ($author == 'client'){
			$POST['author_id']=$_SESSION['user_ID'];
		} else {
			$POST['author_id']=$author;
		}
		$POST['countReads']='0';
		$POST['tpl_Section']='page_photo/main';
		$FILES['image']=$FILES["Filedata"];
		$FILES['image']['type']='image/jpeg';
		$i=modules_structure_admin::editElementSCR($POST,$FILES,'client');
	}
}
?>