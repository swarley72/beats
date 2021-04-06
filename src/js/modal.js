(function () {
function validateForm(form, fieldsArray){
  fieldsArray.forEach(field => {
    field.removeClass("input-error");
    if (field.val().trim() == "") {
      field.addClass("input-error");
    }
  })

  const errorFields = form.find(".input-error");

  return errorFields.length == 0
}


$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $(".modal");
  const modalText = modal.find(".modal__text");
  modalText.removeClass('modal__text--error')

  const isValid = validateForm(form, [name, phone, comment, to])

  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: 'post',
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
    });

    request.done(data => {
      modalText.text(data.message)
    });
    
    request.fail(data => {
      const message = data.responseJSON.message
      modalText.text(message)
      modalText.addClass('modal__text--error')  
    })

    request.always(() => {
      $.fancybox.open({
        src: '#modal',
        type: 'inline'
      })
    })
  }
});


$('.js-modal-button').click(e => {
  e.preventDefault();

  $.fancybox.close();
})
})();