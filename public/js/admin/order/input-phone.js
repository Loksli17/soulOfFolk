const phoneMain = () => {

    let
        phone      = ``;
        phoneInput = document.querySelector('input[name="order[phone]"]');

    phoneInput.addEventListener('input', addNumberInPhone, false);

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
}

window.addEventListener('load', phoneMain, false);