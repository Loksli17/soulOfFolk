const main = () => {
    let
        nonReadingButtons = document.querySelectorAll('.order-active');

    for(let i = 0; i < nonReadingButtons.length; i++){
        console.log(nonReadingButtons[i].id);
        nonReadingButtons[i].addEventListener('click', {handleEvent: viewOrder, block: nonReadingButtons[i]}, false);
    }
}

function viewOrder(){
    let
        xhr      = new XMLHttpRequest(),
        block    = this.block,
        formData = new FormData(); 

    xhr.onload = xhr.onerror = function(e){
        if(this.status == 200){
            block.remove();
            let countNewOrder = document.querySelector('.alert-wrap > span').innerHTML;
            if(countNewOrder - 1){
                document.querySelector('.alert-wrap > span').innerHTML = countNewOrder - 1;
            }else{
                document.querySelector('.alert-wrap > span').remove();
            }
        }else{
            alert('Ошибка сервера - обратитись в поддержку!');
        }
    }

    formData.append('id', block.id);

    xhr.open('POST', '/admin/orders/view-order');
    xhr.responseType = 'json',
    xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*, q=0.01');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('X-XSRF-TOKEN', csrf);
    xhr.send(formData);

}

window.addEventListener('load', main, false);