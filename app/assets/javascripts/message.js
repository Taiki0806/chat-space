$(function() {
  function buildHTML(message) {
    var imageUrl = "";
    if (message.image.url) {
      var imageUrl = `<div class="chat-main__content__message-block__picture"></div>
                        <img src="${message.image.url}", class="chat-main__content__message-block__image">`
    }
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
  $("#new_message").on('click', function(e){
    $(".chat-main__footer__form__send-button").prop("disabled", false);
  });

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
      $(".chat-main__footer__form__message-form").val('');
      $(".chat-main__footer__form__label__file").val('');
      $("html,body").animate({scrollTop: $("html,body")[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージか画像を入力してください');
    });
  });
});
