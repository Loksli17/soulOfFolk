const main = () => {
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
        wrap    = document.createElement('div'),
        wrapDiv = document.createElement('div'), 
        table   = document.createElement('table');

    wrap.classList.add('search-data-wrap');
    wrapDiv.classList.add('data');
    table.classList.add('tableView');
    table.innerHTML = '<tr> <th>ID</th> <th>Имя</th> <th>Купленый набор</th> <th>Текст</th> <th>Язык</th> <th>Выводится на лендинге</th> <th>Действия</th> </tr>';
    wrapDiv.append(table);
    wrap.append(wrapDiv);

    for(let i = 0; i < data.length; i++){
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data[i].number}</td>
            <td>${data[i].name.lastName} ${data[i].name.firstName}</td>
            <td>${data[i].bundle}</td>
            <td>${data[i].text}</td>
            <td>${data[i].type}</td>
            <td>${data[i].isActive}</td>
            <td>
                <a href="/admin/comments/view?id=${data[i]._id}"><i class="far fa-eye"></i></a>
                <a href="/admin/comments/edit?id=${data[i]._id}"><i class="far fa-edit"></i></a>
                <a href="/admin/comments/delete?id=${data[i]._id}"><i class="fas fa-trash"></i></a>
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


window.addEventListener('load', main, false);