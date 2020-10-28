const mainFileUpload = () => {

    let 
        img        = document.querySelector('#img'),
        dropZone   = document.querySelector('.drop-zone'),
        file       = undefined,
        form       = document.querySelector('form'),
        fileUpload = (id == undefined) ? false : true;
        srcOldFile = ''; 

    if(img != undefined){
        srcOldFile = img.src;
    }else{
        srcOldFile = undefined;
    }

    dropZone.addEventListener('dragover',  {handleEvent: dragOver,  dropZone: dropZone}, false);
    dropZone.addEventListener('dragleave', {handleEvent: dragLeave, dropZone: dropZone}, false);
    dropZone.addEventListener('drop',      {handleEvent: dropImage, img: img, dropZone: dropZone}, false);
    
    form.addEventListener('submit', checkFile, false);

    function checkFile(e){
        e.preventDefault();

        if(!fileUpload){
            alert('Перед отправкой загрузите файл!');
        }else{
            form.submit();
        }
    }

    function dragOver(e){
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

        if(this.dropZone.classList.contains('upload-block')){
            this.dropZone.classList.add('active-upload-block');
        }else{
            this.dropZone.classList.add('active-img');
        }
    }


    function dragLeave(e){
        e.stopPropagation();
        e.preventDefault();

        if(this.dropZone.classList.contains('upload-block')){
            this.dropZone.classList.remove('active-upload-block');
        }else{
            this.dropZone.classList.remove('active-img');
        }
    }


    function dropImage(e){
        e.stopPropagation();
        e.preventDefault();

        let
            fileTransfer = e.dataTransfer.files[0],
            img          = this.img,
            reader       = new FileReader();

        if(this.dropZone.classList.contains('upload-block')){
            this.dropZone.classList.remove('active-upload-block');
        }else{
            this.dropZone.classList.remove('active-img');
        }

        if(fileTransfer.type != 'image/png' && fileTransfer.type != 'image/jpeg' && fileTransfer.type != 'image/jpg'){
            alert('Файл не является изображением');
            this.dropZone.classList.remove('active-upload-block');
            this.dropZone.classList.remove('active-img');
            return;
        }

        if(fileTransfer.size > 8 * 1014 * 1024 * 8){
            alert('Загруженный файл больше 8 мегабайт');
            this.dropZone.classList.remove('active-upload-block');
            this.dropZone.classList.remove('active-img');
            return;
        }

        if(img == null){
            img = document.createElement('img');
            img.id = 'img';
            this.dropZone.children[0].remove()
            this.dropZone.classList.remove('upload-block');
            this.dropZone.classList.remove('active-img');
            this.dropZone.append(img);
        }else{
            this.dropZone.classList.remove('active-img');
        }

        reader.onload = (function(theFile){
            return function(e){
                img.src = e.target.result;
                file    = fileTransfer;
                upload();
            }
        })(fileTransfer);
        reader.readAsDataURL(fileTransfer);
    }


    function createProgressBar(){
        
        let
            oldProgress   = document.querySelector('.progress'),
            progress      = document.createElement('progress'),
            wrapper       = document.querySelector('.wrap-progress-bar'),
            progressValue = document.createElement('div'),
            progressBg    = document.createElement('div');

        if(oldProgress != undefined){
            oldProgress.remove();
            wrapper = document.createElement('div');
            wrapper.classList.add('wrapper-progress-bar');
            document.querySelector('.view-content > .col-2').prepend(wrapper);
        }

        progress.setAttribute('max', '100');

        wrapper.classList.add('progress');
        progressValue.classList.add('progress-value');
        progressBg.classList.add('progress-bg');
        progressBg.innerHTML = '<div class="progress-bar"></div>'

        wrapper.append(progress);
        wrapper.append(progressValue);
        wrapper.append(progressBg);

        return wrapper;
    }
    

    function upload(){

        let
            xhr             = new XMLHttpRequest(),
            wrapperProgress = createProgressBar(),
            formData        = new FormData();

        xhr.upload.onprogress = (e) => {
            let
                percent  = e.loaded / e.total,
                progress = wrapperProgress.children[0];

            progress.value = Math.ceil(percent * 100);
        }

        xhr.onload = xhr.onerror = function(){
            if(this.status == 200){
                document.querySelector('input#filename').value = this.response.filename;
                fileUpload = true;
            }else{
                alert('Ошибка серевера, обратитесь в поддержку');
            }
        }

        formData.append('file', file);

        if(id != undefined){
            formData.append('id', id);
        }

        xhr.open('POST', '/admin/comments/file');
        xhr.responseType = 'json',
        xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*, q=0.01');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-XSRF-TOKEN', csrf);
        xhr.send(formData);
    }
}


window.addEventListener('load', mainFileUpload, false);