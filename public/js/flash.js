const flashMain = () => {
    let flash = document.querySelector('.flash-mes');

    if(flash == undefined){
        return;
    }

    flash.classList.add('flash-mes-active');
    flash.children[1].addEventListener('click', {handleEvent: closeFlash, flash: flash}, false);
}

function closeFlash(){
    this.flash.classList.remove('flash-mes-active')
}

window.addEventListener('load', flashMain, false);