let bxSliderOptions;
if (window.innerWidth >= 768) {
  bxSliderOptions = {
  pager: false,
  controls: false,
  touchEnabled: false
}} else {
  bxSliderOptions = {
  pager: false,
  controls: false,
}}
  
const slider = $('.slider__list').bxSlider(bxSliderOptions);

$(".slider__arrow--type--prev").click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".slider__arrow--type--next").click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});