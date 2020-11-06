const mainSaveOrder = () => {

    let
        form       = document.querySelector('#orderForm'),
        phone      = ``;
        phoneInput = document.querySelector('#orderForm input[name="order[phone]"]');

    phoneInput.addEventListener('input', addNumberInPhone, false);
    form.addEventListener('submit', createOrder, false);


    function addNumberInPhone(e){

        if(e.data == null){
            if(phone == ''){
                e.target.value = '';
                return;
            }
            phone = String(phone.slice(0, -1));
        }else{
            if(e.data.charCodeAt() >= 48 && e.data.charCodeAt() <= 57 && phone.length < 10){
                phone += e.data;
            }
        }

        let 
            phoneVal   = `+7 (`,
            selection  = 18,
            cursorFlag = false;

        for(let i = 0; i < 10; i++){

            if(i == 3){
                phoneVal += ') ';
            }else if (i == 6){
                phoneVal += ' ';
            }else if(i == 8){
                phoneVal += '-';
            }

            if(phone[i] != undefined){
                phoneVal += phone[i];
            }else{
                if(!cursorFlag){
                    selection = phoneVal.length;
                    cursorFlag = true;
                }
                phoneVal += '_';
            }       
        }

        e.target.value = phoneVal;
        e.target.setSelectionRange(selection, selection);
    }


    function createOrder(e){
        e.preventDefault();

        let
            xhr       = new XMLHttpRequest(),
            formData  = new FormData,
            orderForm = {
                lastName  : '',
                firstName : '',
                patronymic: '',
                phone     : '',
                bundle    : 'Подарок с Дальнего Востока',
            };
            
        orderForm.firstName  = e.target.querySelector('input[name="order[firstName]"]').value;
        orderForm.lastName   = e.target.querySelector('input[name="order[lastName]"]').value;
        orderForm.patronymic = e.target.querySelector('input[name="order[patronymic]"]').value;
        orderForm.phone      = e.target.querySelector('input[name="order[phone]"]').value;

        formData.append('order', JSON.stringify(orderForm));
        // formData.append('lastName',   orderForm.lastName);
        // formData.append('firstName',  orderForm.firstName);
        // formData.append('patronymic', orderForm.patronymic);
        // formData.append('phone',      orderForm.phone);

        xhr.onload = xhr.onerror = function(){
            if(this.status == 200){
                alert('good');
            }else{
                alert('baad');
            }
        }

        xhr.open('POST', '/save-order');
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*, q=0.01');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('X-XSRF-TOKEN', csrf);
        xhr.send(formData);

    }

}



window.addEventListener('load', mainSaveOrder, false);