(function () {
function getBlockByAlias(alias){
  return $(".reviews__item").filter((index, item) => {
    return $(item).attr("data-linked-with") == alias
  });
}

$(".interactive-avatar__link").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = getBlockByAlias(target);
  const currentItem = $this.closest(".interactive-avatar");

  itemToShow.addClass("active").siblings().removeClass("active")
  currentItem.addClass("active").siblings().removeClass("active")
})
})();