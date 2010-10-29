<?php

/*
 *	класс user с набором системных методов
 */

class modules_users_admin{
	const TITLE = 'Пользователи';
	const POSITION = '6';


	//==================================================================================================
	// Функция определения адресата запроса
	function onLoad($GET,$POST,$FILES){
		if (!isset($GET['action'])){modules_users_admin::show();}
		if ($GET['action']=='editElement'){modules_users_admin::editElement($GET['id'],$GET['from']);}
		if ($GET['action']=='editElementSCR'){modules_users_admin::editElementSCR($POST,$FILES,$GET['author']);}
		if ($GET['action']=='buildTree'){modules_users_admin::buildTree($GET['author']);}
		if ($GET['action']=='addElement'){modules_users_admin::addElement($GET['parent_id'],$GET['author']);}
		if ($GET['action']=='addElementSCR'){modules_users_admin::addElementSCR($POST,$FILES,$GET['author']);}
		if ($GET['action']=='deleteElement'){modules_users_admin::deleteElement($GET['id'],$GET['author']);}
		if ($GET['action']=='startPage'){modules_users_admin::startPage($GET['author']);}
		if ($GET['action']=='savegroupPolicy') {modules_users_admin::saveGP($GET['group'],$POST);}
		if ($GET['action']=='addGP') {modules_users_admin::addGP($POST);}
		if ($GET['action']=='banUser') {modules_users_admin::banUser($POST);}
	}
	// Функция определения адресата запроса
	//==================================================================================================




	//==================================================================================================
	// Функция вывода настроек
	function show(){

		$SEND['tree'] = modules_users_admin::buildTree();												// Формируем дерево
		$SEND['path'] = 'Пользователи';
		$SEND['content'] = modules_users_admin::startPage();
		$SEND['content'] = admin::draw('users/page',$SEND);											// Формируем контент
		$SEND['js'] = 'users/js.js';																	// Указываем файл JavaScript'а
		$SEND['title'] = 'Ползователи';																		// Указываем заголовое страницы
		
		echo admin::draw('page_index',$SEND);															// Выводим админку

	}
	// Функция вывода настроек
	//==================================================================================================




	//==================================================================================================
	// Функция вывода стартовой страницы
	function startPage($author = ''){

		$policy=sys::sql("SELECT * FROM `prefix_groupPolicy`",0);
		$fields=sys::getFields('prefix_groupPolicy');
		$columns = mysql_num_fields($fields);
		for ($x=0; $x<$columns;$x++){
			$DATA['value'] = mysql_field_name($fields, $x);
			$SEND['policy'] .= admin::draw('users/startPage.input',$DATA);
		}
		while($row = mysql_fetch_array($policy)){
			unset($DATA['inputs']);
			for ($x=0; $x<$columns;$x++){
				$DATA2['value'] = $row[mysql_field_name($fields, $x)];
				$DATA2['name'] = mysql_field_name($fields, $x);
				$DATA['inputs'] .= admin::draw('users/startPage.input',$DATA2);
			}
			$DATA['group'] = $row['group'];
			$SEND['policy'] .= admin::draw('users/startPage.policy',$DATA);
		}
		$SEND['policy'] .= admin::draw('users/startPage.form');

		// Выборка пользователей по группам
		$users_id=mysql_result(sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `name`='users' AND `parent_id`='0'",0),0);
		$group=sys::sql("SELECT `group`,`title` FROM `prefix_groupPolicy` ORDER BY `group`",0);
		while ($grupa = mysql_fetch_array($group)){
//			echo '<div class="root"><div class="name_section"><img src="../core/style/root.png" alt="root" /><b>'.$grupa['title'].'</b></div></div>';
			$result=sys::sql("SELECT `id`,`name`,`title` FROM `prefix_Sections` WHERE `parent_id`='$users_id'",0);
			unset($DATA['users']);
			while ($row = mysql_fetch_array($result)){
				$group2=mysql_result(sys::sql("SELECT `data` FROM `prefix_TVarchar` WHERE `name`='group' AND `parent_id`='".$row['id']."'",0),0);
				if ($group2==$grupa['group']){
					$DATA2['name'] = $row['name']; 
					$DATA2['title'] = $row['title'];
					$DATA2['id'] = $row['id'];
					$DATA['users'] .= admin::draw('users/startPage.user',$DATA2);
//					echo '<div class="structure" style="margin-left:'.$margin.'px;width:'.$width.'px;"><div class="name_section"><img src="../core/style/page.png" alt="page">'.$row['name'].'</div><div class="link"><a class="button_remove" href="/panel/structure?action=delPageScript&id='.$row['id'].'&from=users">&nbsp;</a><a class="button_edit" href="/panel/structure?action=editPage&pageid='.$row['id'].'&from=users">&nbsp;</a></div></div>';
				}
			}
			$DATA['group'] = $grupa['title'];
			$SEND['users'] .= admin::draw('users/startPage.group',$DATA);
		}
		// =====================


		$out = admin::draw('users/startPage',$SEND);


		if ($author == 'admin'){
			echo $out;
		}else{
			return $out;
		}

	}
	// Функция вывода стартовой страницы
	//==================================================================================================




	//==================================================================================================
	// Функция построения дерева элементов
	function buildTree($author=''){

		$id = mysql_result(
			sys::sql("SELECT
						sect.`id`
					FROM
						`prefix_Sections` sect,
						`prefix_ClassSections` class
					WHERE
						sect.`title` = 'Пользователи' AND
						sect.`name` = 'users' AND
						sect.`base_class` = class.`id` AND
						class.`name` = 'users' AND
						class.`type` = 'users'
			;",0)
		,0);

		$sql = sys::sql("SELECT `id`,`title` FROM `prefix_Sections` WHERE `parent_id`='$id'",0);		// Выбираем дочерние элементы 1-го уровня

		$SEND['childNode'] = modules_users_admin::findChild($id);										// Указываем дочерние элементы
		$SEND['id'] = $id;																				// Указываем ID элемента
		$SEND['title'] = 'Пользователи';																// Указываем Название элемента

		if ($author=='admin'){
			echo admin::draw('users/tree',$SEND);
		}else{
			return admin::draw('users/tree',$SEND);
		}
		
	}
	// Функция построения дерева элементов
	//==================================================================================================




	//==================================================================================================
	// Функция поиска дочерних элементов
	function findChild($id){

		$sql = sys::sql("SELECT `id`,`title` FROM `prefix_Sections` WHERE `parent_id`='$id'",0);		// Выбираем дочерние элементы

		while ($res = mysql_fetch_array($sql)){
			$sq2 = sys::sql("SELECT `id` FROM `prefix_Sections` WHERE `parent_id`='".$res['id']."'",0);	// Проверяем наличие дочерних элементов
			if (mysql_num_rows($sq2)>0){
				$res['child'] = modules_users_admin::findChild($res['id']);							// Формируем дочерние элементы
				$tpl = 'users/tree.elementHasChild';													// Указываем шаблон
			}else{
				$tpl = 'users/tree.element';															// Указываем шаблон
			}
			$out .= admin::draw($tpl,$res);																// Выводим дочерние элементы дерева
		}

		return $out;

	}
	// Функция поиска дочерних элементов
	//==================================================================================================




	//==================================================================================================
	// Диалог создания нового элемента
	function addElement($parent_id,$author=''){

		if ($parent_id==0){																				// Если создается корень
		
			$BT['value'] = 1;
			$BT['title'] = 'Корень'; 
			$BT['name'] = 'root';
			$SEND['option'] = admin::draw('users/select.option',$BT);
			
		}else{
		
			// Доступные базовые типы
			$sql = sys::sql("SELECT
								class.`id`,
								class.`title`,
								class.`name`
							FROM
								`prefix_ClassSections` bclass,
								`prefix_ClassSections` class,
								`prefix_Sections` sect
							WHERE
								sect.`id` = '$parent_id' AND
								bclass.`parent_id` = sect.`base_class` AND
								bclass.`type` = 'type_children' AND
								class.`name` = bclass.`name` AND
								class.`type` = 'type'
							GROUP BY bclass.`title`
							ORDER BY bclass.`id`;
			",0);
			
			if (mysql_num_rows($sql)>0){
			
				while ($res = mysql_fetch_array($sql)){													// Формируем список допустимых базовых классов
					$BT['value'] = $res['id'];
					$BT['title'] = $res['title']; 
					$BT['name'] = $res['name'];
					$SEND['option'] .= admin::draw('users/select.option',$BT);
				}
				
			}else{
				
				/*
				*	Если у выбранного элемента в базовом классе нет дочерних элементов
				*	выводим сообщение об ошибке				
				*/				
				
				$REP['title'] = 'Ошибка: Невозможно создать дочерний элемент';
				$REP['report'] = 'В Базовом Классе родительского элемента не указан ни один тип дочернего элемента. Перейти к редактированию базового класса.';
				echo admin::draw('users/report',$REP);
				return;
				
			}
			
		}

		$SEND['js'] = 'users/addDialog.js';															// Указываем файл JavaScript
		$SEND['parent'] = $parent_id;																	// Указываем родительский ID

		/****************************/
		// Определение чернового имени
		$sql = sys::sql("SELECT
							sect1.`name`+1 ind
						FROM
							`prefix_Sections` sect1
						WHERE 
							sect1.`parent_id`='$parent_id'
						ORDER BY ind DESC
						LIMIT 1;
		",1);

		if (count($sql)>0){
			$SEND['name'] = $sql[0]['ind'];
		}else{
			$SEND['name'] = '1';
		}
		$SEND['title'] = $SEND['name'];
		// Определение чернового имени
		/****************************/

		echo admin::draw('users/addDialog',$SEND);													// Выводим диалог

	}
	// Диалог создания нового элемента
	//==================================================================================================




	//==================================================================================================
	// Функция создания нового элемента
	function addElementSCR($POST,$FILES='',$author=''){

		// Внесение элемента в БД (таблица _Sections)
		$sql = sys::sql("INSERT
						INTO
							`prefix_Sections`
						VALUES (
							'',
							'',
							'".$POST['parent']."',
							'".$POST['name']."',
							'".$POST['title']."',
							'".$POST['type']."',
							''
						)
		;",0);

		// Узнаем ID созданного элемента
		$id=mysql_insert_id();

		// Определение дочерних элементов 
		$sql = sys::sql("SELECT
							`id`,
							`name`,
							`value`
						FROM
							`prefix_ClassSections`
						WHERE
							`parent_id`='".$POST['type']."' AND
							`type`='attr';
		",0);

		while($row = mysql_fetch_array($sql)){
			$POST["parentId"]=$id;
			$POST['dataName']=$row['name'];
			eval('components_'.$row["value"].'::createStr($POST);');
		}

		// Выводим диалог редактирования элемента
		if ($author == 'client'){ return $id; }
		if ($POST['parent']=='0'){
			echo $id;
		}else{
			modules_users_admin::editElement($id);
		}

	}
	// Функция создания нового элемента
	//==================================================================================================





	//==================================================================================================
	// Диалог редактирования элемента
	function editElement($id,$from = ''){

		// Выборка данных о редактируемом элементе
		$sql = sys::sql("SELECT
							sect.`name`,
							sect.`title`,
							class.`title`,
							class.`id`
						FROM
							`prefix_Sections` sect,
							`prefix_ClassSections` class
						WHERE
							sect.`id` = '$id' AND
							class.`id` = sect.`base_class`
		",0);

		$page_datas = mysql_fetch_array($sql);															// Преобразуем данные из БД в массив

		/**************************/
		// Формируем массив на вывод
		$SEND['js'] = 'users/editDialog.js';
		$SEND['name'] = $page_datas['0'];
		$SEND['title'] = $page_datas['1'];
		$SEND['base_class'] = $page_datas['2'];
		$SEND['id'] = $id;
		$SEND['from'] = $from;
		// Формируем массив на вывод
		/**************************/

		// Выборка дочерних элементов
    	$sql = sys::sql("SELECT
							`name`,
							`title`,
							`value`
						FROM
							`prefix_ClassSections`
						WHERE
							`parent_id`='".$page_datas['3']."'
						ORDER BY `id`;
		",0);

		// Вывод дочерних элементов на редактирование
		while($row = mysql_fetch_array($sql)){
			if ($row['value']!=''){
				$POST['dataName']=$row['name'];
				$POST['parentId']=$id;
				eval('components_'.$row['value'].'::createStr($POST);');
				$TComponent=$row['value'];
				$name=$row['name'];
				$title=$row['title'];
				eval('$SEND["content"] .= components_'.$TComponent.'::edit($name,$id,$title);');
      		}
		}

		// Выборка дочерних элементов структуры
		$sql = sys::sql("SELECT
							`id`,
							`name`,
							`title`
						FROM
							`prefix_Sections`
						WHERE
							`parent_id` = '$id'
		;",0);

		while ($row = mysql_fetch_array($sql)){
			$IMG['width'] = mysql_result(sys::sql("SELECT `data` FROM `prefix_TInteger` WHERE `name`='width' AND `parent_id`='".$id."'",0),0);
			$IMG['height'] = mysql_result(sys::sql("SELECT `data` FROM `prefix_TInteger` WHERE `name`='height' AND `parent_id`='".$id."'",0),0);
			$DATA['id'] = $row['id'];
			$DATA['title'] = $row['title'];
			$DATA['name'] = $row['name'];
			$DATA['pokaz'] = mysql_result(sys::sql("SELECT `data` FROM `prefix_TInteger` WHERE `name`='Pokaz' AND `parent_id`='".$row['id']."'",0),0);
			$DATA['viewed'] = mysql_result(sys::sql("SELECT `data` FROM `prefix_TInteger` WHERE `name`='Viewed' AND `parent_id`='".$row['id']."'",0),0);
			$DATA['active'] = mysql_result(sys::sql("SELECT `data` FROM `prefix_TBoolev` WHERE `name`='Active' AND `parent_id`='".$row['id']."'",0),0);
			$ban_image = mysql_result(sys::sql("SELECT `data` FROM `prefix_TFiles` WHERE `name`='Image' AND `parent_id`='".$row['id']."'",0),0);
			$DATA['date'] = mysql_result(sys::sql("SELECT `data` FROM `prefix_TDate` WHERE `name`='Date' AND `parent_id`='".$row['id']."'",0),0);
			$DATA['countDays'] = mysql_result(sys::sql("SELECT `data` FROM `prefix_TInteger` WHERE `name`='countDays' AND `parent_id`='".$row['id']."'",0),0);

			if ($ban_image!=''){
				$IMG['image'] = $ban_image;
				if (substr($ban_image,strlen($ban_image)-3,strlen($ban_image))=='jpg'){
					$DATA['img'] = admin::draw('users/banner.image',$IMG);
				}else{
					$DATA['img'] = admin::draw('users/banner.flash',$IMG);
				}
			}else{
				$DATA['img'] = '';
			}

			$SEND['banners'] .= admin::draw('users/banner',$DATA);

		}

		echo admin::draw('users/editDialog',$SEND);													// Вывод диалога редактирования

	}
	// Диалог редактирования элемента
	//==================================================================================================




	//==================================================================================================
	// Функция сохранения изменений в контенте элемента
	function editElementSCR($POST,$FILES,$author=''){
		// Обновляем Title и Name
		$sql = sys::sql("UPDATE
							`prefix_Sections`
						SET
							`name` = '".$POST['name']."',
							`title` = '".$POST['title']."'
						WHERE
							`id` = '".$POST['id']."'
						LIMIT 1;
		",0);

		unset($POST['name']);
		unset($POST['title']);


		foreach ($POST as $key => $value) {
			$keyShort=explode('/',$key);
			if (count($keyShort)==1){
				$sql = sys::sql("SELECT
									class.`value`
								FROM
									`prefix_Sections` sect,
									`prefix_ClassSections` class
								WHERE
									sect.`id` = '".$POST['id']."' AND
									class.`name` = '$key' AND
									class.`parent_id` = sect.`base_class`
				",0);

				if (mysql_num_rows($sql)){
					$component=mysql_result($sql,0);
					$POSTC['parent_id']=$POST['id'];
					$POSTC['dataName']=$key;
					$POSTC['data']=$value;
					eval('components_'.$component.'::save($POSTC,$_FILES);');
				};
			} else {
				if ($keyShort[1]=='pass'){

					$sql = sys::sql("SELECT
										class.`value`
									FROM
										`prefix_Sections` sect,
										`prefix_ClassSections` class
									WHERE
										sect.`id` = '".$POST['id']."' AND
										class.`name` = '".$keyShort[0]."' AND
										class.`parent_id` = sect.`base_class`
					",0);

					if (mysql_num_rows($result)){
						$component=mysql_result($result,0);
						$POSTC['parent_id']=$POST['id'];
						$POSTC['dataName']=$keyShort[0];
						$POSTC['pass']=$value;
						$POSTC['group']=$POST[$keyShort[0].'/group'];
						eval('components_'.$component.'::save($POSTC,$_FILES);');
					};
				}
			}
    	}
		if (!$FILES==''){
			foreach ($FILES as $key => $value) {
				$keyShort=explode('/',$key);
				if ($keyShort[1]=='pict'){} else {

					$sql = sys::sql("SELECT
										class.`value`
									FROM
										`prefix_Sections` sect,
										`prefix_ClassSections` class
									WHERE
										sect.`id` = '".$POST['id']."' AND
										class.`name` = '".$keyShort[0]."' AND
										class.`parent_id` = sect.`base_class`
					",0);
					if (mysql_num_rows($sql)>0){
						$component=mysql_result($sql,0);
						$POSTC['parent_id']=$POST['id'];
						$POSTC['dataName']=$keyShort[0];
						$POSTC['data']=$value;
						eval('components_'.$component.'::save($POSTC,$FILES,$keyShort[0]);');
					};
				};
			}
    	}

		echo 'Изменения сохранены';

	}
	// Функция сохранения изменений в контенте элемента
	//==================================================================================================




	//==================================================================================================
	// Функция удаления элемента
	function deleteElement($id,$author = ''){

		// Узнаем атрибуты
		$sql = sys::sql("SELECT
							class.`value`,
							class.`name`
						FROM
							`prefix_Sections` sect,
							`prefix_ClassSections` class
						WHERE
							class.`parent_id` = sect.`base_class` AND
							class.`type` = 'attr' AND
							sect.`id` = '$id'
		;",0);

		// Удаляем атрибуты
		while ($row = mysql_fetch_array($sql)){
			eval('components_'.$row['value'].'::deleteAttr($row["name"],$id);');
		}

		// Находим все дочерние элементы
		$sql = sys::sql("SELECT
							`id`
						FROM
							`prefix_Sections`
						WHERE
							`parent_id` = '$id'
		;",0);

		// Вызываем удаление дочерних элементов
		while ($row = mysql_fetch_array($sql)){
			modules_users_admin::deleteElement($row['id']);
		}


		// Удаляем сам элемент
		$sql = sys::sql("DELETE FROM `prefix_Sections` WHERE `id` = '$id' LIMIT 1;",0);

		if ($author == 'admin'){
			echo 'Удаление успешно завершено!';
		}
	}
	// Функция удаления элемента
	//==================================================================================================




	//==================================================================================================
	// Функция сохранения групповых политик
	function saveGP($group,$POST){
		foreach ($POST as $key => $value){
			if ($key!='group'){
				$query=sys::sql("UPDATE `prefix_groupPolicy` SET `$key`='$value' WHERE `group`='$group'",0);
			}
		}
	}	
	// Функция сохранения групповых политик
	//==================================================================================================




	//==================================================================================================
	// Функция создания групповых политик
	function addGP($POST){
		$query=sys::sql("ALTER TABLE `prefix_groupPolicy` ADD `".$POST['policy']."` INT( 1 ) NOT NULL ;",0);
	}
	// Функция создания групповых политик
	//==================================================================================================




	//==================================================================================================
	// Функция блокировки пользователя
	function banUser($POST){
		print_r($POST);
		$id=$POST['id'];
		$result=sys::sql("UPDATE `prefix_TVarchar` SET `data`='banned' WHERE `name`='group' AND `parent_id`='$id'",0);
		$result=sys::sql("UPDATE `prefix_TVarchar` SET `data`='".$POST['blockDate']."' WHERE `name`='banDate' AND `parent_id`='$id'",0);
	}
	// Функция блокировки пользователя
	//==================================================================================================
}
// Конец класса
?>