$(function() {
  function buildHTML(message) {
    var imageUrl = "";
    var imageUrl = (message.image)?
           `<div class="chat-main__content__message-block__picture"></div>
              <img src="${message.image}", class="chat-main__content__message-block__image">`
              : "";

    var html = `<div class="chat-main__content__message-block" data-id="${message.id}">
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


  setInterval(update, 5000);

  function update(){
    if($(".chat-main__content__message-block")[0]){
    var messageId = $(".chat-main__content__message-block:last").data("id");
  } else {
    var messageId = 0;
  }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { lastMessage: messageId },
      dataType: 'json'
    })
    .done(function(messages){
      var insertHTML = "";
      if (messages.length !== 0) {
      messages.forEach(function(message){
          insertHTML += buildHTML(message);
      });
      $(".chat-main__content").append(insertHTML);
      }
    })
    .fail(function(data){
      alert("自動更新に失敗しました")
    });
  }
});
