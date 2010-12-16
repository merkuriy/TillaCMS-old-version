//перевод plupload
plupload.translate = function(text){
	replace = {
		'Select files':
			'Выберите файлы',
		'Add files to the upload queue and click the start button.':
			'Добавьте файлы на панель загрузки и нажмите кнопку Начать загрузку',
		'Filename':
			'Имя файла',
		'Size':
			'Размер',
		'Status':
			'Статус',
		'Drag files here.':
			'Перетащите файлы сюда.',
		'Add files':
			'Добавить файлы',
		'Start upload':
			'Начать загрузку'
	}
	
	return (replace[text])? replace[text]: text;
}