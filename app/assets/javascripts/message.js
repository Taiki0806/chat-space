$(function() {
  function buildHTML(message) {
    var imageUrl = "";
    var imageUrl = (message.image)?
           `<div class="chat-main__content__message-block__picture"></div>
              <img src="${message.image}", class="chat-main__content__message-block__image">`
              : "";

    var html = `<div class="chat-main__content__message-block">
                  <p class="chat-main__content__message-block__name">
                    ${message.user_name}
                  </p>
                  <p class="chat-main__content__message-block__time">
                    ${message.time}
                  </p>
                  <p class="chat-main__content__message-block__text">
                    ${message.comment}
                  </p>
                    ${imageUrl}
                </div>`
                  return html
  }

  $(document).on('submit', "#new_message", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__content").append(html);
      $(".new_message")[0].reset();
      $("html,body").animate({scrollTop: $("html,body")[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージか画像を入力してください');
    })
    .always(function(){
      $(".chat-main__footer__form__send-button").prop("disabled", false);
    });
  });
});
