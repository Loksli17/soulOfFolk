const mainSearch = () => {
    let
        searchForm = document.querySelector('#search-form');

    searchForm.addEventListener('submit', search, false);
}


function search(e){
    e.preventDefault();

    let
        xhr        = new XMLHttpRequest(),
        searchData = e.target.elements[1].value,
        csrf       = e.target.elements[0].value,
        action     = this.getAttribute('action');

    if(searchData == ''){
        alert('Вы не ввели данные! Пожалуйста введите данные для поиска.');
        return;
    }

    xhr.onload = xhr.onerror = function(){
        if(this.status == 200){
            if(!this.response.data.length){
                alert('Данные не найдены.');
                return;
            }
            console.log(this.response.data);
            showData(this.response.data);
        }else{
            alert('Ошибка сервера, обратитесь в поддержку.');
        }
    }

    let data = JSON.stringify({
        _csrf     : csrf,
        searchData: searchData,
    });

    xhr.open('POST', action);
    xhr.responseType = 'json',
    xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*, q=0.01');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}


function showData(data){
    let
        wrap  = document.createElement('div'),
        wrapDiv = document.createElement('div'),
        table = document.createElement('table');

    wrap.classList.add('search-data-wrap');
    wrapDiv.classList.add('data');
    table.classList.add('tableView');
    table.innerHTML = '<tr> <th>ID</th> <th>ФИО</th> <th>Номер телефон</th> <th>Дата заказа</th> <th>Набор</th> <th>Действия</th> </tr>';
    wrapDiv.append(table);
    wrap.append(wrapDiv);


    for(let i = 0; i < data.length; i++){
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data[i].number}</td>
            <td>${data[i].name.lastName} ${data[i].name.firstName} ${data[i].name.patronymic}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].dateView}</td>
            <td>${data[i].bundle}</td>
            <td>
                <a href="/admin/orders/delete?id=${data[i]._id}"><i class="fas fa-trash"></i></a>
            </td>
        `;
        table.append(tr);
    }

    document.body.append(wrap);
    document.body.style.overflow = 'hidden';

    wrap.addEventListener('click', closeWrap, false);
}


function closeWrap(e){
    if(e.target.tagName != 'DIV') return;
    e.target.remove();
}


window.addEventListener('load', mainSearch, false);