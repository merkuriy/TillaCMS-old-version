<?php

/*
 * Модуль пользователи (SYS)
 */
class modules_users_sys {

	//========================================
	// Функция обновления данных о пользователе
	function updateUserData($POST){
		foreach ($POST as $key => $value){
			$keyshort = explode("_",$key);
			if ($value != ''){
				if ($keyshort[1] == 'icq' or $keyshort[1] == 'mail'){
					$sql = sys::sql("UPDATE
										`prefix_TMnemonik`
									SET
										`data` = '$value'
									WHERE
										`parent_id` = '".$_SESSION['user_ID']."' AND
										`name` = '$keyshort[1]'
					;",0);
				} else {
					if ($keyshort[1] == 'password') {
						$value = md5($value);
					}
					$sql = sys::sql("UPDATE
										`prefix_TVarchar`
									SET
										`data` = '$value'
									WHERE
										`parent_id` = '".$_SESSION['user_ID']."' AND
										`name` = '$keyshort[1]'
					;",0);
				}
			}
		}
	}


	//========================================
	// Функция аторизации
	function auth($POST){
		$base_class = mysql_result(sys::sql("SELECT `id` FROM `prefix_ClassSections` WHERE `name`='user' AND `type`='type';",0),0);
		$idSQL=sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `name`='".$POST['user_login']."' AND `base_class`='$base_class';",0);
		if (mysql_num_rows($idSQL)>0){
			$id=mysql_result($idSQL,0);
			$passSQL=sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='password' AND `parent_id`='$id'",0);
			$pass=mysql_result($passSQL,0);
			$activeSQL=sys::sql("SELECT `data` FROM `prefix_TBoolev` WHERE `name`='active' AND `parent_id`='$id'",0);
			$active=mysql_result($activeSQL,0);
			$banDate=sys::sql("SELECT `data` FROM `prefix_TDate` WHERE `name`='banDate' AND `parent_id`='$id' AND `data`<NOW()",0);
			$groupSQL=sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='group' AND `parent_id`='$id'",0);
			$group=mysql_result($groupSQL,0);
			if ($group=='banned' and mysql_num_rows($banDate)>0){
				$groupSQL=sys::sql("UPDATE `prefix_TVarchar` SET `data`='user' WHERE `name`='group' AND `parent_id`='$id'",0);
			}
			$groupSQL=sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='group' AND `parent_id`='$id'",0);
			$group=mysql_result($groupSQL,0);
			if ($pass==md5($_POST['user_password']) and $active=='true'){
				$_SESSION['user_ID']=$id;
				$_SESSION['user_login']=$_POST['user_login'];
				$_SESSION['group']=$group;
				if (modules_users_sys::getPolicy('admin')){
					$_SESSION['admin']=1;
					sys::logEntry('Авторизация администратора',$id);
				}else {
					$_SESSION['admin']=0;
					sys::logEntry('Авторизация пользователя',$id);
				}
				if (isset($_SERVER[HTTP_REFERER])){
					header('location:'.$_SERVER[HTTP_REFERER]);
				} else {
					modules_Structure_admin::onLoad($_GET,$_POST,$_FILES);
				}   
			}else{
				//echo 'Введен не верный пароль или данный аккаунт не активирован!';
			}
		}else{
			//echo 'Не верная пара Логин - Пароль!<br>';
		}
	}
  
  
	//========================================
	// Функция аторизации
	function deauth(){
		sys::logEntry('Выход пользователя');
		session_destroy();
		unset($_SESSION);
		header('location:'.$_SERVER[HTTP_REFERER]);
		//header('location:'.modules_settings_sys::get('URL'));
	}
  
  
	//========================================
	// Функция аторизации
	function registration($POST){
		modules_users_admin::createTable();
		// Преобразование пароля в md5
		//============================
		$POST['user_password']=md5($POST['user_password']);
		// Преобразование пароля в md5
		//============================
		$root_id=mysql_result(sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `parent_id`='0' AND `name`='users'",0),0);
		$base_class=mysql_result(sys::sql("SELECT `id` FROM `prefix_ClassSections` WHERE `name`='user' AND `parent_id`='0'",0),0);
		$query=sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `parent_id`='$root_id' AND `name`='".$POST['user_login']."'",0);
		if (mysql_num_rows($query)>0){
			header('location:'.modules_settings_sys::get('URL').'/hidden/nofreeusername');
		}else{
			$login=$POST['user_login'];
			$code=rand(100000,999999);
			$addUser=sys::sql("INSERT INTO `prefix_Sections` VALUES ('','$root_id','".$POST['user_login']."','".$POST['user_nickname']."','$base_class','')",0);
			$id=mysql_insert_id();
			foreach ($POST as $key => $value) {
				$ki=explode('_',$key);
				if (count($ki)>0){
					$result = sys::sql("SELECT `value` FROM `prefix_ClassSections` WHERE `name`='".$ki[1]."' AND `parent_id`='$base_class';",0);
					if (mysql_num_rows($result)){
						$component=mysql_result($result,0);
						$POSTC['parent_id']=$id;
						$POSTC['dataName']=$ki[1];
						$POSTC['data']=$value;
						eval('components_'.$component.'::save($POSTC,$_FILES);');
					};
				}
			}
			$group=mysql_result(sys::sql("SELECT `group` FROM `prefix_groupPolicy` WHERE `default`='1'",0),0);
			$POSTC['parent_id']=$id;
			$POSTC['dataName']='group';
			$POSTC['data']=$group;
			eval('components_TVarchar::save($POSTC,$_FILES);');
			$POSTC['dataName']='active';
			$POSTC['data']='false';
			eval('components_TBoolev::save($POSTC,$_FILES);');
			$POSTC['dataName']='code';
			$POSTC['data']=$code;
			eval('components_TVarchar::save($POSTC,$_FILES);');

			$to  = 'pasarian@yandex.ru';
			$subject = 'Подтверждение регистрации';
			$message = '
				<html>
				<head>
					<title>подтверждение регистрации на сайта FOTO.1OMSK.RU</title>
				</head>
				<body>
					<form name="formCreateUser" method="post" action="'.modules_settings_sys::get('URL').'">
						<input type="hidden" name="param1" value="users_sys.activation" />
						<input type="hidden" name="login" value="'.$login.'" />
						<input type="hidden" name="code" value="'.$code.'" />
						<input type="submit" value="Подтвердить регистрацию" />
					</form>
				</body>
				</html>
			';
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			mail($to, $subject, $message, $headers);
			sys::logEntry('Регистрация пользователя',$id);
			header('location:'.modules_settings_sys::get('URL').'/hidden/registerOk');
		}
	}


	//========================================
	// Функция аторизации
	function activation($POST){
		$root_id=mysql_result(sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `parent_id`='0' AND `name`='users'",0),0);
		$user_id=sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `parent_id`='$root_id' AND `name`='".$POST['login']."'",0);
		if (mysql_num_rows($user_id)>0){
			$user_id=mysql_result($user_id,0);
			$query=sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='code' AND `parent_id`='$user_id';",0);
			$code=mysql_result($query,0);
			if ($POST['code']==$code){
				$query=sys::sql("UPDATE `prefix_TVarchar` SET `data`='true' WHERE `name`='active' AND `parent_id`='$user_id';",0);
				$query=sys::sql("UPDATE `prefix_TVarchar` SET `data`='' WHERE `name`='code' AND `parent_id`='$user_id';",0);
				header('location:'.modules_settings_sys::get('URL').'/hidden/activationOk');
				sys::logEntry('Активация пользователя',$user_id);
			}else{
				header('location:'.modules_settings_sys::get('URL').'/hidden/activationError');
				sys::logEntry('Ошибка активации пользователя',$user_id);
			}
		}else{
			header('location:'.modules_settings_sys::get('URL').'/hidden/activationError');
			sys::logEntry('Ошибка активации пользователя',$user_id);
		}
	}
  
  
	//========================================
	// Функция аторизации
	function getPolicy($policy){
		if (isset($_SESSION['group'])){
			$group=$_SESSION['group'];
			$query=mysql_result(sys::sql("SELECT `$policy` FROM `prefix_groupPolicy` WHERE `group`='$group'",0),0);
			if ($query=='1'){
				return true;
			}else{
				return false;
			};
		}else{
			return false;
		};
	}

// Конец класса
}
?>