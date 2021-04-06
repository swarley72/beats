(function () {
const items = document.querySelectorAll(".colors__link");

items.forEach(item => {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    const item = this.closest(".colors__item");
    const container = this.closest(".colors__list");
    const isItemOpened = item.classList.contains("active");
    
    if (isItemOpened) {
      closeAllItems(container);
    } else {
      closeAllItems(container);
      openItem(item);
    }
  })
});

function openItem(item){
  const hiddenDesc = item.querySelector(".colors__desc");
  const textDesc = item.querySelector(".colors__desc-text")
  const width = getWidth(item);
  item.classList.add("active");
  hiddenDesc.style.width = `${width.container}px`;
  textDesc.style.width = `${width.textContainer}px`;
}


function closeAllItems(container) {
  const items = container.querySelectorAll(".colors__item")
  const contentList = container.querySelectorAll(".colors__desc")

  items.forEach(element => {
    element.classList.remove("active")
  });

  contentList.forEach(element => {
    element.style.width = "0px"
  });

}

function getWidth(item) {
  let itemWidth = 0
  const screenWidth = window.innerWidth;
  const container = item.closest(".colors__list");
  const titlesBlocks = container.querySelectorAll(".colors__link");
  const titlesWidth = titlesBlocks[0].offsetWidth * titlesBlocks.length;
  const textContainer = item.querySelector(".colors__desc-text");
  const paddingLeft = parseInt(window.getComputedStyle(textContainer, null).paddingLeft);
  const paddingRight = parseInt(window.getComputedStyle(textContainer, null).paddingRight);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  if(isMobile) {
    itemWidth = screenWidth - titlesWidth
  } else {
    itemWidth = 500
  }

  return {
    container: itemWidth,
    textContainer: itemWidth - paddingLeft - paddingRight
  }
}
})();