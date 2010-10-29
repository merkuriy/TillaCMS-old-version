<?
/* 
*	Модуль Структура (SYS)
*/


class modules_structure_sys {
	//========================================
	// Функция добавления комментария
	function add($POST){
		$FILES=$_FILES;
		if (isset($_SESSION['user_login'])){
			$brother=sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `parent_id`='".$POST['parent']."'",0);
			if (!isset($POST['name'])){
				$name=(mysql_num_rows($brother)+1);
			}else {
				$name=$POST['name'];
			}
			if (!isset($POST['title'])){
				$title=(mysql_num_rows($brother)+1);
			}else {
				$title=$POST['title'];
			}
			$CREAT['parent_name']=$POST['parent_name'];
			$CREAT['name']=$name;
			$CREAT['title']=$title;
			$CREAT['attr']='';
			$CREAT['name']=$name;
			$CREAT['parent']=$POST['parent'];
			$id=modules_structure_admin::addElementSCR($CREAT,'','client');
			$POST['id']=$id;
			$POST['name'] = $CREAT['name'];
			$POST['title'] = $CREAT['title'];
			$POST['userID']=mysql_result(sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `name`='".$_SESSION['user_login']."'",0),0);
			if (!isset($POST['Date']) or $POST['Date']=='0000-00-00 00:00:00'){
				$POST['Date']=date("Y-m-d").' '.date("H:i:s");
			}
			modules_structure_admin::editElementSCR($POST,$FILES,'client');
		}else{
			echo 'Только авторизованные пользователи могут производить данные действия!';
		}
	}
	
	
	//=================================
	// Функция редактирования элементов
	function edit($POST){
		$FILES=$_FILES;
		if (isset($_SESSION['user_login'])){
			$base_class= mysql_result(sys::sql("SELECT `id` FROM `prefix_ClassSections` WHERE `name`='".$POST['parent_name']."' AND type='type'",0),0);
			$id=mysql_result(sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `name`='".$POST['name']."' AND `base_class`='$base_class'",0),0);
			$POST['id']=$id;
			$POST['userID']=mysql_result(sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `name`='".$_SESSION['user_login']."'",0),0);
			if (!isset($POST['Date']) or $POST['Date']=='0000-00-00 00:00:00'){
				$POST['Date']=date("Y-m-d").' '.date("H:i:s");
			}
			modules_structure_admin::editElementSCR($POST,$FILES,'client');
		}else{
			echo 'Только авторизованные пользователи могут производить данные действия!';
		}
	}
	
	//=================================
	// Функция редактирования элементов
	function delete($POST){
		if (isset($_SESSION['user_login']) and modules_users_sys::getPolicy('delKomment')){
			modules_structure_admin::deleteElement($POST['id'],'client');
		}else{
			echo 'Только авторизованные пользователи могут производить данные действия!';
		}
	}	
}
?>