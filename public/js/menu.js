window.addEventListener('load', function(){
	let burger = document.querySelector('.menu-btn');
	burger.addEventListener('click', changeMenu, false);
}, true);


window.addEventListener(`resize`, (e) => {
	if(document.documentElement.clientWidth >= 860){
		document.querySelector('.menu-btn').classList.remove('menu-btn-active');
  		document.querySelector('.mobile-menu').classList.remove('mobile-menu-active');
	}
}, false);


function changeMenu(e){
	e.preventDefault();
	e.stopPropagation();

	let mobileMenu = document.querySelector('.mobile-menu');

	if(this.classList.contains('menu-btn-active')){
		 this.classList.remove('menu-btn-active');
         document.body.style['overflow-y'] = 'scroll';
         document.querySelector('.top-menu').style['box-shadow'] = '0px 2.5px 2px rgba(0, 0, 0, 0.25)';
	}else{
		this.classList.add('menu-btn-active');
        document.body.style['overflow-y'] = 'hidden';
        document.querySelector('.top-menu').style['box-shadow'] = '0px 0px 0px rgba(0, 0, 0, 0.25)';
	}
	  
	mobileMenu.classList.contains('mobile-menu-active') ? mobileMenu.classList.remove('mobile-menu-active') : mobileMenu.classList.add('mobile-menu-active');
	
}