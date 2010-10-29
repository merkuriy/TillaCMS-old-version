
/* This is an example of how to cancel all the files queued up.  It's made somewhat generic.  Just pass your SWFUpload
object in to this method and it loops through cancelling the uploads. */
function cancelQueue(instance) {
	document.getElementById(instance.customSettings.cancelButtonId).disabled = true;
	instance.stopUpload();
	var stats;
	
	do {
		stats = instance.getStats();
		instance.cancelUpload();
	} while (stats.files_queued !== 0);
	
}

/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
function fileDialogStart() {
	/* I don't need to do anything here */
}
function fileQueued(fileObj) {
	try {
		// You might include code here that prevents the form from being submitted while the upload is in
		// progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetStatus("Готов к загрузке...");
		progress.ToggleCancel(true, this);

	} catch (ex) { this.debug(ex); }

}

function fileQueueError(fileObj, error_code, message) {
	try {
		if (error_code === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
      alert("Превышено максимальное количество файлов в очереди.\n" + (message === 0 ? "Вы достигли предела загрузки." : "Вы можете выбрать " + (message > 1 ? "до " + message + " файлов." : "один файл.")));
			return;
		}

		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetError();
		progress.ToggleCancel(false);

		switch(error_code) {
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
				progress.SetStatus("Файл слишком большой.");
				this.debug("Ошибка: Файл слишком большой, Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
				progress.SetStatus("Нельзя загружать пустой файл.");
				this.debug("Ошибка: Пустой файл, Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
				progress.SetStatus("Неверный тип файла.");
				this.debug("Ошибка: Неверный тип файла, Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
				alert("Вы выбрали слишком много файлов. " +  (message > 1 ? "Можно лишь добавить более " +  message + " файлов" : "Вы не можете добавлять больше файлов."));
				break;
			default:
				if (fileObj !== null) {
					progress.SetStatus("Неизвестная ошибка");
				}
				this.debug("Ошибка: " + error_code + ", Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function fileDialogComplete(num_files_queued) {
	try {
		if (this.getStats().files_queued > 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}
		
		/* I want auto start and I can do that here */
		this.startUpload();
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(fileObj) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetStatus("Загрузка...");
		progress.ToggleCancel(true, this);
	}
	catch (ex) {}
	
	return true;
}

function uploadProgress(fileObj, bytesLoaded, bytesTotal) {

	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetProgress(percent);
		progress.SetStatus("Загрузка...");
	} catch (ex) { this.debug(ex); }
}

function uploadSuccess(fileObj, server_data) {
	try {
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetComplete();
		progress.SetStatus("Загружен.");
		progress.ToggleCancel(false);

	} catch (ex) { this.debug(ex); }
}

function uploadComplete(fileObj) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued === 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = true;
		} else {	
			this.startUpload();
		}
	} catch (ex) { this.debug(ex); }

}

function uploadError(fileObj, error_code, message) {
	try {
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetError();
		progress.ToggleCancel(false);

		switch(error_code) {
			case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
				progress.SetStatus("Ошибка при закачке: " + message);
				this.debug("Ошибка: HTTP Error, Имя файла: " + fileObj.name + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
				progress.SetStatus("Ошибка конфигурации");
				this.debug("Ошибка: Нет бэкэнда файла, Имя файла: " + fileObj.name + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
				progress.SetStatus("Сбой при закачке.");
				this.debug("Ошибка: Сбой при закачке, Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.IO_ERROR:
				progress.SetStatus("Ошибка сервера (IO)");
				this.debug("Ошибка: IO ошибка, Имя файла: " + fileObj.name + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
				progress.SetStatus("Ошибка безопасности");
				this.debug("Ошибка: Ошибка безопасности, Имя файла: " + fileObj.name + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
				progress.SetStatus("Превышен лимит загрузки.");
				this.debug("Ошибка: Превышен лимит загрузки, Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
				progress.SetStatus("Файл не обнаружен.");
				this.debug("Ошибка: Файл не был обнаружен, Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
				progress.SetStatus("Ошибка проверки. Загрузки пропущены.");
				this.debug("Ошибка: Ошибка проверки, Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
				if (this.getStats().files_queued === 0) {
					document.getElementById(this.customSettings.cancelButtonId).disabled = true;
				}
				progress.SetStatus("Отменено");
				progress.SetCancelled();
				break;
			case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
				progress.SetStatus("Остановлено");
				break;
			default:
				progress.SetStatus("Неизвестная ошибка: " + error_code);
				this.debug("Ошибка: " + error_code + ", Имя файла: " + fileObj.name + ", Размер файла: " + fileObj.size + ", Сообщение: " + message);
				break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}



function FileProgress(fileObj, target_id) {
	this.file_progress_id = fileObj.id;

	this.opacity = 100;
	this.height = 0;

	this.fileProgressWrapper = document.getElementById(this.file_progress_id);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.file_progress_id;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(fileObj.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);

		document.getElementById(target_id).appendChild(this.fileProgressWrapper);
	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.SetProgress = function(percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.SetComplete = function() {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	setTimeout(function() { oSelf.Disappear(); }, 10000);
};
FileProgress.prototype.SetError = function() {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	setTimeout(function() { oSelf.Disappear(); }, 5000);
};
FileProgress.prototype.SetCancelled = function() {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	setTimeout(function() { oSelf.Disappear(); }, 2000);
};
FileProgress.prototype.SetStatus = function(status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.ToggleCancel = function(show, upload_obj) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (upload_obj) {
		var file_id = this.file_progress_id;
		this.fileProgressElement.childNodes[0].onclick = function() { upload_obj.cancelUpload(file_id); return false; };
	}
};

FileProgress.prototype.Disappear = function() {

	var reduce_opacity_by = 15;
	var reduce_height_by = 4;
	var rate = 30;	// 15 fps

	if (this.opacity > 0) {
		this.opacity -= reduce_opacity_by;
		if (this.opacity < 0) {
			this.opacity = 0;
		}

		if (this.fileProgressWrapper.filters) {
			try {
				this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
			}
		} else {
			this.fileProgressWrapper.style.opacity = this.opacity / 100;
		}
	}

	if (this.height > 0) {
		this.height -= reduce_height_by;
		if (this.height < 0) {
			this.height = 0;
		}

		this.fileProgressWrapper.style.height = this.height + "px";
	}

	if (this.height > 0 || this.opacity > 0) {
		var oSelf = this;
		setTimeout(function() { oSelf.Disappear(); }, rate);
	} else {
		this.fileProgressWrapper.style.display = "none";
	}
};