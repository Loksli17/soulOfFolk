const flashMain = () => {
    let flash = document.querySelector('.flash-mes');

    if(flash == undefined){
        return;
    }

    flash.classList.add('flash-mes-active');
    flash.children[1].addEventListener('click', {handleEvent: closeFlash, flash: flash}, false);

    setTimeout(() => {
        if(flash.classList.contains('flash-mes-active')){
            flash.classList.remove('flash-mes-active');
        }
    }, '3000');
}

function closeFlash(){
    this.flash.classList.remove('flash-mes-active')
}

window.addEventListener('load', flashMain, false);