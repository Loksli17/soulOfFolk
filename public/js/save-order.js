const mainSaveOrder = () => {

    let
        form = document.querySelector('#orderForm');

    form.addEventListener('submit', createOrder, false);

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