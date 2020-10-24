function Pagination(_params){
    //check of GET.id
    if(_params.page != undefined){
        _params.page = _params.page;
        _params.url = _params.url.substring(0, _params.url.length - (6 + _params.page.toString().length));
    }else{
        _params.page = 1;
    }

    this.pageSize    = _params.pageSize;
    this.limit       = _params.limit;
    this.url         = _params.url;
    this.url         += this.checkRoute();
    this.count       = _params.count;
    this.maxPage     = Math.ceil(_params.count / this.limit);
    this.page        = _params.page;
    this.skip        = this.limit * (this.page - 1);
    this.startButton = _params.startButton ? 1 : false;
    this.endButton   = _params.endButton ? this.maxPage : false;
    this.class       = _params.class ? _params.class : 'page';
    this.classActive = _params.classActive ? _params.classActive : 'page-active';

    //prev and next custom
    this.prev = {content: '<', class: 'prev'};
    this.next = {content: '>', class: 'next'};
    if(_params.prev != undefined){
        this.prev.content  = _params.prev.content ?  _params.prev.content : '<';
        this.prev.class    = _params.prev.class ?  _params.prev.class : 'prev';
    }
    if(_params.next != undefined){
        this.next.content  = _params.next.content ?  _params.next.content : '>';
        this.next.class    = _params.next.class ?  _params.next.class : 'next';
    }

    if(this.page > this.maxPage){
        this.page = this.maxPage;
    }
}


Pagination.prototype.checkRoute = function(){
    for(let i = 0; i < this.url.length; i++){
        if(this.url[i] == "?"){
            return "&";
        }
    }
    return "?";
}


Pagination.prototype.getPages = function(){

    if(this.count <= this.limit){
        return [];
    }

    //определение крайних ссылок
    let first = 0,
        last  = 0,
        pages = [];

    if(Number(this.page) + (this.pageSize / 2) >= this.maxPage){
        last = this.maxPage;
        first = this.maxPage - this.pageSize + 1;
    }else if(Number(this.page) - (this.pageSize / 2) <= 1){
        first = 1;
        last = this.pageSize;
    }else{
        first = Math.ceil(Number(this.page) - this.pageSize / 2);
        last = first + this.pageSize - 1;
    }

    if(last > this.maxPage){
        last = this.maxPage;
    }

    if(first < 1){
        first = 1;
    }

    //create array of pages
    if(this.page > 1){
        pages.push({id: Number(this.page) - 1, route: this.url, content: this.prev.content, class: this.prev.class});
    }

    if(first != 1){
        pages.push({id: 1, route: this.url, content: this.startButton, class: this.class});
        pages.push({addBlock: true, content: '...', });
    }

    for(let i = first; i <= last; i++){
        let page = {
            id     : i,
            route  : this.url,
            content: i,
            class  : this.class,
        };

        if(i == this.page){
            page.current = true;
            page.classActive = this.classActive,
            pages.push(page);
        }else{
            pages.push(page);
        }
    }

    if(last < this.maxPage){
        pages.push({addBlock: true, content: '...', });
        pages.push({id: this.maxPage, route: this.url, content: this.endButton, class: this.class});

    }

    if(this.page < this.maxPage){
        pages.push({id: Number(this.page) + 1, route: this.url, content: this.next.content, class: this.next.class});
    }


    if(pages.length != 1){
        return pages;
    }else{
        return [];
    }
}

Pagination.prototype.getCountInfo = function(){
    return {
        startRecord: this.count == 0 ? 0 : this.skip + 1,
        endRecord  : this.skip + this.limit > this.count ? this.count : this.skip + this.limit,
        count      : this.count,
    }
}

module.exports = Pagination;
