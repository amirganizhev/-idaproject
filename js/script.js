/*Блок с карточками товара*/
const productCards = document.querySelector('.product-cards');
/*Формы для заполнения*/
const nameProduct = document.querySelector('.add-product input[name="name-product"]');
const descriptionProduct = document.querySelector('.add-product textarea');
const imageLinkProduct = document.querySelector('.add-product input[name="image-link-product"]');
const priceProduct = document.querySelector('.add-product input[name="price-product"]');
/*Предупреждения валидации*/
const nameProductWarning = document.querySelector('#nameProductWarning');
const descriptionProductWarning = document.querySelector('#descriptionProductWarning');
const imageLinkProductWarning = document.querySelector('#imageLinkProductWarning');
const priceProductWarning = document.querySelector('#priceProductWarning');
/*Пустой массив*/
let productCardArray;

window.onload = function() {
	/*Удаление прелодера*/
	setTimeout(() => {
		document.querySelector('.loader').remove();
	}, 1500);
	/*Переназначение карточек товара из localStorage*/
	productCards.innerHTML = localStorage.getItem('productCards_saved') || productCards.innerHTML;
	/*Удаление карточки товара*/
	deleteProductCard();
};

/*Маска разделения тысячных пробелом для поля цены*/
priceProduct.oninput = function() {
	const value = this.value.replace(/\D/g, '');
	const arrayValue = value.split('');
	const arrayOverwrite = [];
	let count = 0;
	for (let i = arrayValue.length - 1; i >= 0; i--) {
		if (count === 3) {
			count = 0;
			arrayOverwrite.unshift(' ');
		}
		arrayOverwrite.unshift(arrayValue[i])
		count++;
	}
	this.value = arrayOverwrite.join('');
}

/*Добавление карточки товара*/
document.querySelector('.add-product button').onclick = function() {
	/*Валидация*/
    if (nameProduct.value === '') {
    	nameProductWarning.style.display = 'block';
    	nameProduct.style.border = '1px solid red';
    	return false;
    }	
    	else {
    		nameProductWarning.style.display = 'none';
	    	nameProduct.style.border = 'none';
    	}
    if (descriptionProduct.value === '') {
		descriptionProductWarning.style.display = 'block';
    	descriptionProduct.style.border = '1px solid red';
    	return false;
    }	else {
    		descriptionProductWarning.style.display = 'none';
	    	descriptionProduct.style.border = 'none';
    	}
    if (imageLinkProduct.value === '') {
    	imageLinkProductWarning.style.display = 'block';
    	imageLinkProduct.style.border = '1px solid red';
    	return false;
    }	else {
    		imageLinkProductWarning.style.display = 'none';
	    	imageLinkProduct.style.border = 'none';
    	}
    if (priceProduct.value === '') {
    	priceProductWarning.style.display = 'block';
    	priceProduct.style.border = '1px solid red';
    	return false;
    } 	else {
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
		localStorage.setItem('productCards_saved', productCards.innerHTML);
		alert('Карточка товара добавлена')
	}, 2000);
	/*Удаление карточки товара*/
	deleteProductCard();		    				   
}

/*Удаление карточки товара*/
function deleteProductCard() {
	const productCardList = document.querySelectorAll('.product-cards__card');
	for (let i = 0; i < productCardList.length; i++) {
		productCardList[i].onclick = function() {
			this.classList.add("delete-card-animation");
			setTimeout(() => {
				this.remove();
				localStorage.setItem('productCards_saved', productCards.innerHTML);
			}, 2000);	
		}
	}
}

/*Фильтрация товара*/
document.querySelector('.products select').onchange = function(e) {
	/*Карточка товара*/
	productCard = document.querySelectorAll('.product-cards__card');
	/*Фильтраци от меньшего к большему*/
	if (e.target.value === 'min') {
		productCardArray = Array.prototype.slice.call(productCard, 0);
		productCardArray.sort((a, b) => {
			if (parseInt(a.querySelector('span').innerHTML.replace(/\D/g, '')) > parseInt(b.querySelector('span').innerHTML.replace(/\D/g, ''))) {
				return 1;
			} else {
				return -1;
			}
		});
		productCards.replaceChildren(...productCardArray);
	}
	/*Фильтраци от большего к меньшему*/
	if (e.target.value === 'max') {
		productCardArray = Array.prototype.slice.call(productCard, 0);
		productCardArray.sort((a, b) => {
			if (parseInt(a.querySelector('span').innerHTML.replace(/\D/g, '')) < parseInt(b.querySelector('span').innerHTML.replace(/\D/g, ''))) {
				return 1;
			} else {
				return -1;
			}
		});
		productCards.replaceChildren(...productCardArray);
	}
	/*Фильтраци по наименованию*/
	if (e.target.value === 'name') {
		productCardArray = Array.prototype.slice.call(productCard, 0);
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