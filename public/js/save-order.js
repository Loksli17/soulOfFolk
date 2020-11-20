let phone = ``;


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


function formValidate(obj){

    let nameReg = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ']+[a-zA-Zа-яА-ЯёЁ']?$/;

    if(!nameReg.test(obj.lastName)){
        return {message: 'Неверно указано фамилия'};
    }

    if(!nameReg.test(obj.firstName)){
        return {message: 'Неверно указано имя'};
    }
    
    if(!nameReg.test(obj.patronymic)){
        return {message: 'Неверно указано отчество'};
    }

    if(obj.phone.length < 18){
        return {message: 'Неверно указан телефон'};
    }

    return true;
}



function createOrder(e){
    e.preventDefault();

    console.log(globalCurrentOrderInd);

    let
        xhr         = new XMLHttpRequest(),
        formData    = new FormData,
        phoneReg    = /_/g,
        validStatus = false, 
        csrf        = e.target.querySelector('input[name="csrf"]').value,
        orderForm   = {
            lastName  : '',
            firstName : '',
            patronymic: '',
            phone     : '',
            bundle    : `${order.name[globalCurrentOrderInd]} ${order.info[globalCurrentOrderInd]}`, 
            cost      : order.price[globalCurrentOrderInd],
        };
        
    orderForm.firstName  = e.target.querySelector('input[name="order[firstName]"]').value;
    orderForm.lastName   = e.target.querySelector('input[name="order[lastName]"]').value;
    orderForm.patronymic = e.target.querySelector('input[name="order[patronymic]"]').value;
    orderForm.phone      = e.target.querySelector('input[name="order[phone]"]').value;

    orderForm.phone = orderForm.phone.replace(phoneReg, '');

    validStatus = formValidate(orderForm);

    if(typeof validStatus == 'object'){
        console.log(validStatus);
        document.querySelector('#orderForm .err').style.display = 'block';
        document.querySelector('#orderForm .err').innerHTML = validStatus.message;
        return;
    }

    formData.append('order', JSON.stringify(orderForm));

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