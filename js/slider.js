const slider = $('.slider__list').bxSlider({
  pager: false,
  controls: false
});

$(".slider__arrow--type--prev").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".slider__arrow--type--next").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});





