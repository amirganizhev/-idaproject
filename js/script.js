/*Блок с карточками товара*/
const productCards = document.querySelector('.product-cards');
/*Формы для заполнения*/
const nameProduct = document.querySelector('.add-product input[name="name-product"]');
const descriptionProduct = document.querySelector('.add-product input[name="description-product"]');
const imageLinkProduct = document.querySelector('.add-product input[name="image-link-product"]');
const priceProduct = document.querySelector('.add-product input[name="price-product"]');
/*Предупреждения валидации*/
const nameProductWarning = document.querySelector('#nameProductWarning');
const imageLinkProductWarning = document.querySelector('#imageLinkProductWarning');
const priceProductWarning = document.querySelector('#priceProductWarning');
/*Добавление карточки товара*/
document.querySelector('.add-product button').onclick = function() {
	/*Валидация*/
    if (nameProduct.value === '') {
    	nameProductWarning.style.display = 'block';
    	nameProduct.style.border = '1px solid red';
    	return false;
    }	else if (imageLinkProduct.value === '') {
	    	imageLinkProductWarning.style.display = 'block';
	    	imageLinkProduct.style.border = '1px solid red';
	    	return false;
    }	else if (priceProduct.value === '') {
	    	priceProductWarning.style.display = 'block';
	    	priceProduct.style.border = '1px solid red';
	    	return false;
    } 	else {
	    	nameProductWarning.style.display = 'none';
	    	nameProduct.style.border = 'none';
	    	imageLinkProductWarning.style.display = 'none';
	    	imageLinkProduct.style.border = 'none';
	    	priceProductWarning.style.display = 'none';
	    	priceProduct.style.border = 'none';
    }
	/*Добавление карточки товара*/
	productCards.innerHTML = `<div class="product-cards__card add-card-animation">
								   <img src="${imageLinkProduct.value}" alt="Фото товара">
								   <div>
									   <h2>${nameProduct.value}</h2>
									   <p>${descriptionProduct.value}</p>
									   <p><span>${priceProduct.value}</span> руб.</p>
								   </div>
							   </div>` + productCards.innerHTML;
	/*Очистка форм*/						   
	nameProduct.value = '';
	descriptionProduct.value = '';
	imageLinkProduct.value = '';
	priceProduct.value = '';
	/*Удаление анимации*/
	setTimeout(function() {
		document.querySelector('.product-cards__card').classList.remove("add-card-animation");
	}, 2000);		    				   
}

/*Фильтрация товара*/
document.querySelector('.products select').onchange = function(e) {
	/*Карточка товара*/
	productCard = document.querySelectorAll('.product-cards__card');
	/*Фильтраци от меньшего к большему*/
	if (e.target.value === 'min') {
		let productCardArray = Array.prototype.slice.call(productCard, 0);
		productCardArray.sort((a, b) => {
			if (parseInt(a.querySelector('span').innerHTML) > parseInt(b.querySelector('span').innerHTML)) {
				return 1;
			} else {
				return -1;
			}
		});
		productCards.replaceChildren(...productCardArray);
	}
	/*Фильтраци от большего к меньшему*/
	if (e.target.value === 'max') {
		let productCardArray = Array.prototype.slice.call(productCard, 0);
		productCardArray.sort((a, b) => {
			if (parseInt(a.querySelector('span').innerHTML) < parseInt(b.querySelector('span').innerHTML)) {
				return 1;
			} else {
				return -1;
			}
		});
		productCards.replaceChildren(...productCardArray);
	}
	/*Фильтраци по наименованию*/
	if (e.target.value === 'name') {
		let productCardArray = Array.prototype.slice.call(productCard, 0);
		productCardArray.sort((a, b) => {
			if (a.querySelector('h2').innerHTML.toLowerCase() > b.querySelector('h2').innerHTML.toLowerCase()) {
				return 1;
			} else {
				return -1;
			}
		});
		productCards.replaceChildren(...productCardArray);
	}
}