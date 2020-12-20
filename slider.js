import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        arrowPrev = document.querySelector(prevArrow),
        arrowNext = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  total.innerHTML = getZero(slides.length);

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = "flex";
  slidesField.style.transition = '0.5s all ease';
  slidesWrapper.style.overflow = "hidden";

  function setDotOpacity(){
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[slideIndex - 1].style.opacity = 1;
  }

  function deleteNotDigits(str){
    return +str.replace(/\D/g, '');
  }

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement('ol'),
        dots = [];

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for(let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if(i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  arrowNext.addEventListener('click', () => {
    if(offset == deleteNotDigits(width) * (slides.length - 1)){
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    current.innerHTML = getZero(slideIndex);

    setDotOpacity();
    
  });

  arrowPrev.addEventListener('click', () => {
    if(offset == 0){
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.innerHTML = getZero(slideIndex);
    
    setDotOpacity();

  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (evt) => {
      const slideTo = evt.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      current.innerHTML = getZero(slideIndex);

      setDotOpacity();

    });
  });

}

export default slider;