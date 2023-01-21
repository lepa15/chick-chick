const addPreload = (elem) => { //запускаем прелоадер для слайда
	elem.classList.add('preload');
};

const removePreload = (elem) => {
	elem.classList.remove('preload');
};

const startSlider = () => {
	const sliderItems = document.querySelectorAll('.slider__item');;
	const sliderList = document.querySelector('.slider__list');
	const btnNextSlider = document.querySelector('.slider__arrow_right');
	const btnPrevSlider = document.querySelector('.slider__arrow_left');

	let activeSlide = 1;
	let position = 0;

	const checkSlider = () => {
		if ((activeSlide + 2 === sliderItems.length && document.documentElement.offsetWidth > 560) || activeSlide === sliderItems.length ) {
			btnNextSlider.style.display = 'none';
		} else {
			btnNextSlider.style.display = '';
		}

		if (activeSlide ===1) {
			btnPrevSlider.style.display = 'none';
		} else {
			btnPrevSlider.style.display = '';
		}
	}

	checkSlider();

	const nextSlide = () => {
		sliderItems[activeSlide]?.classList.remove('slider__item_active');
		position = -sliderItems[0].clientWidth * activeSlide;

		sliderList.style.transform = `translateX(${position}px)`
		activeSlide += 1;
		sliderItems[activeSlide]?.classList.add('slider__item_active');

		checkSlider();
	};

	const prevSlide = () => {
		sliderItems[activeSlide]?.classList.remove('slider__item_active');
		position = -sliderItems[0].clientWidth * (activeSlide - 2);

		sliderList.style.transform = `translateX(${position}px)`
		activeSlide -= 1;
		sliderItems[activeSlide]?.classList.add('slider__item_active');

		checkSlider();
	};

	btnPrevSlider.addEventListener('click', prevSlide);
	btnNextSlider.addEventListener('click', nextSlide);


	window.addEventListener('resize', () => {
		if (activeSlide + 2 > sliderItems.length && document.documentElement.offsetWidth > 560) {
			activeSlide = sliderItems.length - 2;
			sliderItems[activeSlide]?.classList.add('slider__item_active');
		}

		position = -sliderItems[0].clientWidth * (activeSlide - 1);
		sliderList.style.transform = `translateX(${position}px)`
		checkSlider();
	})

};



const initSlider = () => {  //инизиализируем слайдер
	const slider = document.querySelector('.slider');
	const sliderContainer = document.querySelector('.slider__container');

	sliderContainer.style.display = 'none';
	addPreload(slider);
	
	window.addEventListener('load', () => {
		sliderContainer.style.display = '';
		removePreload(slider);
		startSlider();

	}); // когда страница загрузится, запускаем слайдер.  
};

window.addEventListener('DOMContentLoaded', initSlider);
initSlider();
