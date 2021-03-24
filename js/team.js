const employeeListDesk = $(".team__name", ".team__list--desktop");

const employeeListMobile = $(".team__name", ".team__list--mobile");

function hideAccordeon(employeeList){
  employeeList.each((index, employee) => {
    let descElem = $(employee).next();
    descElem.height(0);
    descElem.removeClass("active");
    $(employee).removeClass("team__name--active");
  });
}

function showAccordeon(descWrapElem, nameElem){
  let descElem = descWrapElem.find('.team__desc');
  let height = descElem.css('height');
  descWrapElem.height(height);
  nameElem.addClass("team__name--active")
  descWrapElem.addClass("active");
}

function isDesktop(elem) {
  return elem.closest(".team__list--desktop").length == 1;
};

$(".team__name").on("click", function (){
  let currentName = $(this);
  let desc = currentName.next();

  if (desc.hasClass("active")) {
    if (isDesktop(currentName)){
      hideAccordeon(employeeListDesk);
    } else {
      hideAccordeon(employeeListMobile);
    }
  } else {
    if (isDesktop(currentName)){
      hideAccordeon(employeeListDesk)
    } else {
      hideAccordeon(employeeListMobile)
    }
    showAccordeon(desc, currentName)
  }

});